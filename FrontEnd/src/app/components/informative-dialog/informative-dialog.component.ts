import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-informative-dialog',
  templateUrl: './informative-dialog.component.html',
  styleUrls: ['./informative-dialog.component.css']
})
export class InformativeDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {description: string, routeRedirect: string}) { }

  ngOnInit(): void {
  }

  acceptInformation() {
    location.replace(this.data.routeRedirect);
  }

}
