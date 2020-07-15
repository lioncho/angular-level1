//common
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../material.module";

//View
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {StopTrainingComponent} from "./current-training/stop-training.component";
import {TrainingRoutingModule} from "./training-routing.module";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent,
        ],
    imports: [
        MaterialModule,FormsModule,CommonModule,FlexLayoutModule,TrainingRoutingModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
