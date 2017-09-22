import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PressaAboutUs} from '../dtd/pressa-about-us.model';


@Injectable()
export class PressaServiceService {

  constructor(private http: Http) {

  }
 // PressaAboutUs[]
 getData(): Observable<PressaAboutUs[]>  {
   const people$ = this.http.get('api/presa-aboutus').map((response: Response) => {
     return this.mapPersons(response);
   } );

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


}
