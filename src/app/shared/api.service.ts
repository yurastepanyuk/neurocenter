import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: Http) { }

  get(url: string): Observable<any> {
    const options: Map<string, Object> = this.prepareRequest(url);
    return this.http.get(options.get('url').toString(), options.get('headers')).map((response: Response) => {
       console.log('Response get', response);
       return response.json();
    } ).catch(this.handleError);
  }

  post(url: string, body: Object) {
    const options: Map<string, Object> = this.prepareRequest(url, body);
    // return this.request(url, RequestMethod.Post, body);
    return this.http.post(options.get('url').toString(), options.get('body'), options.get('headers')).map((response: Response) => {
      console.log('Response post', response);
      return response.json();
    } ).catch(this.handleError);
  }

  put(url: string, body: Object) {
    // return this.request(url, RequestMethod.Put, body);
    const options: Map<string, Object> = this.prepareRequest(url, body);
    return this.http.put(options.get('url').toString(), options.get('body'), options.get('headers')).map((response: Response) => {
      console.log('Response put', response);
      return response.json();
    } ).catch(this.handleError);
  }

  delete(url: string) {
    // return this.request(url, RequestMethod.Delete);
    const options: Map<string, Object> = this.prepareRequest(url);
    return this.http.delete(options.get('url').toString(), options.get('headers')).map((response: Response) => {
      console.log('Response delete', response);
      return response.json();
    } ).catch(this.handleError);
  }

  prepareRequest(url: string, body?: Object): Map< string, Object> {
    const result = new Map< string, Object>();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const apiUrl = `${this.baseUrl}/${url}`;

    const requestOptions = new RequestOptions({
      url: apiUrl,
      headers: headers
    });

    if (body) {
      requestOptions.body = body;
    }
    result.set('headers', requestOptions);
    result.set('url', apiUrl);
    result.set('body', body);
    return result;
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
      error: errorRes.json().error || '',
      message: errorRes.message
    };
    console.log(error || errorRes.message || errorRes || `There was a problem and we couldn't retrieve your data!`);
    // throw an application level error
    return Observable.throw(error || errorRes.message || errorRes);
  }

}
