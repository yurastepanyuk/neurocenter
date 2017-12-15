
import {UserI} from '../dtd/userI';
export interface MailSendI {
  organization: string;
  user: UserI;
  header: string;
  context: string;
}
