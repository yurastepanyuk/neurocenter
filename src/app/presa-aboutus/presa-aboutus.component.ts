import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {PressaServiceService} from './pressa-service.service';
import { Response} from '@angular/http';


@Component({
  selector: 'app-presa-aboutus',
  templateUrl: './presa-aboutus.component.html',
  styleUrls: ['./presa-aboutus.component.css']
  // providers: [PressaServiceService]
})
export class PresaAboutusComponent implements OnInit {

  viewnewnopic: boolean;

  myForm: FormGroup;

  data: any;

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
  }

  showNewTopic(): void {
    if (!this.viewnewnopic) {
      this.viewnewnopic = true;
    }

    this.sp.getData().subscribe((data: Response) => console.log(<any> data.json()));

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
