import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Evento } from '../../models/evento';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoService {

  private path = '/eventos/';
  eventos: AngularFireList<Evento[]>;
  storageRef:any;
  basePath: string;

  constructor(public angularFireDatabase: AngularFireDatabase, 
    public firebaseApp: FirebaseApp) {

    this.eventos = this.angularFireDatabase.list(this.path);
    this.basePath = this.path + firebase.auth().currentUser.uid +'/';
    this.storageRef = this.firebaseApp.storage().ref();
  }

  consultarTodos(){
    return this.eventos
    .snapshotChanges()
    .map( changes => { 
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
      }))
    });

  }

  consultar(key: string){
    return this.angularFireDatabase.object(this.path+key)
    .snapshotChanges()
    .map(c => { 
      return { key: c.key, ...c.payload.val()};
      })
  }

  public salvar(evento){
      return this.eventos.push(evento);
  }
  public atualizar(evento){
      return  this.eventos.update(evento.key, evento);
  }

  uploadESalvar(filePhoto: File){
    return firebase.storage().ref().child(this.basePath).put(filePhoto);
  }

  remover(evento){
    return this.eventos.remove(evento.key);
  }

  private removerArquivo(fullPath: string){
    this.storageRef.child(fullPath).delete();

  }

  getBasePath(){
    return this.basePath;
  }

}
