import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl} from '@angular/material';
import {SocietyService} from '../society.service';
@Component({
  selector: 'app-delsoc-dialog',
  templateUrl: './delsoc-dialog.component.html',
  styleUrls: ['./delsoc-dialog.component.css']
})
export class DelsocDialogComponent implements OnInit {
  id: string;
  name: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DelsocDialogComponent>,
  private socservice: SocietyService) {
    this.id = data.id;
    this.name = data.name;
   }

  ngOnInit() {
  }
  confirmDel() {
    this.dialogRef.close(this.socservice.deleteSociety(this.id).subscribe(res => {
      return res;
    }));
  }
  close() {
    this.dialogRef.close();
  }

}
