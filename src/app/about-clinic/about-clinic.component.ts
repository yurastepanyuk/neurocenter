import { Component, OnInit } from '@angular/core';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';
import {AboutClinicService} from './about-clinic.service';
import {ContentService} from '../shared/content.service';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-about-clinic',
  templateUrl: './about-clinic.component.html',
  styleUrls: ['./about-clinic.component.css']
})
export class AboutClinicComponent implements OnInit {

  viewnewnopic: boolean;
  aboutClinicList: ContentEditI[];
  loading: Boolean = false;
  public newAboutClinic: ContentEditI = null;

  errorMessage: String;

  constructor(private acs: AboutClinicService,
              private cs: ContentService,
              public auth: AuthService) {

    this.viewnewnopic = false;

    acs.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  updateView() {
    this.acs.getData().subscribe(
      (results) => { // on sucesss
        this.aboutClinicList = this.cs.sortedbyDateCreated(results);

      });
  }

  ngOnInit() {
    this.updateView();
  }

  showNewTopic(): void {
    if (!this.viewnewnopic) {
      this.viewnewnopic = true;
    }
  }

  getEmptyAboutClinic(): ContentEditI {
    return this.cs.getEmptyContent();
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('typeContent', 'about-clinic');
    parametres.set('urlMediaContent', '');
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  closeEdit(): void {
    this.viewnewnopic = false;
  }



}
