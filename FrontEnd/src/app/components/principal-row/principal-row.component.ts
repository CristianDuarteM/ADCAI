import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-principal-row',
  templateUrl: './principal-row.component.html',
  styleUrls: ['./principal-row.component.css']
})
export class PrincipalRowComponent implements OnInit {

  @Input() backRoute: string;
  @Input() title: string;
  @Input() isPrincipal: boolean;

  constructor() {
    this.backRoute = '';
    this.title = '';
    this.isPrincipal = false;
  }

  ngOnInit(): void {
  }

}
