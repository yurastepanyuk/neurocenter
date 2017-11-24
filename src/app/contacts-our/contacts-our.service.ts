import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api.service';
import {ContentService} from '../shared/content.service';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';

@Injectable()
export class ContactsOurService {
  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, public cs: ContentService) {
    this.needUpdateParent = new EventEmitter();
  }

  deleteObject(data: any) {
    return this.api.delete('contacts-our', data).catch(this.handleError);
  }

  handleError(error: Response | any) {
    // could be something more sofisticated
    console.log(error.message || error || `There was a problem with our ContactsOurService!`);
    // throw an application level error
    return Observable.throw(error.message || error);
  }

  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

  getData(): Observable<ContentEditI[]>  {

    const contactsOursdata$ = this.api.get('contacts-our').map((data: any) => {
      return data.map(this.cs.toContentEditIObject);
    } );
    return contactsOursdata$;
  }

  saveNewContactsOur(newObj: ContentEditI): Observable<ContentEditI> {
    return this.api.post('contacts-our', newObj).catch(this.handleError);
  }

}
