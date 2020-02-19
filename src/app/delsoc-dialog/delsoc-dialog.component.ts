import { Component, OnInit, Inject } from '@angular/core';
import {SocietyService, Society} from '../society.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl} from '@angular/material';

@Component({
  selector: 'app-delsoc-dialog',
  templateUrl: './delsoc-dialog.component.html',
  styleUrls: ['./delsoc-dialog.component.css']
})
export class DelsocDialogComponent implements OnInit {
  id: string;
  constructor(private ss: SocietyService, @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DelsocDialogComponent>) {
    this.id = data.id;
   }

  ngOnInit() {
  }
  confirmDel() {
    this.dialogRef.close(this.ss.deleteSociety(this.id).subscribe(res => {
      return res;
    }));
  }
  close() {
    this.dialogRef.close();
  }

}
