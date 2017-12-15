import { Component, OnInit } from '@angular/core';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {MaterialsService} from '../materials.service';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit {

  viewnewnopic: boolean;
  materialsList: ContentEditI[];
  loading: Boolean = false;
  public newMaterials: ContentEditI = null;

  errorMessage: String;

  constructor(private mats: MaterialsService,
              private cs: ContentService,
              public auth: AuthService) {
    this.viewnewnopic = false;

    mats.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  updateView() {
    this.mats.getData().subscribe(
      (results) => { // on sucesss
        this.materialsList = this.cs.sortedbyDateCreated(results);
      }, err => {
        console.log('Something went wrong!');
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

  getEmptyMaterials(): ContentEditI {
    return this.cs.getEmptyContent();
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('typeContent', 'materials');
    parametres.set('urlMediaContent', '');
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  closeEdit(): void {
    this.viewnewnopic = false;
  }

}
