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

  constructor(public angularFireDatabase: AngularFireDatabase) {
  }

  consultar(){

  }

  consultarTodos(){

  }

  salvar(uid: string, usuario: Usuario){
    return this.angularFireDatabase.object('usuarios/'+uid).set(usuario);
  }

  remover(){

  }



}
