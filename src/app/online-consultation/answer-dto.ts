import {AnswerI} from './answer-i';
import {UserDto} from '../user/user-dto';
export class AnswerDto implements AnswerI {
  user: UserDto;
  context: string;
  dateCreated: string;

  constructor(obj?: any) {
    this.user        = obj && obj.user && new UserDto(obj.user) || null;
    this.context     = obj && obj.context || null;
    this.dateCreated = obj && obj.dateCreated || null;
  }
}
