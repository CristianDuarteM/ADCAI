import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  department: FormGroup;

  constructor() {
    this.department = new FormGroup({});
  }

  ngOnInit(): void {
    this.department = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      director: new FormControl('')
    });
  }

  onSubmit() {

  }

}
