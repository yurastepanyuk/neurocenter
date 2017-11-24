import {Component, Input, OnInit} from '@angular/core';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';
import {ContactsOurService} from '../contacts-our.service';

@Component({
  selector: 'app-contacts-our-view',
  templateUrl: './contacts-our-view.component.html',
  styleUrls: ['./contacts-our-view.component.css']
})
export class ContactsOurViewComponent implements OnInit {

  _contactsOurObject: ContentEditI;

  @Input()
  set contactsOurObject(contentObject: ContentEditI) {
    this._contactsOurObject = contentObject;
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
               private cos: ContactsOurService) { }

  ngOnInit() {
  }

  private initObject() {
  }

  deleteItem() {
    const delObject = {
      idObject: this._contactsOurObject.id,
      headerTopic: this._contactsOurObject.headerTopic
    };

    this.cos.deleteObject(delObject).subscribe( deletedObject => {
        console.log('deletedObject from ContactsOurViewComponent: ');
        console.log(deletedObject);
        this.cos.updateParentComponent(deletedObject);
      },
      error => console.log(<any>error) );
  }

  getUrlContent() {
    return this.cs.getUrlMediaContent(this, this._contactsOurObject);
  }


}
