import { Component, OnInit } from '@angular/core';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {PreoperativePreparationService} from '../preoperative-preparation.service';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-preoperative-preparation-list',
  templateUrl: './preoperative-preparation-list.component.html',
  styleUrls: ['./preoperative-preparation-list.component.css']
})
export class PreoperativePreparationListComponent implements OnInit {

  viewnewnopic: boolean;
  preoperativeList: ContentEditI[];
  loading: Boolean = false;
  public newPreoperative: ContentEditI = null;

  errorMessage: String;

  constructor(private pps: PreoperativePreparationService,
              private cs: ContentService,
              public auth: AuthService) {
    this.viewnewnopic = false;

    pps.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  updateView() {
    this.pps.getData().subscribe(
      (results) => { // on sucesss
        this.preoperativeList = this.cs.sortedbyDateCreated(results);

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

  getEmptyPreoperative(): ContentEditI {
    return this.cs.getEmptyContent();
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('typeContent', 'preoperative-preparation');
    parametres.set('urlMediaContent', '');
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  closeEdit(): void {
    this.viewnewnopic = false;
  }
}
