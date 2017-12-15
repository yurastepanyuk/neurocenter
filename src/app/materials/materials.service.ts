import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ContentService} from '../shared/content.service';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';


@Injectable()
export class MaterialsService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, public cs: ContentService) {
    this.needUpdateParent = new EventEmitter();
  }

  deleteObject(data: any) {
    return this.api.deleteHttpClient('materials', data).catch(this.handleError);
  }

  handleError(error: Response | any) {
    if (error == null) {
      console.log(`There was a problem with our MaterialsService!`);
      return Observable.throw(`There was a problem with our MaterialsService!`);
    }
    // could be something more sofisticated
    console.log(error || error.message || `There was a problem with our MaterialsService!`);
    // throw an application level error
    return Observable.throw(error.message || error);
  }

  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

  getData(): Observable<ContentEditI[]>  {

    const materialsdata = this.api.getHttpClient<ContentEditI[]>('materials').map((data: any) => {
      return data.map(this.cs.toContentEditIObject);
    });
     return materialsdata;
  }

  saveNewMaterials(newObj: ContentEditI): Observable<ContentEditI> {
    return this.api.postHttpClient('materials', newObj).catch(this.handleError);
  }

}
