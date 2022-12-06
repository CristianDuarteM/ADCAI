import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CaiModel } from 'src/app/models/CaiModel';

@Component({
  selector: 'app-basic-cai',
  templateUrl: './basic-cai.component.html',
  styleUrls: ['./basic-cai.component.css']
})
export class BasicCaiComponent implements OnInit {

  @Input() basicCai: CaiModel;
  @Input() isUpdate: boolean;
  requestCaiForm: FormGroup;

  constructor(private navigation: Router) {
    this.basicCai = {id: '', semester: '', year: '', date: new Date(), teacher: {code: '', name: '', lastName: '', email: '',
      hasCAI: true, role: [''], faculty: '', department: '', signature: ''}};
    this.requestCaiForm = new FormGroup({});
    this.isUpdate = false;
  }

  ngOnInit(): void {
    this.requestCaiForm = new FormGroup({
      semesterInput: new FormControl({value: this.basicCai.semester, disabled: true}),
      yearInput: new FormControl({value: this.basicCai.year, disabled: true}),
      dateInput: new FormControl('')
    });
  }

}
