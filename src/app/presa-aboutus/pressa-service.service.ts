import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';

@Injectable()
export class PressaServiceService {

  constructor(private http: Http) {

  }

 getData(): any  {
    // return this.http.get('../data/pressaaboutus.json').map((resp:Response)=> {
    //
    //     // let usersList = resp.json().data;
    //     // let users :User[] = [];
    //     // for(let index in usersList){
    //     //   console.log(usersList[index]);
    //     //   let user = usersList[index];
    //     //   users.push({name: user.userName, age: user.userAge});
    //     // }
    //     return resp.json();
    //   });
   return this.http.get('/data/pressaaboutus.json');
  }


}
