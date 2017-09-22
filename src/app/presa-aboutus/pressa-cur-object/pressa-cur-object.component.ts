import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PressaAboutUs} from '../../dtd/pressa-about-us.model';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-pressa-cur-object',
  templateUrl: './pressa-cur-object.component.html',
  styleUrls: ['./pressa-cur-object.component.css']
})
export class PressaCurObjectComponent implements OnInit {

  _pressaObject: PressaAboutUs;

  @Input()
  set pressaObject(pressaObject: PressaAboutUs) {
    // console.log('prev value: ', this._pressaObject);
    // console.log('got name: ', pressaObject);
    this._pressaObject = pressaObject;
    this.initObject();
  }

  isThereMedia: boolean;
  isThereDownload: boolean;
  isThereFolder: boolean;

  myForm: FormGroup;

  constructor(fb: FormBuilder) {

    this.myForm = fb.group({
      'pressaObject':  [{}]
    });

  }

  ngOnInit() {
  }
  initObject(): void {
    console.log('initObject: ', this.pressaObject);



  }

  // ngOnChanges(changes: SimpleChanges) {
  //   const name: SimpleChange = changes.name;
  //   console.log('prev value: ', name.previousValue);
  //   console.log('got name: ', name.currentValue);
  //   this._name = name.currentValue.toUpperCase();
  // }

  // get name(): string {
  //   // transform value for display
  //   return this._name.toUpperCase();
  // }

}
