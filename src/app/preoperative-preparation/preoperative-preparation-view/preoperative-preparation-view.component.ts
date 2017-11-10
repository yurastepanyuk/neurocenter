import {Component, Input, OnInit} from '@angular/core';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';
import {PreoperativePreparationService} from '../preoperative-preparation.service';

@Component({
  selector: 'app-preoperative-preparation-view',
  templateUrl: './preoperative-preparation-view.component.html',
  styleUrls: ['./preoperative-preparation-view.component.css']
})
export class PreoperativePreparationViewComponent implements OnInit {

  _preoperativeObject: ContentEditI;

  @Input()
  set preoperativeObject(contentObject: ContentEditI) {
    this._preoperativeObject = contentObject;
    this.cs.initComponentOfContent(this, contentObject);
  }

  isThereMedia: boolean;
  isItImgGoogleDrive: boolean;
  isItVideoGoogleDrive: boolean;
  isItVideoYoutube: boolean;
  isThereDownloadGoogleDrive: boolean;
  isThereFolderGoogleDrive: boolean;
  isItHtmlContent: boolean;
  constructor( public cs: ContentService,
               public auth: AuthService,
               private pps: PreoperativePreparationService) { }

  ngOnInit() {
  }

  private initObject() {
  }

  deleteItem() {
    const delObject = {
      idObject: this._preoperativeObject.id,
      headerTopic: this._preoperativeObject.headerTopic
    };

    this.pps.deleteObject(delObject).subscribe( deletedObject => {
        console.log('deletedObject from PreoperativePreparationViewComponent: ');
        console.log(deletedObject);
        this.pps.updateParentComponent(deletedObject);
      },
      error => console.log(<any>error) );
  }

  getUrlContent() {
    return this.cs.getUrlMediaContent(this, this._preoperativeObject);
  }

}
