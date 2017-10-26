import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {FeedbackDto} from './feedback-dto';
import {FeedbackI} from './feedback-i';

@Injectable()
export class FeedbackService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService, private http: Http) {
    this.needUpdateParent = new EventEmitter();
  }

  getData(): Observable<FeedbackDto[]>  {

    const searchParam = new URLSearchParams();
    searchParam.set('limit', '25');

    const pressadata$ = this.api.get('feedback').map((data: any) => {
      return data.map(this.toFeedback);
    } );

    return pressadata$;
  }

  toFeedback(item: any): FeedbackDto {
    const curFeedback = new FeedbackDto(item);
    console.log('Parsed Feedback:', curFeedback);
    return curFeedback;
  }

  saveFeedback(newObj: FeedbackI): Observable<FeedbackDto> {
    return this.api.post('feedback', newObj).catch(this.handleError);
  }
  updateContent(id: string, data: any) {
    return this.api.put('feedback', data).catch(this.handleError);
  }

  deleteObject(data: any) {
    return this.api.delete('feedback', data).catch(this.handleError);
  }

  handleError(error: Response | any) {
    console.log(error.message || error || `We couldn't retrieve your Feedback data!`);
    return Observable.throw(error.message || error);
  }
  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

}
