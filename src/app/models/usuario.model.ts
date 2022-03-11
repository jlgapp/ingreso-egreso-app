export class Usuario {


  static fromFireBase({ email, nombre, uid }: { email: any, nombre: any, uid: any }) {
    return new Usuario(uid, nombre, email);
  }
  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
  ) {

  }
}