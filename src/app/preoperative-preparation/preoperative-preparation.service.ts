import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ContentService} from '../shared/content.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';

@Injectable()
export class PreoperativePreparationService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, public cs: ContentService) {
    this.needUpdateParent = new EventEmitter();
  }

  deleteObject(data: any) {
    return this.api.deleteHttpClient('preoperative-preparation', data).catch(this.handleError);
  }

  handleError(error: any) {
    // could be something more sofisticated
    console.log(error.message || error || `There was a problem with our AboutClinicService!`);
    // throw an application level error
    return Observable.throw(error.message || error);
  }

  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

  getData(): Observable<ContentEditI[]>  {

    const pressadata$ = this.api.getHttpClient<ContentEditI[]>('preoperative-preparation').map((data: any) => {
      return data.map(this.cs.toContentEditIObject);
    } );
    return pressadata$;
  }

  saveNewPreoperative(newObj: ContentEditI): Observable<ContentEditI> {
    return this.api.postHttpClient('preoperative-preparation', newObj).catch(this.handleError);
  }

}
