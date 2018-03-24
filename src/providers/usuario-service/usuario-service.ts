import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';

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

  salvar(uid: string, usuario: Usuario){
    return this.angularFireDatabase.object(this.path + uid).set(usuario);
  }

  atualizar(uid: string, usuario: Usuario){
    return this.angularFireDatabase.object(this.path + uid).update(usuario);

  }

  remover(){

  }



}
