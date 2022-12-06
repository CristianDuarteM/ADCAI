import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DisableDialogComponent } from '../disable-dialog/disable-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sticky-table',
  templateUrl: './sticky-table.component.html',
  styleUrls: ['./sticky-table.component.css']
})
export class StickyTableComponent implements OnInit {

  @Input() withFilter: boolean;
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

  constructor(public dialog: MatDialog,  private navigation: Router) {
    this.withFilter = false;
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

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataArray.filter = filterValue.trim().toLowerCase();
  }

  getCai() {
    this.navigation.navigate([this.buttonRoute]);
  }

}
