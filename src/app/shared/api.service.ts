import {Inject, Injectable} from '@angular/core';
// import {Http, Headers, Request, RequestOptions, RequestMethod, Response, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {HttpParamsOptions} from '@angular/common/http/src/params';
import { catchError, map, tap } from 'rxjs/operators';
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';

enum RequestMethods {Get = 0, Post = 1, Put = 2, Delete = 3}

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;
  private baseUrlOpen = environment.apiUrlOpen;

  constructor(
              private auth: AuthService,
              private httpClient: HttpClient,
              @Inject('openUrlGet') public openUrlGet: Array<string>,
              @Inject('openUrlPost') public openUrlPost: Array<string>) { }

  // Works with Angular <= 5
  // get(url: string): Observable<any> {
  //   const options: Map<string, Object> = this.prepareRequest(url, RequestMethods.Get);
  //   return this.http.get(options.get('url').toString(), options.get('headers')).map((response: Response) => {
  //      console.log('Response get', response);
  //      return response.json();
  //   } ).catch(this.handleError);
  // }

  getHttpClient<T>(url: string, params?: any): Observable<T> {
    const options: Map<string, any> = this.prepareRequest(url, RequestMethods.Get, null, params);
    const optionsToRequest = {
      headers: options.get('httpHeaders'),
      params: options.get('httpParams')
    };
    return this.httpClient.get<T>(options.get('url').toString(), optionsToRequest).pipe(
      catchError(this.handleError)
    );
  }

  // Works with Angular <= 5
  // post(url: string, body: Object) {
  //   const options: Map<string, Object> = this.prepareRequest(url, RequestMethods.Post, body);
  //   // return this.request(url, RequestMethod.Post, body);
  //   return this.http.post(options.get('url').toString(), options.get('body'), options.get('headers')).map((response: Response) => {
  //     console.log('Response post', response);
  //     return response.json();
  //   } ).catch(this.handleError);
  // }

  postHttpClient(url: string, body: Object) {
    const options: Map<string, any> = this.prepareRequest(url, RequestMethods.Post, body);
    const optionsToRequest = {
      headers: options.get('httpHeaders')
    };
    return this.httpClient.post(options.get('url').toString(), options.get('body'), optionsToRequest).pipe(
      catchError(this.handleError)
    );
  }

  // this.http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe((data) => {
  // if(data.json().success) {
  //   this.http.post('http://localhost:3333/sendmail', emailid, {headers: headers}).subscribe((data) => {
  //     if(data.json().success) {
  //       console.log('Sent successfully');
  //     }
  //   })

  // Works with Angular <= 5
  // put(url: string, body: Object) {
  //   const options: Map<string, Object> = this.prepareRequest(url, RequestMethods.Put, body);
  //   return this.http.put(options.get('url').toString(), options.get('body'), options.get('headers')).map((response: Response) => {
  //     console.log('Response put', response);
  //     return response.json();
  //   } ).catch(this.handleError);
  // }

  putHttpClient(url: string, body: Object) {
    const options: Map<string, any> = this.prepareRequest(url, RequestMethods.Put, body);
    const optionsToRequest = {
      headers: options.get('httpHeaders')
    };
    return this.httpClient.put(options.get('url').toString(), options.get('body'), optionsToRequest ).pipe(
      catchError(this.handleError)
    );
  }

  // Works with Angular <= 5
  // delete(url: string, body: Object) {
  //   const options: Map<string, Object> = this.prepareRequest(url, RequestMethods.Delete, body);
  //   return this.http.delete(options.get('url').toString(), options.get('headers')).map((response: Response) => {
  //     return response.json();
  //   } ).catch(this.handleError) ;
  // }

  toHttpParams(params) {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
  deleteHttpClient(url: string, body: any) {
    const options: Map<string, any> = this.prepareRequest(url, RequestMethods.Delete, body);
    // Cool= 'Works with many parametres'
    // const httpOptions: HttpParams = this.toHttpParams({id: body.idObject, twoParameter: body.idObject});
    const httpParams = new HttpParams().set('id', body.idObject);
    // Cool const httpParams = new HttpParams({ fromObject: ffff });
    console.log('httpOptions', httpParams);
    const optionsToRequest = {
      headers: options.get('httpHeaders'),
      params: httpParams
    };
    return this.httpClient.delete(options.get('url').toString(), optionsToRequest).pipe(
      catchError(this.handleError)
    );
  }


  prepareRequest(url: string, method: RequestMethods, body?: any, params?: any): Map< string, Object> {
    const result = new Map< string, Object>();

    // Works with Angular <= 5
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // headers.append('charset', 'utf-8');
    // n
    let apiUrl = `${this.baseUrl}/${url}`;
    if (method === RequestMethods.Get) {
      apiUrl = `${this.isItOpenUrlGet(url) ? this.baseUrlOpen : this.baseUrl}/${url}`;
    } else if (method === RequestMethods.Post) {
      apiUrl = `${this.isItOpenUrlPost(url) ? this.baseUrlOpen : this.baseUrl}/${url}`;
    } else if ( method === RequestMethods.Delete) {
      apiUrl = `${this.baseUrl}/${url}`;
    } else {
      apiUrl = `${this.baseUrl}/${url}`;
    }
    // -
    const httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + this.auth.getToken(), 'charset' : 'utf-8'});
    // httpHeaders.append('Authorization', 'Bearer ' + this.auth.getToken());
    // httpHeaders.append('charset', 'utf-8');
    console.log('Method: ' + method);
    console.log('url for http: ' + apiUrl);
    //
    // Works with Angular <= 5
    // const requestOptions = new RequestOptions({
    //   url: apiUrl,
    //   headers: headers
    // });
    // if (body) {
    //   requestOptions.body = body;
    // }
    // result.set('headers', requestOptions);
    //
    let httpParams = new HttpParams();
    if (params) {
      httpParams = this.toHttpParams(params);
    }
    result.set('httpHeaders', httpHeaders);
    result.set('url', apiUrl);
    result.set('body', body);
    result.set('httpParams', httpParams);
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

  // mapResponse(responseIn: Response): Observable<any> {
  //   return responseIn.json();
  // }
  //
  handleError(errorRes: any) {
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
