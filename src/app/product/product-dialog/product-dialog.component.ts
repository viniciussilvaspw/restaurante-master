import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
interface Result {
  status?: string;
  qtd?: number;
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  result: Result = new class implements Result {
    qtd: number;
    status: string;
  };

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>) { }

  onNoClick(): void {
    this.result.status = 'CANCEL';
    this.dialogRef.close(this.result);
  }
}
