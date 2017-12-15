import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ContentService} from '../shared/content.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';

@Injectable()
export class AboutClinicService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, public cs: ContentService) {
    this.needUpdateParent = new EventEmitter();
  }

  deleteObject(data: any) {
    return this.api.deleteHttpClient('about-clinic', data).catch(this.handleError);
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

    // let pressadata: any;
    const pressadata = this.api.getHttpClient<ContentEditI[]>('about-clinic').map((data: any) => {
      return data.map(this.cs.toContentEditIObject);
    } );
    return pressadata;
  }

  saveNewAboutClinic(newObj: ContentEditI): Observable<ContentEditI> {
    return this.api.postHttpClient('about-clinic', newObj).catch(this.handleError);
  }

}
