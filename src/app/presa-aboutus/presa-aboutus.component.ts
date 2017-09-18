import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-presa-aboutus',
  templateUrl: './presa-aboutus.component.html',
  styleUrls: ['./presa-aboutus.component.css']
})
export class PresaAboutusComponent implements OnInit {

  viewnewnopic: boolean;

  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.viewnewnopic = false;
    this.myForm = fb.group({
      'headerTopic':  ['', Validators.required],
      'context':  ['', Validators.required],
      'typecontent':  ['', Validators.required],
      'videoContent':  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  showNewTopic(): void {
    if (!this.viewnewnopic) {
      this.viewnewnopic = true;
    }
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    if (!this.myForm.valid) {
      return;
    }
    this.viewnewnopic = false;
  }

  closeForm(): void {
    this.viewnewnopic = false;
  }

}
