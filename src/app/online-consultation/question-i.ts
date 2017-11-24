import {UserDto} from '../user/user-dto';
import {AnswerDto} from './answer-dto';
import {UserI} from '../dtd/userI';
import {AnswerI} from './answer-i';
export interface QuestionI {
  user: UserI;
  context: string;
  answers: AnswerI[];
  dateCreated: string;
}
