import {UserI} from '../dtd/userI';
export class UserDto implements UserI {
  public id: string;
  public username: string;
  public userview: string;
  public admin: boolean;
  public role: string;
  public enabled: boolean;
  public email: string;
  password: string;

  constructor(obj?: any) {
    this.id         = obj && obj.id || null;
    this.username   = obj && obj.username || null;
    this.admin      = obj && obj.admin || null;
    this.role       = obj && obj.role || null;
    this.enabled    = obj && obj.enabled || null;
    this.password   = obj && obj.password || null;
    this.email      = obj && obj.email || null;
    this.userview   = obj && obj.userview || null;
  }
}
