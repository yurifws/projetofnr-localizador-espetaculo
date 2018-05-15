import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UsuarioEvento } from '../../models/usuarioEvento';
import * as firebase from 'firebase';

/*
  Generated class for the UsuarioEventoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioEventoServiceProvider {
  private path = '/usuarioEvento/';
  listaUsuarioEvento: AngularFireList<UsuarioEvento[]>;
  storageRef:any;
  basePath: string;

  constructor(public angularFireDatabase: AngularFireDatabase, 
    public firebaseApp: FirebaseApp) {

    this.listaUsuarioEvento = this.angularFireDatabase.list(this.path);
    this.basePath = this.path + firebase.auth().currentUser.uid +'/';
    this.storageRef = this.firebaseApp.storage().ref();
  }

  consultarTodos(){
    return this.listaUsuarioEvento
    .snapshotChanges()
    .map( changes => { 
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
      }))
    });

  }

  buscar(key: string){
    return this.angularFireDatabase.object(this.path+key)
    .snapshotChanges()
    .map(c => { 
      return { key: c.key, ...c.payload.val()};
      })
  }

  consultar(){
    return this.angularFireDatabase.object(this.path)
    .snapshotChanges()
    .map(c => { 
      return { key: c.key, ...c.payload.val()};
      })
  }

  public salvar(evento, userId){
       return this.angularFireDatabase.object(this.path + userId + '/' + evento.key).set({
         nome: evento.nome
       })
  }
  public atualizar(usuarioEvento){
      return  this.listaUsuarioEvento.update(usuarioEvento.key, usuarioEvento);
  }

  remover(usuarioEvento){
    return this.listaUsuarioEvento.remove(usuarioEvento.key);
  }

  consultarPorUsuario(evento){
    return this.angularFireDatabase.list(this.path + firebase.auth().currentUser.uid, 
                                         ref => ref.orderByChild(evento.key))
                                    .snapshotChanges()
                                    .map( changes => { 
                                      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
                                      }))
                                    });

  }

  verificarPresencaUsuario(evento){
    return this.consultarTodos().map(objeto => {
                              return objeto.filter(value => value.evento === evento.key && value.usuario === firebase.auth().currentUser.uid).length > 0
                            });
  } 

  getBasePath(){
    return this.basePath;
  }

}
