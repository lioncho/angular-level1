import {Component, Inject, OnInit} from '@angular/core';
import {DialogRole, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { ExpertEvaluationComponent } from '../expert-evaluation/expert-evaluation.component';
import {Direction} from "@angular/cdk/bidi";

export interface DialogData {
  item: any
}

@Component({
  selector: 'gitcode-code-review-detail',
  templateUrl: './code-review-detail.component.html',
  styleUrls: ['./code-review-detail.component.scss']
})
export class CodeReviewDetailComponent implements OnInit {
  isReviewRequestComplete: any;
  animal: string;
  name: string;
  item: any;

  constructor(public dialog: MatDialog,
  public dialogRef: MatDialogRef<CodeReviewDetailDialog>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.item = data.item;
  }

  ngOnInit(): void {

  }
  openDialog($value) {
      if ($value==1){
        const dialogRef = this.dialog.open(CodeReviewDetailDialog,{
          data: {name: this.name, animal: this.animal}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
        });
      }
      if ($value==2){
        const dialogRef = this.dialog.open(CodeReviewDetailDialog,{
          data: {name: this.name, animal: this.animal}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
        });
      }
    }

  openDialogBestreview(event: MouseEvent) {
    this.dialog.open(CodeReviewDetailDialogBestreview);
  }

  public closePopup(event) {
    this.dialogRef.close(true);
  }

}

@Component({
  selector: 'code-review-detail-dialog',
  templateUrl: 'code-review-detail-dialog.html',
})
export class CodeReviewDetailDialog {
  isTrue: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<CodeReviewDetailDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmBox(event: MouseEvent) {
    if (event) {
      this.isTrue = true;
    }
  }
  public closePopup(event) {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'code-review-detail-dialog-bestreview',
  templateUrl: 'code-review-detail-dialog-bestreview.html',
})
export class CodeReviewDetailDialogBestreview {
  private dialogConfig = {
    autoFocus: false,
    closeOnNavigation: true,
    direction: <Direction>'ltr',
    disableClose: false,
    hasBackdrop: true,
    height: '80vh',
    minHeight: '80vh',
    maxHeight: '100%',
    width: '527px',
    maxWidth: '527px',
    panelClass: ['app-dialog'],
    restoreFocus: false,
    role: <DialogRole>'dialog',
  };
  isTrue: true;
  constructor(
      public dialog:MatDialog,
      public dialogRef: MatDialogRef<CodeReviewDetailDialogBestreview>) {
  }

  confirmBox() {
    const config: MatDialogConfig = this.dialogConfig;
    config.panelClass = ['app-dialog'];
    this.dialog.open(ExpertEvaluationComponent,config);

  }
  public closePopup() {
    this.dialogRef.close(true);

  }
}

