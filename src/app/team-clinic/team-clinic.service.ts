import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {TeamClinicDto} from './team-clinic-dto';
import {ContentService} from '../shared/content.service';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';

@Injectable()
export class TeamClinicService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, private cs: ContentService) {
    this.needUpdateParent = new EventEmitter();
  }

  deleteObject(data: any) {
    return this.api.deleteHttpClient('team-clinic', data).catch(this.handleError);
  }

  handleError(error: any) {
    // could be something more sofisticated
    console.log(error.message || error || `There was a problem with our Team-Clinic service!`);
    // throw an application level error
    return Observable.throw(error.message || error);
  }

  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

  getData(): Observable<TeamClinicDto[]>  {

    const pressadata$ = this.api.getHttpClient<TeamClinicDto[]> ('team-clinic').map((data: any) => {
      return data.map(this.toTeamClinicObject);
    } );

    return pressadata$;
  }

  toTeamClinicObject(item: any): TeamClinicDto {
    const content = new TeamClinicDto({
      id: item && item._id || null,
      headerTopic: item && item.headerTopic || null,
      context: item && item.context || null,
      typecontent: item && item.typecontent || null,
      idcontent: item && item.idcontent || null,
      dateCreated: item && item.dateCreated || null
    });
    return content;
  }

  saveNewTeamClinic(newObj: ContentEditI): Observable<TeamClinicDto> {
    return this.api.postHttpClient('team-clinic', newObj).catch(this.handleError);
  }
}
