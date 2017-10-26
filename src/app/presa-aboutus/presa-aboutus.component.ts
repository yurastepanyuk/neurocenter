import {Component, Inject, OnInit, Output} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {PressaServiceService} from './pressa-service.service';
import {PressaAboutUs} from '../dtd/pressa-about-us.model';

import 'rxjs/add/operator/map';

import {PressaAboutUsI} from '../dtd/pressa-about-us';
import {forEach} from '@angular/router/src/utils/collection';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-presa-aboutus',
  templateUrl: './presa-aboutus.component.html',
  styleUrls: ['./presa-aboutus.component.css']
  // providers: [PressaServiceService]
})
export class PresaAboutusComponent implements OnInit {

  viewnewnopic: boolean;

  public myForm: FormGroup;

  pressaList: PressaAboutUs[];
  loading: Boolean = false;
  public newPressaAboutUs: PressaAboutUs = null;

  public keysKindsOfMedia: string[];

  errorMessage: String;

  constructor(fb: FormBuilder,
              private sp: PressaServiceService,
              @Inject('mapKindsOfMedia') public mapKindsOfMedia: Map<string, string>,
              public auth: AuthService) {

    this.viewnewnopic = false;
    this.myForm = fb.group({
      'headerTopic':  ['', Validators.required],
      'context':  ['', Validators.required],
      'typecontent':  ['', Validators.required],
      'mediaContent':  ['', Validators.required]
    });

    sp.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  updateView() {
    this.sp.getData().subscribe(
      (results) => { // on sucesss
        // this.pressaList = results;
        this.pressaList = this.sortedPressaAboutUs(results);
        // console.log('Array of data from service: ', results);
        for (let i = 0; i < this.pressaList.length; i++) {
          console.log(this.pressaList[i]);
        }
      });
  }
  ngOnInit() {
    this.keysKindsOfMedia = Array.from(this.mapKindsOfMedia.keys());
    this.updateView();
    console.log('USER ' + this.auth.getUser());
  }

  showNewTopic(): void {
    if (!this.viewnewnopic) {
      this.viewnewnopic = true;
    }
  }

  onSubmit(form: any): void {
    this.loading = true;

    console.log('you submitted value from form:', form);
    if (!this.myForm.valid) {
      return;
    }

    console.log('you submitted value from this.myform:', this.myForm);

    // const formValues = Object.assign({}, form.value);

    // console.log('you submitted value from formValues:', form);

    const newObj: PressaAboutUsI = {
      headerTopic: this.myForm.get('headerTopic').value,
      context: this.myForm.get('context').value,
      typecontent: this.myForm.get('typecontent').value,
      idcontent: this.parseMediaContentLink(this.myForm.get('mediaContent').value, this.myForm.get('typecontent').value),
      dateCreated: new Date().toISOString()
    };

    console.log('you want this obj to save into DB :', newObj);

    const addeddItem = this.sp.saveNewPressaAnoutUs(newObj).subscribe( addedItem => {
        console.log('addedItem: ');
        console.log(addedItem);
        this.newPressaAboutUs = addedItem;
        this.updateView();
        // this.sp.getData().subscribe(
        //   (results) => { // on sucesss
        //     // this.pressaList = results;
        //     this.pressaList = this.sortedPressaAboutUs(results);
        //   });
        },
      error => this.errorMessage = <any>error);
    // console.log(addeddItem.constructor.name);


    this.viewnewnopic = false;
    this.loading = false;
    this.errorMessage = null;
  }

  closeForm(): void {
    this.viewnewnopic = false;
  }
  closeEdit(): void {
    this.viewnewnopic = false;
    // this.closeForm();
  }

  sortedPressaAboutUs(input: PressaAboutUs[]): PressaAboutUs[] {
    return input.sort((a: PressaAboutUs, b: PressaAboutUs) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated));
  }


  private parseMediaContentLink(link: string, typeContent: string) {
    console.log(typeContent);
    if (typeContent.indexOf('GoogleDrive') >= 0) {
      const arraySubstring = link.split('/');
      const lastString = arraySubstring[arraySubstring.length - 1];
      return lastString.slice(lastString.indexOf('id=') + 3);
    } else if (typeContent.indexOf('YouTube') >= 0 ) {
      const arraySubstring = link.split('/');
      const lastString = arraySubstring[arraySubstring.length - 1];
      return lastString.slice(lastString.indexOf('v=') + 2);
    }else {
      return link;
    }
  }

  getEmptyPresaObject(): PressaAboutUs {
    return new PressaAboutUs();
  }
  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('typeContent', 'presa-aboutus');
    parametres.set('urlMediaContent', '');
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }
}
