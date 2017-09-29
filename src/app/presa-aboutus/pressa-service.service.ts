import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {PressaAboutUs} from '../dtd/pressa-about-us.model';

// import {ErrorObservable}from 'rxjs/observable/throw';
import {PressaAboutUsI} from '../dtd/pressa-about-us';

@Injectable()
export class PressaServiceService {

  constructor(private http: Http) {

  }
 // PressaAboutUs[]
 getData(): Observable<PressaAboutUs[]>  {

   const searchParam = new URLSearchParams();
   // searchParam.set('foo', 'moo');
   searchParam.set('limit', '25');

   const people$ = this.http.get('api/presa-aboutus', {search: searchParam}).map((response: Response) => {
      console.log('Response ', response);
      return this.mapPersons(response);
   } ).catch(this.handleError);

   return people$;

   // JSON.stringify({'dateCreated': new Date()})

  }

  saveNewPressaAnoutUs(newObj: PressaAboutUsI): Observable<PressaAboutUs> {

    const headersRequest = new Headers();
    headersRequest.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headersRequest});
    return this.http.post('/api/presa-aboutus', newObj, requestOptions)
      .map(this.extractData).catch(this.handleError);
    // It works too, but it can returns Object from <public addedData: PressaAboutUs>;
    //   .subscribe(
    //     (resp) => {
    //       this.addedData = this.toPressaObject(resp.json());
    //       // console.log(addeddItem.constructor.name);
    //       // return this.toPressaObject(resp.json());
    //     }
    //   );
    // console.log(this.addedData);
    // return this.addedData;
  }

  private extractData(res: Response) {
    return res.json() || {};
  }

  mapPersons(response: Response): PressaAboutUs[] {
    // The response of the API has a results
    // property with the actual results
    return response.json().map(this.toPressaObject);
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
  handleError(error: Response | any) {
    // log error
    // could be something more sofisticated
   console.log(error.message || error || `There was a problem with our hyperdrive device and we couldn't retrieve your data!`);
    // throw an application level error
    return Observable.throw(error.message || error);

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
