import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PressaCurObjectComponent} from '../pressa-cur-object/pressa-cur-object.component';
import {PressaServiceService} from '../pressa-service.service';
import {PressaAboutUsI} from '../../dtd/pressa-about-us';

@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.css']
})
export class ContentEditComponent implements OnInit {

  public myForm: FormGroup;
  public keysKindsOfMedia: string[];
  public _initParametres: Map<string, any>;
  public addedItem;
  errorMessage: String;

  typeContent: String;
  _contentObject: any;
  @Input()
  set contentObject(contentObject: any) {
    this._contentObject = contentObject;
    console.log('set contentObject ' + contentObject.toString());
    this.initObject();
  }

  @Input()
  set initParametres(param: Map<string, any>) {
    this._initParametres = param;
    // this.myForm.get('mediaContent').setValue(param.get('urlMediaContent'));
    this.myForm.patchValue({mediaContent: param.get('urlMediaContent')});
    // this.typeContent = param.get('typeContent');
    this.typeContent = this.getTypeContent();
    // this.view = param.get('view');
  }

  constructor(fb: FormBuilder,
              @Inject('mapKindsOfMedia') public mapKindsOfMedia: Map<string, string>,
              private sp: PressaServiceService) {
    this.myForm = fb.group({
      'headerTopic':  ['', Validators.required],
      'context':  ['', Validators.required],
      'typecontent':  ['', Validators.required],
      'mediaContent':  ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('ngOnInit() ');
    this.keysKindsOfMedia = Array.from(this.mapKindsOfMedia.keys());
  }

  onSubmit() {
    if (!this._contentObject) {
      if (this.typeContent === 'presa-aboutus') {
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
            this.addedItem = addedItem;
            },
          error => this.errorMessage = <any>error);
      }
    } else {
      const idEdit = this._contentObject.id;

      const updObj: PressaAboutUsI = {
        headerTopic: this.myForm.get('headerTopic').value,
        context: this.myForm.get('context').value,
        typecontent: this.myForm.get('typecontent').value,
        idcontent: this.parseMediaContentLink(this.myForm.get('mediaContent').value, this.myForm.get('typecontent').value),
        dateCreated: new Date().toISOString()
      };
      const body = {
        idObject: idEdit,
        data: updObj
      };

      const updatedItem = this.sp.updateContent(idEdit, body).subscribe( updItem => {
          console.log('updItem: ');
          console.log(updItem);
          this.addedItem = updItem;
        },
        error => this.errorMessage = <any>error);
    }
  }

  private initObject() {
    this.myForm.patchValue({headerTopic: this._contentObject.headerTopic});
    this.myForm.patchValue({context: this._contentObject.context});
    this.myForm.patchValue({typecontent: this._contentObject.typecontent});
    // this.myForm.patchValue({mediaContent: this._contentObject.mediaContent});
  }
  closeEdit() {
    console.log('closeEdit() ');
    // console.log('context parent ' + this._initParametres.get('context'));
    this._initParametres.get('context').closeEdit();
  }
  getTypeContent(): string {
    if (!this._initParametres) {
      return '';
    } else if (!this._initParametres.get('context')) {
      return '';
    }
    const cont = this._initParametres.get('context');
    // console.log('cont ' + cont.constructor.name);
    // console.log(' cont instanceof  PressaCurObjectComponent ' + (cont instanceof  PressaCurObjectComponent));
    if (cont instanceof  PressaCurObjectComponent) {
      return 'presa-aboutus';
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

}
