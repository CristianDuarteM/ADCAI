import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css']
})
export class FacultyDetailsComponent implements OnInit {

  faculty: FormGroup;

  constructor() {
    this.faculty = new FormGroup({});
  }

  ngOnInit(): void {
    this.faculty = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      dean: new FormControl('')
    });
  }

  onSubmit(){

  }
}
