
import {ContentEditI} from '../presa-aboutus/content-edit/content-edit-i';
export class TeamClinicDto implements ContentEditI {

  public id: string;
  public headerTopic: string;
  public context: string;
  public typecontent: string;
  public idcontent: string;
  public dateCreated: string;

  constructor(obj?: any) {
    this.id           = obj && obj.id || null;
    this.headerTopic  = obj && obj.headerTopic || null;
    this.context      = obj && obj.context || null;
    this.typecontent  = obj && obj.typecontent || null;
    this.idcontent    = obj && obj.idcontent || null;
    this.dateCreated  = obj && obj.dateCreated || null;
  }
}
