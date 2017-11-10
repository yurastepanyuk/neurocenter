import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ContentService} from '../shared/content.service';
import {Observable} from 'rxjs/Observable';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';


@Injectable()
export class MaterialsService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, public cs: ContentService) {
    this.needUpdateParent = new EventEmitter();
  }

  deleteObject(data: any) {
    return this.api.delete('materials', data).catch(this.handleError);
  }

  handleError(error: Response | any) {
    // could be something more sofisticated
    console.log(error.message || error || `There was a problem with our MaterialsService!`);
    // throw an application level error
    return Observable.throw(error.message || error);
  }

  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

  getData(): Observable<ContentEditI[]>  {

    const materialsdata$ = this.api.get('materials').map((data: any) => {
      return data.map(this.cs.toContentEditIObject);
    } );
    return materialsdata$;
  }

  saveNewMaterials(newObj: ContentEditI): Observable<ContentEditI> {
    return this.api.post('materials', newObj).catch(this.handleError);
  }

}
