import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioService } from '../usuario-service/usuario-service';

/*
  Generated class for the InteressadosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InteressadosServiceProvider {
  private path = '/interessados/';
  constructor(private angularFireDatabase: AngularFireDatabase,
              private usuarioService: UsuarioService) {
  }

  salvar(interessado){
    return this.angularFireDatabase.list(this.path).push(interessado);
  }

  atualizar(interessado:any) {
    return this.angularFireDatabase.object(this.path + interessado.key).update(interessado);
  }
  
  remover(key) {
    return this.angularFireDatabase.object(this.path + key).remove();
  }

  consultarPorUsuario() {
    return this.angularFireDatabase.list(this.path,
      ref => ref.orderByChild('usuario')
        .equalTo(this.usuarioService.getUsuarioKey()))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  consultarPorEvento(eventoKey) {
    return this.angularFireDatabase.list(this.path,
      ref => ref.orderByChild('evento')
        .equalTo(eventoKey))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

}
