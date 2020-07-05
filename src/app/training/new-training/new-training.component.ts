import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  // exercisesChanged = new Subject<Exercise[]>();

  constructor(
    private trainingService: TrainingService,
  ) {}

  ngOnInit() {
      this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
          r => (this.exercises = r)
      );
      this.trainingService.fetchAvailableExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
      this.exerciseSubscription.unsubscribe();
  }
}
