import { Component, OnInit } from '@angular/core';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {ContactsOurService} from '../contacts-our.service';
import {ContentService} from '../../shared/content.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-contacts-our-list',
  templateUrl: './contacts-our-list.component.html',
  styleUrls: ['./contacts-our-list.component.css']
})
export class ContactsOurListComponent implements OnInit {

  viewnewnopic: boolean;
  contactsOurList: ContentEditI[];
  loading: Boolean = false;
  public newContactsOur: ContentEditI = null;

  errorMessage: String;

  constructor(private cos: ContactsOurService,
              private cs: ContentService,
              public auth: AuthService) {
    this.viewnewnopic = false;

    cos.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  updateView() {
    this.cos.getData().subscribe(
      (results) => { // on sucesss
        this.contactsOurList = this.cs.sortedbyDateCreated(results);

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

  getEmptyContactsOur(): ContentEditI {
    return this.cs.getEmptyContent();
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('typeContent', 'contacts-our');
    parametres.set('urlMediaContent', '');
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  closeEdit(): void {
    this.viewnewnopic = false;
  }
}
