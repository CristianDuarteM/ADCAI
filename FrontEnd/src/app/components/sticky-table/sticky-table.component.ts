import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DisableDialogComponent } from '../disable-dialog/disable-dialog.component';

@Component({
  selector: 'app-sticky-table',
  templateUrl: './sticky-table.component.html',
  styleUrls: ['./sticky-table.component.css']
})
export class StickyTableComponent implements OnInit {

  @Input() elementsData: any[];
  @Input() columnsToDisplay: string[];
  @Input() headerTable: string;
  @Input() updateRoute: string;
  @Input() disableRoute: string;
  @Input() descriptionDialog: string;
  dataArray: MatTableDataSource<any>;

  constructor(public dialog: MatDialog) {
    this.elementsData = [];
    this.columnsToDisplay = [];
    this.headerTable = '';
    this.updateRoute = '';
    this.disableRoute = '';
    this.descriptionDialog = '';
    this.dataArray = new MatTableDataSource(undefined);
  }

  ngOnInit(): void {
    this.dataArray = new MatTableDataSource(this.elementsData);
  }

  openDialog() {
    this.dialog.open(DisableDialogComponent, {
      data: this.descriptionDialog
    });
  }

}
