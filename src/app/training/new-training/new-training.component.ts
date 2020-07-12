import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import {UiService} from "../../shared/ui.service";


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  private isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {}

  ngOnInit() {
      this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
          isLoading => {
              this.isLoading = isLoading
          }
      );
      this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
          r => (this.exercises = r)
      );
      this.trainingService.fetchAvailableExercises()
      this.fetchExercises();
  }

  fetchExercises() {
      this.trainingService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
      if (this.exerciseSubscription) {
          this.exerciseSubscription.unsubscribe();
      }
      if (this.loadingSubs) {
          this.loadingSubs.unsubscribe();
      }
  }
}
