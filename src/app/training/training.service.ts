import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Subscription} from "rxjs";
import { Exercise } from './exercise.model';
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import {UiService} from "../shared/ui.service";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private finishedExercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) {
  }
  fetchAvailableExercises() {
    this.fbSubs.push(this.db
        .collection("availableExercises")
        .snapshotChanges()
        .pipe(
            map(docArray => {
              throw(new Error());
            //   return docArray.map(doc => {
            //     return {
            //       id: doc.payload.doc.id,
            //       ...(doc.payload.doc.data() as Exercise),
            // };
          // });
        }))
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Fetching failed, please try again later', null, 3000);
          this.exercisesChanged.next(null);
            }
        ));
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()})
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
   this.fbSubs.push(this.db.collection('finishedExercises')
       .valueChanges()
       .subscribe((exercise: Exercise[]) => {
         this.finishedExercises = exercise;
         this.finishedExercisesChanged.next(exercise);
   }));
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
