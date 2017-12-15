import {Component, Input, OnInit} from '@angular/core';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';
import {MaterialsService} from '../materials.service';

@Component({
  selector: 'app-materials-view',
  templateUrl: './materials-view.component.html',
  styleUrls: ['./materials-view.component.css']
})
export class MaterialsViewComponent implements OnInit {


  _materialObject: ContentEditI;

  @Input()
  set materialObject(contentObject: ContentEditI) {
    this._materialObject = contentObject;
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
               private mats: MaterialsService) { }

  ngOnInit() {
  }

  private initObject() {
  }

  deleteItem() {

    const timestamp = this._materialObject.id.toString().substring(0, 8);
    const dateCreated = new Date( parseInt( timestamp, 16 ) * 1000 );

    console.log('date create of delete Object ', dateCreated);
    const delObject = {
      idObject: this._materialObject.id,
      headerTopic: this._materialObject.headerTopic
    };

    this.mats.deleteObject(delObject).subscribe( deletedObject => {
        console.log('deletedObject from MaterialsViewComponent: ');
        console.log(deletedObject);
        this.mats.updateParentComponent(deletedObject);
      },
      error => console.log(<any>error) );
  }

  getUrlContent() {
    return this.cs.getUrlMediaContent(this, this._materialObject);
  }

}
