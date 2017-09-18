import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

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
