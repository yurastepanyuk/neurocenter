import { Component, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {PressaServiceService} from './pressa-service.service';
import {PressaAboutUs} from '../dtd/pressa-about-us.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-presa-aboutus',
  templateUrl: './presa-aboutus.component.html',
  styleUrls: ['./presa-aboutus.component.css']
  // providers: [PressaServiceService]
})
export class PresaAboutusComponent implements OnInit {

  viewnewnopic: boolean;

  myForm: FormGroup;

  pressaList: PressaAboutUs[];

  constructor(fb: FormBuilder, private sp: PressaServiceService) {
    this.viewnewnopic = false;
    this.myForm = fb.group({
      'headerTopic':  ['', Validators.required],
      'context':  ['', Validators.required],
      'typecontent':  ['', Validators.required],
      'videoContent':  ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sp.getData().subscribe(
      (results) => { // on sucesss
        this.pressaList = results;
        console.log('ddd ', results);
      });
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
