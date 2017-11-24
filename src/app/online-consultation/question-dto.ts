import {QuestionI} from './question-i';
import {UserDto} from '../user/user-dto';
import {AnswerDto} from './answer-dto';
import {OnlineConsultationService} from './online-consultation.service';
import { ReflectiveInjector} from '@angular/core';
import {AnswerI} from './answer-i';
export class QuestionDto implements QuestionI {
  id?: string;
  user: UserDto;
  context: string;
  answers: AnswerI[];
  dateCreated: string;

  // private ocs: OnlineConsultationService;
  constructor(obj?: any) {

    // const injector: any = ReflectiveInjector.resolveAndCreate([OnlineConsultationService]);
    // this.ocs = injector.get(OnlineConsultationService);
    this.id          = obj && obj._id || null;
    this.user        = obj && obj.user && new UserDto(obj.user) || null;
    this.context     = obj && obj.context || null;
    this.answers     = obj && obj.answers  && this.getAnswersList(obj.answers) || null;
    this.dateCreated = obj && obj.dateCreated || null;
  }
  private getAnswersList(obj: any[]) {
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
}
