import { Component, OnInit, Input } from '@angular/core';
import { Feedback } from 'src/app/models/Feedback';

@Component({
  selector: 'app-feedback-cai',
  templateUrl: './feedback-cai.component.html',
  styleUrls: ['./feedback-cai.component.css']
})
export class FeedbackCaiComponent implements OnInit {

  @Input() feedbackList: Feedback[];

  constructor() {
    this.feedbackList = [];
  }

  ngOnInit(): void {
  }

}
