import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fill-cai',
  templateUrl: './fill-cai.component.html',
  styleUrls: ['./fill-cai.component.css']
})
export class FillCaiComponent implements OnInit {

  backRouteFillCai: string;
  titleFillCai: string;
  isPrincipalFillCai: boolean;

  constructor() {
    this.backRouteFillCai = '/home';
    this.titleFillCai = 'Diligenciar Carga Académica Integral';
    this.isPrincipalFillCai = true;
  }

  ngOnInit(): void {
  }

}
