import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DisableDialogComponent } from '../disable-dialog/disable-dialog.component';
import { Router } from '@angular/router';
import { EnableDialogComponent } from '../enable-dialog/enable-dialog.component';
import { Cai } from 'src/app/models/Cai';

@Component({
  selector: 'app-sticky-table',
  templateUrl: './sticky-table.component.html',
  styleUrls: ['./sticky-table.component.css']
})
export class StickyTableComponent implements OnInit {

  @Input() actualComponent: string;
  @Input() withFilter: boolean;
  @Input() elementsData: any[];
  @Input() columnsToDisplay: string[];
  @Input() headerTable: string;
  @Input() buttonRoute: string;
  @Input() descriptionDialog: string;
  @Input() onlyView: boolean;
  @Input() viewCAI: boolean;
  dataArray: MatTableDataSource<any>;
  @Input() dataCai: Cai;
  @Input() heightTable: {
    height: string
  };

  constructor(public dialog: MatDialog,  private navigation: Router) {
    this.actualComponent = '';
    this.withFilter = false;
    this.elementsData = [];
    this.columnsToDisplay = [];
    this.headerTable = '';
    this.buttonRoute = '';
    this.descriptionDialog = '';
    this.onlyView = sessionStorage.getItem('activeRole') === 'DIRECTOR';
    this.viewCAI = false;
    this.dataArray = new MatTableDataSource(undefined);
    this.dataCai = new Cai();
    this.heightTable = {
      height: '50vh'
    };
  }

  ngOnInit(): void {
    this.dataArray = new MatTableDataSource(this.elementsData);
  }

  openDialog(idComponent: number) {
    this.dialog.open(DisableDialogComponent, {
      data: {
        description: this.descriptionDialog,
        actualComponent: this.actualComponent,
        idComponent
      }
    });
  }

  openDialogEnable(idComponent: number) {
    this.dialog.open(EnableDialogComponent, {
      data: {
        description: this.descriptionDialog,
        actualComponent: this.actualComponent,
        idComponent
      }
    });
  }

  redirectButton(id: number) {
    this.navigation.navigate([this.buttonRoute, id]);
  }

  redirectViewStudyPlan(id: number) {
    this.navigation.navigate(['/gestion-plan-estudio/ver/', id]);
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataArray.filter = filterValue.trim().toLowerCase();
  }

  getCai(id: number) {
    this.navigation.navigate([this.buttonRoute, id]);
  }

  validateCai(idCai: string) {
    this.navigation.navigate(['/evaluar-cai/', idCai]);
  }

}
