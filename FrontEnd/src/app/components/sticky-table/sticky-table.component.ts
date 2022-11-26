import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sticky-table',
  templateUrl: './sticky-table.component.html',
  styleUrls: ['./sticky-table.component.css']
})
export class StickyTableComponent implements OnInit {

  @Input() elementsData: any[];
  @Input() columnsToDisplay: string[];
  @Input() headerTable: string;
  dataArray: MatTableDataSource<any>;

  constructor() {
    this.elementsData = [];
    this.columnsToDisplay = [];
    this.headerTable = '';
    this.dataArray = new MatTableDataSource(undefined);
  }

  ngOnInit(): void {
    this.dataArray = new MatTableDataSource(this.elementsData);
  }

}
