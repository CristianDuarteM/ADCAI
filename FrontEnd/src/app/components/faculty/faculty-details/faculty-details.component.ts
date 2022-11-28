import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FacultyModel } from 'src/app/models/FacultyModel';

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css']
})
export class FacultyDetailsComponent implements OnInit {

  faculty: FormGroup;
  @Input() titleButton: string;
  @Input() descriptionForm: string;
  @Input() dataFaculty: FacultyModel;

  constructor() {
    this.faculty = new FormGroup({});
    this.titleButton = '';
    this.descriptionForm = '';
    this.dataFaculty = { id: '', name: '', description: '', dean: ''};
  }

  ngOnInit(): void {
    this.faculty = new FormGroup({
      name: new FormControl(this.dataFaculty.name),
      description: new FormControl(this.dataFaculty.description),
      dean: new FormControl(this.dataFaculty.dean)
    });
  }

  onSubmit(){

  }
}
