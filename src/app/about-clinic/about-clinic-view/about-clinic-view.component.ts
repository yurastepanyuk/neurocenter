import {Component, Input, OnInit} from '@angular/core';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';
import {AboutClinicService} from '../about-clinic.service';

@Component({
  selector: 'app-about-clinic-view',
  templateUrl: './about-clinic-view.component.html',
  styleUrls: ['./about-clinic-view.component.css']
})
export class AboutClinicViewComponent implements OnInit {


  _aboutClinicObject: ContentEditI;

  @Input()
  set aboutClinicObject(contentObject: ContentEditI) {
    this._aboutClinicObject = contentObject;
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
              private acs: AboutClinicService) { }

  ngOnInit() {
  }

  private initObject() {
  }

  deleteItem() {
    const delObject = {
      idObject: this._aboutClinicObject.id,
      headerTopic: this._aboutClinicObject.headerTopic
    };

    this.acs.deleteObject(delObject).subscribe( deletedObject => {
        console.log('deletedObject from AboutClinicViewComponent: ');
        console.log(deletedObject);
        this.acs.updateParentComponent(deletedObject);
      },
      error => console.log(<any>error) );
  }

  getUrlContent() {
    return this.cs.getUrlMediaContent(this, this._aboutClinicObject);
  }

}
