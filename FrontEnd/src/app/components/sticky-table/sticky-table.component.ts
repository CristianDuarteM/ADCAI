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
  @Input() buttonRoute: string;
  @Input() descriptionDialog: string;
  @Input() onlyView: boolean;
  @Input() viewCAI: boolean;
  dataArray: MatTableDataSource<any>;
  @Input() heightTable: {
    height: string
  };

  constructor(public dialog: MatDialog) {
    this.elementsData = [];
    this.columnsToDisplay = [];
    this.headerTable = '';
    this.buttonRoute = '';
    this.descriptionDialog = '';
    this.onlyView = sessionStorage.getItem('activeRole') === 'DIRECTOR';
    this.viewCAI = false;
    this.dataArray = new MatTableDataSource(undefined);
    this.heightTable = {
      height: '50vh'
    };
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
