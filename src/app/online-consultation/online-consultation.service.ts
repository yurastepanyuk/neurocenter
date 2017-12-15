import {EventEmitter, Injectable} from '@angular/core';
import {AnswerDto} from './answer-dto';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs/Observable';
import {QuestionDto} from './question-dto';
import {QuestionI} from './question-i';

@Injectable()
export class OnlineConsultationService {

  public needUpdateParent: EventEmitter<any>;

  constructor(private api: ApiService) {
    this.needUpdateParent = new EventEmitter();
  }
  public getAnswersList(obj: any[]) {
    const resultArray: AnswerDto[] = new Array(0);
    if (!obj) {
      return resultArray;
    }
    for ( let i = 0; i < obj.length; i++ ) {
      console.log(obj[i]);
      const curAnswer = new AnswerDto(obj[i]);
      resultArray.push(curAnswer);
    }
    return resultArray;
  }
  getData(): Observable<QuestionDto[]>  {

    const searchParam = new URLSearchParams();
    searchParam.set('limit', '25');

    const questiondata$ = this.api.getHttpClient<QuestionDto[]>('online-consultation').map((data: any) => {
      return data.map(this.toQuestion);
    } );

    return questiondata$;
  }

  toQuestion(item: any): QuestionDto {
    const curQuestion = new QuestionDto(item);
    console.log('Parsed Question:', curQuestion);
    return curQuestion;
  }

  saveQuestion(newObj: QuestionI): Observable<QuestionDto> {
    return this.api.postHttpClient('online-consultation', JSON.stringify(newObj)).catch(this.handleError);
  }
  updateContent(id: string, data: any) {
    return this.api.putHttpClient('online-consultation', data).catch(this.handleError);
  }

  deleteObject(data: any) {
    return this.api.deleteHttpClient('online-consultation', data).catch(this.handleError);
  }

  sendEmail(data: any) {
    return this.api.postHttpClient('sendmail', JSON.stringify(data)).catch(this.handleError);
  }

  handleError(error: any) {
    console.log(error.message || error || `We couldn't retrieve your online-consultation  data!`);
    return Observable.throw(error.message || error);
  }
  updateParentComponent(obj: any) {
    this.needUpdateParent.emit(obj);
  }

}
