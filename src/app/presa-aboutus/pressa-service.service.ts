import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PressaAboutUs} from '../dtd/pressa-about-us.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PressaServiceService {

  constructor(private http: Http) {

  }
 // PressaAboutUs[]
 getData(): Observable<PressaAboutUs[]>  {
   const people$ = this.http.get('api/presa-aboutus').map((response: Response) => {
     return this.mapPersons(response);
   } ).catch(this.handleError);

   return people$;

   // return this.http.get('api/presa-aboutus').map((response: Response) => {
   //
   //   return (<any>response.json()).items.map(item => {
   //     // console.log('raw item ', item); // uncomment if you want to debug
   //     return new PressaAboutUs({
   //       id: item._id,
   //       headerTopic: item.headerTopic,
   //       context: item.context,
   //       typecontent: item.typecontent,
   //       idcontent: item.idcontent
   //     });
   //   });
   // });

  }

  mapPersons(response: Response): PressaAboutUs[] {
    // The response of the API has a results
    // property with the actual results
    return response.json().map(this.toPressaObject);
  }

  toPressaObject(item: any): PressaAboutUs {
    const person = <PressaAboutUs>({
      id: item._id,
      headerTopic: item.headerTopic,
      context: item.context,
      typecontent: item.typecontent,
      idcontent: item.idcontent
    });
    console.log('Parsed person:', person);
    return person;
  }

  // this could also be a private method of the component class
  handleError (error: any) {
  // log error
  // could be something more sofisticated
  const errorMsg = error.message || `There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
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
