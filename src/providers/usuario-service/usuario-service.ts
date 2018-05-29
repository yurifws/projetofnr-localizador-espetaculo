import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import firebase from 'firebase';

/*
  Generated class for the UsuarioService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioService {

  private path = '/usuarios/';

  constructor(public angularFireDatabase: AngularFireDatabase) {
  }

  consultar(){

  }

  consultarTodos(){

  }

  buscarPorId(uid: string){
    return this.angularFireDatabase.object(this.path+uid )
    .snapshotChanges()
    .map(c => { 
      return { key: c.key, ...c.payload.val()};
      }) 
  }

  buscarPorEmail(email: string){
    return this.angularFireDatabase.list(this.path, ref => {
      return email ? ref.equalTo(email) : ref;
    }).snapshotChanges();
  }

  salvarSemId(usuario:any){
    return this.angularFireDatabase.list(this.path).push(usuario);
  }

  salvar(uid: string, usuario:Usuario){
    return this.angularFireDatabase.database.ref(this.path + uid).set(usuario);
  }

  atualizar(uid: string, usuario: Usuario){
    return this.angularFireDatabase.list(this.path).update(uid, usuario);

  }

  remover(){

  }

  getUsuarioLogado(){
    return {...firebase.auth().currentUser.providerData};
  }

  getUsuarioKey(){
    return firebase.auth().currentUser.uid;
  }

}
