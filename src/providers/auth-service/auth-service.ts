import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';

/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  constructor(public angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.auth.languageCode ='pt-br';
  }

  criarConta(usuario: Usuario) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  logar(usuario: Usuario) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);

  }

  deslogar() {
    console.log('deslogar');
    return this.angularFireAuth.auth.signOut();
  }

  resetarSenhaUsuario(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  retornarUidUsuarioLogado(){
    return this.angularFireAuth.auth.currentUser.uid;
  }


}
