import {EventEmitter, Injectable, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {PressaAboutUs} from '../dtd/pressa-about-us.model';
import {PressaAboutUsI} from '../dtd/pressa-about-us';
import {ApiService} from '../shared/api.service';

@Injectable()
export class PressaServiceService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService) {
    this.needUpdateParent = new EventEmitter();
  }
 // PressaAboutUs[]
 getData(): Observable<PressaAboutUs[]>  {

   const searchParam = new URLSearchParams();
   // searchParam.set('foo', 'moo');
   searchParam.set('limit', '25');
   const pressadata$ = this.api.getHttpClient<PressaAboutUs[]>('presa-aboutus').map((data: any) => {
     return data.map(this.toPressaObject);
   } );

   return pressadata$;

   // JSON.stringify({'dateCreated': new Date()})
  }

  saveNewPressaAnoutUs(newObj: PressaAboutUsI): Observable<PressaAboutUs> {
    return this.api.postHttpClient('presa-aboutus', newObj).catch(this.handleError);
  }
  updateContent(id: string, data: any) {
    return this.api.putHttpClient('presa-aboutus', data).catch(this.handleError);
  }

  deleteObject(data: any) {
    return this.api.deleteHttpClient('presa-aboutus', data).catch(this.handleError);
  }

  toPressaObject(item: any): PressaAboutUs {
    const person = new PressaAboutUs({
      id: item && item._id || null,
      headerTopic: item && item.headerTopic || null,
      context: item && item.context || null,
      typecontent: item && item.typecontent || null,
      idcontent: item && item.idcontent || null,
      dateCreated: item && item.dateCreated || null
    });
    console.log('Parsed person:', person);
    return person;
  }

  // this could also be a private method of the component class
  handleError(error: any) {
    // log error
    // could be something more sofisticated
   console.log(error.message || error || `There was a problem with our hyperdrive device and we couldn't retrieve your data!`);
    // throw an application level error
    return Observable.throw(error.message || error);
  }
  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

//   getAll(): Observable<PressaAboutUs[]>{
//     let people$ = this.http
//       .get(`${this.baseUrl}/people`, { headers: this.getHeaders()})
//       .map(mapPersons)
//       .catch(handleError);
//     return people$;
//   }
//
//   private getHeaders(){
//     // I included these headers because otherwise FireFox
//     // will request text/html
//     let headers = new Headers();
//     headers.append('Accept', 'application/json');
//     return headers;
//   }
//   get(id: number): Observable<PressaAboutUs> {
//     let person$ = this.http
//       .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
//       .map(mapPerson)
//       .catch(handleError);
//     return person$;
//   }
//
//   save(person: PressaAboutUs) : Observable<Response>{
//      // this won't actually work because the StarWars API doesn't
//     // is read-only. But it would look like this:
//     return this
//       .http
//       .put(`${this.baseUrl}/people/${person.id}`,
//         JSON.stringify(person),
//         {headers: this.getHeaders()});
//   }
//
// }



}
