
import {UserDto} from '../user/user-dto';
export interface FeedbackI {
  user: UserDto;
  context: string;
  dateCreated: string;
}
