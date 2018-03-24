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

  buscarPorId(id:string){
    return this.angularFireDatabase.object('/usuarios/' + id)
      .snapshotChanges()
      .map(userSnapshot => {
        // debugger;
        let usuario:any;
        usuario = userSnapshot.payload.val();
        usuario.id = id;      
        return usuario;
        // console.log(usuario);
    }); 
  }

  salvar(uid: string, usuario: Usuario){
    return this.angularFireDatabase.object('usuarios/' + uid).set(usuario);
  }

  atualizar(usuario:any){
    return new Promise((resolve, reject) => {
      this.angularFireDatabase.object('usuarios/' + usuario.id)
      .update(usuario)
      .then(() => resolve)
      .catch((e) => reject(e));
    });
  }

  remover(){

  }



}
