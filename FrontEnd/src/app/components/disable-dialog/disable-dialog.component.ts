import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disable-dialog',
  templateUrl: './disable-dialog.component.html',
  styleUrls: ['./disable-dialog.component.css']
})
export class DisableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public description: string) { }

  ngOnInit(): void {
  }

}
