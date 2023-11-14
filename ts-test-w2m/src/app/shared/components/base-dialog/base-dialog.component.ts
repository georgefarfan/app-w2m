import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss'],
})
export class BaseDialogComponent {
  title: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<BaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = this.data.title;
    this.description = this.data.description;
  }

  onAction(action: boolean): void {
    this.dialogRef.close({
      action,
    });
  }
}
