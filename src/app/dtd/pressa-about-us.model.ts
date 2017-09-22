
export class PressaAboutUs {

  public id: string;
  public headerTopic: string;
  public context: string;
  public typecontent: string;
  public idcontent: string;

  constructor(obj?: any) {
    this.id           = obj && obj._id || null;
    this.headerTopic  = obj && obj.headerTopic || null;
    this.context      = obj && obj.context || null;
    this.typecontent  = obj && obj.typecontent || null;
    this.idcontent    = obj && obj.idcontent || null;
  }

}
