import {UserI} from '../dtd/userI';
export interface OfflineConsultationI {
  user: UserI;
  dateConsultation: string;
  timeConsultation: string;
  description: string;
  dateCreated: string;
}
