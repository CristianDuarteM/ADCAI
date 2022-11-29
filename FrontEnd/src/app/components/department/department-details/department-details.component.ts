import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentModel } from 'src/app/models/DepartmentModel';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  department: FormGroup;
  @Input() titleButton: string;
  @Input() descriptionForm: string;
  @Input() dataDepartment: DepartmentModel;

  constructor() {
    this.department = new FormGroup({});
    this.titleButton = '';
    this.descriptionForm = '';
    this.dataDepartment = { id: '', name: '', description: '', director: ''};
  }

  ngOnInit(): void {
    this.department = new FormGroup({
      name: new FormControl(this.dataDepartment.name),
      description: new FormControl(this.dataDepartment.description),
      director: new FormControl(this.dataDepartment.director)
    });
  }

  onSubmit() {

  }

}
