import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Http} from '@angular/http';
import {ContentService} from '../shared/content.service';
import { Observable } from 'rxjs/Observable';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';

@Injectable()
export class AboutClinicService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, private http: Http, public cs: ContentService) {
    this.needUpdateParent = new EventEmitter();
  }

  deleteObject(data: any) {
    return this.api.delete('about-clinic', data).catch(this.handleError);
  }

  handleError(error: Response | any) {
    // could be something more sofisticated
    console.log(error.message || error || `There was a problem with our AboutClinicService!`);
    // throw an application level error
    return Observable.throw(error.message || error);
  }

  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

  getData(): Observable<ContentEditI[]>  {

    const pressadata$ = this.api.get('about-clinic').map((data: any) => {
      return data.map(this.cs.toContentEditIObject);
    } );
    return pressadata$;
  }

  saveNewAboutClinic(newObj: ContentEditI): Observable<ContentEditI> {
    return this.api.post('about-clinic', newObj).catch(this.handleError);
  }

}