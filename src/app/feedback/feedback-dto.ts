import {FeedbackI} from './feedback-i';
import {UserDto} from '../user/user-dto';
export class FeedbackDto implements FeedbackI {
  id: string;
  user: UserDto;
  context: string;
  dateCreated: string;

  constructor(obj?: any) {
    this.id          = obj && obj._id || null;
    this.user        = obj && obj.user && new UserDto(obj.user) || null;
    this.context     = obj && obj.context || null;
    this.dateCreated = obj && obj.dateCreated || null;
  }
}
