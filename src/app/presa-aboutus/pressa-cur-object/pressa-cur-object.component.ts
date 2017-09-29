import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PressaAboutUs} from '../../dtd/pressa-about-us.model';
import { FormBuilder, FormGroup} from '@angular/forms';

import {DomSanitizer} from '@angular/platform-browser';

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
  isItImgGoogleDrive: boolean;
  isItVideoGoogleDrive: boolean;
  isItVideoYoutube: boolean;
  isThereDownloadGoogleDrive: boolean;
  isThereFolderGoogleDrive: boolean;

  myForm: FormGroup;

  constructor(fb: FormBuilder, public sanitizer: DomSanitizer) {

    this.myForm = fb.group({
      'pressaObject':  [{}]
    });

  }

  ngOnInit() {
  }
  initObject(): void {
    console.log('initObject: ', this.pressaObject);

    if (this._pressaObject.typecontent === 'imageFromGoogleDrive'
      || this._pressaObject.typecontent === 'videoFromYouTube'
      || this._pressaObject.typecontent === 'videoFromGoogleDrive') {
      this.isThereMedia = true;

      if (this._pressaObject.typecontent === 'imageFromGoogleDrive') {
        this.isItImgGoogleDrive = true;
      } else if (this._pressaObject.typecontent === 'videoFromYouTube') {
        this.isItVideoYoutube = true;
      } else if (this._pressaObject.typecontent === 'videoFromGoogleDrive') {
        this.isItVideoGoogleDrive = true;
      }
    } else if (this._pressaObject.typecontent === 'fileFromGoogleDrive') {
      this.isThereDownloadGoogleDrive = true;
    } else if (this._pressaObject.typecontent === 'folderFromGoogleDrive') {
      this.isThereFolderGoogleDrive = true;
    }
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

  getUrlMediaContent(): string {
    if (this.isItImgGoogleDrive) {
      return 'https://drive.google.com/uc?export=download&id=' + this._pressaObject.idcontent;
    } else if (this.isItVideoGoogleDrive) {
      return 'https://drive.google.com/file/d/' + this._pressaObject.idcontent + '/preview';
    } else if (this.isItVideoYoutube) {
      return 'https://www.youtube.com/embed/' + this._pressaObject.idcontent;
    } else if (this.isThereFolderGoogleDrive) {
      return 'https://drive.google.com/embeddedfolderview?id=' + this._pressaObject.idcontent + '#list';
    } else if (this.isThereDownloadGoogleDrive) {
      return 'https://drive.google.com/uc?export=download&id=' + this._pressaObject.idcontent;
    }

    return '';
  }

}
