import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-online-consultation',
  templateUrl: './online-consultation.component.html',
  styleUrls: ['./online-consultation.component.css']
})
export class OnlineConsultationComponent implements OnInit {

  viewnewtopic: boolean;

  myForm: FormGroup;

  answers: Object[];

  constructor(fb: FormBuilder) {
    this.viewnewtopic = false;
    this.myForm = fb.group({
      'headerTopic':  ['', Validators.required],
      'content':  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  showNewTopic(): void {
    if (!this.viewnewtopic) {
      this.viewnewtopic = true;
    }
  }

  showAnswers(): void {
    if (!this.answers) {
      this.answers = [];
    }
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    if (!this.myForm.valid) {
      return;
    }
    this.viewnewtopic = false;
  }

  closeForm(): void {
    this.viewnewtopic = false;
  }

}
