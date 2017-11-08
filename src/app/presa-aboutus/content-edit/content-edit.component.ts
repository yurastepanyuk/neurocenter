import {Component, Inject, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PressaCurObjectComponent} from '../pressa-cur-object/pressa-cur-object.component';
import {PressaServiceService} from '../pressa-service.service';
import {PressaAboutUsI} from '../../dtd/pressa-about-us';
import {ContentEditI} from './content-edit-i';
import {TeamClinicViewComponent} from '../../team-clinic/team-clinic-view/team-clinic-view.component';
import {TeamClinicService} from '../../team-clinic/team-clinic.service';
import {AboutClinicService} from '../../about-clinic/about-clinic.service';
import {AboutClinicViewComponent} from '../../about-clinic/about-clinic-view/about-clinic-view.component';

@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.css']
})
export class ContentEditComponent implements OnInit {

  public contentForm: FormGroup;
  public keysKindsOfMedia: string[];
  public _initParametres: Map<string, any>;
  @Output() public addedItem: EventEmitter<any>;
  errorMessage: String;

  typeContent: String;
  _contentObject: any;
  @Input()
  set contentObject(contentObject: any) {
    if ((contentObject) && (contentObject.id)) {
      this._contentObject = contentObject;
      console.log('set contentObject ' + contentObject.toString());
      this.initObject();
    }
  }

  @Input()
  set initParametres(param: Map<string, any>) {
    this._initParametres = param;
    if (this._contentObject) {
      // Установка значения в input поле html
      // this.contentForm.get('mediaContent').setValue(param.get('urlMediaContent'));
      this.contentForm.patchValue({mediaContent: param.get('urlMediaContent')});
    }
    // this.typeContent = param.get('typeContent');
    this.typeContent = this.getTypeContent();
    // this.view = param.get('view');
  }

  constructor(fb: FormBuilder,
              @Inject('mapKindsOfMedia') public mapKindsOfMedia: Map<string, string>,
              private sp: PressaServiceService,
              private ts: TeamClinicService,
              private acs: AboutClinicService) {
    this.contentForm = fb.group({
      'headerTopic':  ['', Validators.required],
      'context':  ['', Validators.required],
      'typecontent':  ['', Validators.required],
      'mediaContent':  ['', Validators.required]
    });
    this.addedItem = new EventEmitter();
  }

  ngOnInit() {
    console.log('ngOnInit() ');
    this.keysKindsOfMedia = Array.from(this.mapKindsOfMedia.keys());
  }

  onSubmit(form: any) {
    if (!this._contentObject) {
      if (this.typeContent === 'presa-aboutus') {
        console.log(this.contentForm);
        const newObj: PressaAboutUsI = {
          headerTopic: this.contentForm.get('headerTopic').value,
          context: this.contentForm.get('context').value,
          typecontent: this.contentForm.get('typecontent').value,
          idcontent: this.parseMediaContentLink(this.contentForm.get('mediaContent').value, this.contentForm.get('typecontent').value),
          dateCreated: new Date().toISOString()
        };

        console.log('you want this obj to save into DB :', newObj);

        const addeddItem = this.sp.saveNewPressaAnoutUs(newObj).subscribe( addedItem => {
            console.log('addedItem: ');
            console.log(addedItem);
            this.addedItem.emit(addedItem);
            this.sp.needUpdateParent.emit(addedItem);
          },
          error => this.errorMessage = <any>error);
      } else if (this.typeContent === 'team-clinic') {
        const newObj: ContentEditI = {
          headerTopic: this.contentForm.get('headerTopic').value,
          context: this.contentForm.get('context').value,
          typecontent: this.contentForm.get('typecontent').value,
          idcontent: this.parseMediaContentLink(this.contentForm.get('mediaContent').value, this.contentForm.get('typecontent').value),
          dateCreated: new Date().toISOString()
        };

        console.log('you want this obj to save into DB :', newObj);

        const addeddItem = this.ts.saveNewTeamClinic(newObj).subscribe( addedItem => {
            console.log('addedItem: ');
            console.log(addedItem);
            this.addedItem.emit(addedItem);
            this.ts.needUpdateParent.emit(addedItem);
          },
          error => this.errorMessage = <any>error);
      } else if (this.typeContent === 'about-clinic') {
        const newObj: ContentEditI = {
          headerTopic: this.contentForm.get('headerTopic').value,
          context: this.contentForm.get('context').value,
          typecontent: this.contentForm.get('typecontent').value,
          idcontent: this.parseMediaContentLink(this.contentForm.get('mediaContent').value, this.contentForm.get('typecontent').value),
          dateCreated: new Date().toISOString()
        };

        console.log('you want this obj to save into DB :', newObj);

        const addeddItem = this.acs.saveNewAboutClinic(newObj).subscribe( addedItem => {
            console.log('addedItem: ');
            console.log(addedItem);
            this.addedItem.emit(addedItem);
            this.acs.needUpdateParent.emit(addedItem);
          },
          error => this.errorMessage = <any>error);
      }
    } else {
      const idEdit = this._contentObject.id;

      const updObj: PressaAboutUsI = {
        headerTopic: this.contentForm.get('headerTopic').value,
        context: this.contentForm.get('context').value,
        typecontent: this.contentForm.get('typecontent').value,
        idcontent: this.parseMediaContentLink(this.contentForm.get('mediaContent').value, this.contentForm.get('typecontent').value),
        dateCreated: new Date().toISOString()
      };
      const body = {
        idObject: idEdit,
        data: updObj
      };

      const updatedItem = this.sp.updateContent(idEdit, body).subscribe( updItem => {
          console.log('updItem: ');
          console.log(updItem);
          this.addedItem.emit(updItem);
          this.sp.needUpdateParent.emit(updItem);
        },
        error => this.errorMessage = <any>error);
    }
  }

  private initObject() {
    this.contentForm.patchValue({headerTopic: this._contentObject.headerTopic});
    this.contentForm.patchValue({context: this._contentObject.context});
    this.contentForm.patchValue({typecontent: this._contentObject.typecontent});
    // this.contentForm.patchValue({mediaContent: this._contentObject.mediaContent});
  }
  closeEdit() {
    console.log('closeEdit() ');
    // console.log('context parent ' + this._initParametres.get('context'));
    this._initParametres.get('context').closeEdit();
  }
  getTypeContent(): string {
    if (!this._initParametres) {
      return '';
    } else if (this._initParametres.get('typeContent')) {
      return  this._initParametres.get('typeContent');
    } else if (!this._initParametres.get('context')) {
      return '';
    }
    const cont = this._initParametres.get('context');
    // console.log('cont ' + cont.constructor.name);
    // console.log(' cont instanceof  PressaCurObjectComponent ' + (cont instanceof  PressaCurObjectComponent));
    if (cont instanceof  PressaCurObjectComponent) {
      return 'presa-aboutus';
    } else if (cont instanceof  TeamClinicViewComponent) {
      return 'team-clinic';
    } else if (cont instanceof  AboutClinicViewComponent) {
      return 'about-clinic';
    }
    return '';
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
  getRoutePath() {
    if (this.typeContent === 'presa-aboutus') {
      return '/pressaaboutus';
    } else if (this.typeContent === 'team-clinic') {
      return '/teamclinic';
    } else if (this.typeContent === 'about-clinic') {
      return '/aboutclinic';
    }
    return '/pressaaboutus';
  }

}
