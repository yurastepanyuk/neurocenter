import {Component, Input, OnInit} from '@angular/core';
import {TeamClinicDto} from '../team-clinic-dto';
import {FormBuilder} from '@angular/forms';
import {TeamClinicService} from '../team-clinic.service';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-team-clinic-view',
  templateUrl: './team-clinic-view.component.html',
  styleUrls: ['./team-clinic-view.component.css']
}) export class TeamClinicViewComponent implements OnInit {

  _teamObject: TeamClinicDto;

  @Input()
  set teamObject(teamClinicObject: TeamClinicDto) {
    this._teamObject = teamClinicObject;
    this.cs.initComponentOfContent(this, teamClinicObject);
  }

  isThereMedia: boolean;
  isItImgGoogleDrive: boolean;
  isItVideoGoogleDrive: boolean;
  isItVideoYoutube: boolean;
  isThereDownloadGoogleDrive: boolean;
  isThereFolderGoogleDrive: boolean;
  constructor(fb: FormBuilder, private ts: TeamClinicService, public cs: ContentService,
              public auth: AuthService) { }

  ngOnInit() {
  }

  private initObject() {
  }

  deleteItem() {
    const delObject = {
      idObject: this._teamObject.id,
      headerTopic: this._teamObject.headerTopic
    };

    this.ts.deleteObject(delObject).subscribe( deletedObject => {
        console.log('deletedObject from TeamClinicViewComponent: ');
        console.log(deletedObject);
        this.ts.updateParentComponent(deletedObject);
      },
      error => console.log(<any>error) );
  }

  getUrlContent() {
   return this.cs.getUrlMediaContent(this, this._teamObject);
  }
}
