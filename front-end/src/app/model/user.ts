export class User {
  public id?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public phone: string;
  public isActive?: boolean;
  public isNotLocked?: boolean;
  public role?: string;
  public authorities?: [];

  constructor(id?:number, isActive?:boolean, isNotLocked?:boolean, authorities?:[] ) {
    this.id = id;
    this.isActive= isActive;
    this.isNotLocked= isNotLocked;
    this.authorities = [];
  }

}
