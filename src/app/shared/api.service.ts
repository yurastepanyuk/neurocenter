import {Inject, Injectable} from '@angular/core';
import {Http, Headers, Request, RequestOptions, RequestMethod, Response, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {AuthService} from './auth.service';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;
  private baseUrlOpen = environment.apiUrlOpen;

  constructor(private http: Http,
              private auth: AuthService,
              @Inject('openUrlGet') public openUrlGet: Array<string>,
              @Inject('openUrlPost') public openUrlPost: Array<string>) { }

  get(url: string): Observable<any> {
    const options: Map<string, Object> = this.prepareRequest(url, RequestMethod.Get);
    return this.http.get(options.get('url').toString(), options.get('headers')).map((response: Response) => {
       console.log('Response get', response);
       return response.json();
    } ).catch(this.handleError);
  }

  post(url: string, body: Object) {
    const options: Map<string, Object> = this.prepareRequest(url, RequestMethod.Post, body);
    // return this.request(url, RequestMethod.Post, body);
    return this.http.post(options.get('url').toString(), options.get('body'), options.get('headers')).map((response: Response) => {
      console.log('Response post', response);
      return response.json();
    } ).catch(this.handleError);
  }

  // this.http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe((data) => {
  // if(data.json().success) {
  //   this.http.post('http://localhost:3333/sendmail', emailid, {headers: headers}).subscribe((data) => {
  //     if(data.json().success) {
  //       console.log('Sent successfully');
  //     }
  //   })

  put(url: string, body: Object) {
    const options: Map<string, Object> = this.prepareRequest(url, RequestMethod.Put, body);
    return this.http.put(options.get('url').toString(), options.get('body'), options.get('headers')).map((response: Response) => {
      console.log('Response put', response);
      return response.json();
    } ).catch(this.handleError);
  }

  delete(url: string, body: Object) {
    const options: Map<string, Object> = this.prepareRequest(url, RequestMethod.Delete, body);
    return this.http.delete(options.get('url').toString(), options.get('headers')).map((response: Response) => {
      return response.json();
    } ).catch(this.handleError);
  }

  prepareRequest(url: string, method: RequestMethod, body?: any): Map< string, Object> {
    const result = new Map< string, Object>();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    headers.append('charset', 'utf-8');
    let apiUrl = `${this.baseUrl}/${url}`;
    if (method === RequestMethod.Get) {
      apiUrl = `${this.isItOpenUrlGet(url) ? this.baseUrlOpen : this.baseUrl}/${url}`;
    } else if (method === RequestMethod.Post) {
      apiUrl = `${this.isItOpenUrlPost(url) ? this.baseUrlOpen : this.baseUrl}/${url}`;
    } else if ( method === RequestMethod.Delete) {
      apiUrl = `${this.baseUrl}/${url}`;
    } else {
      apiUrl = `${this.baseUrl}/${url}`;
    }
    // const params = new URLSearchParams();
    // let paramsJson;
    // if (body) {
    //   if (body.idObject) {
    //     // params.set('idObject', body.idObject);
    //     paramsJson = {idObject: body.idObject};
    //   }
    // }
    console.log('url for http: ' + apiUrl);
    const requestOptions = new RequestOptions({
      url: apiUrl,
      headers: headers
    });

    if (body) {
      requestOptions.body = body;
    }
    // result.set('params', params);
    result.set('headers', requestOptions);
    result.set('url', apiUrl);
    result.set('body', body);
    console.log('prepareRequest result URLSearchParams ', result);
    return result;
  }
  isItOpenUrlGet(url: string): boolean {
    if ( this.openUrlGet.indexOf(url) < 0) {
      return false;
    } else {
      return true;
    }
  }

  isItOpenUrlPost(url: string): boolean {
    if ( this.openUrlPost.indexOf(url) < 0) {
      return false;
    } else {
      return true;
    }
  }

  // request(url: string, method: RequestMethod, body?: Object): Observable<any> {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //
  //   const requestOptions = new RequestOptions({
  //     url: `${this.baseUrl}/${url}`,
  //     method: method,
  //     headers: headers
  //   });
  //
  //   if (body) {
  //     requestOptions.body = body;
  //   }
  //
  //   const request = new Request(requestOptions);
  //
  //   // return this.http.request(request)
  //   //   .map((res: Response) => res.json());
  //   return this.http.request(request).map((response: Response) => {
  //     console.log('Response two ', response);
  //     return this.mapResponse(response);
  //   } ).catch(this.handleError);
  // }

  mapResponse(responseIn: Response): Observable<any> {
    return responseIn.json();
  }

  handleError(errorRes: Response | any) {
    // log error
    // could be something more sofisticated
    const error = {
      statusCode: errorRes.status || 500,
      error: errorRes.error || '',
      message: errorRes.message
    };
    console.log(error || errorRes.message || errorRes || `There was a problem and we couldn't retrieve your data!`);
    // throw an application level error
    return Observable.throw(error || errorRes.message || errorRes);
  }

}
