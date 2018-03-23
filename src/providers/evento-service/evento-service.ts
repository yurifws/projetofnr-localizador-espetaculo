import { AngularFireAuth } from 'angularfire2/auth';
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
  //private userUid: string;
  eventos: AngularFireList<Evento[]>;

  constructor(private angularFireDatabase: AngularFireDatabase, 
    private firebaseApp: FirebaseApp) {

    //var user = firebase.auth().currentUser;
    //console.log('currentuser', user);
    //if (user != null) {
      //user.providerData.forEach( (profile) => {
        //this.userUid = profile.uid;
        //console.log('useruid', this.userUid);
      //});
     //}

    this.eventos = this.angularFireDatabase.list(this.path);
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
    return this.angularFireDatabase.object(this.path+key )
    .snapshotChanges()
    .map(c => { 
      return { key: c.key, ...c.payload.val()};
      })
  }

  private salvar(evento){
    return this.eventos.push(evento);

  }

  alterar(evento, key: string){
    return this.eventos.update(key, evento);
  }

  uploadESalvar(evento, fileToUpload: string){
    let storageRef = this.firebaseApp.storage().ref();
    let basePath = this.path + firebase.auth().currentUser.uid;
    console.log('evento', evento);
    evento.fullPath = basePath
    console.log('evento.fullPath', evento.fullPath);
    let uploadTask = storageRef.child(basePath).putString(fileToUpload, 'base64');
    console.log('antes de uploadTask');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100; 
      console.log(progress + '% finalizado.');
    },
    (error) => {
      console.error(error);
    },
    () => {
      evento.url = uploadTask.snapshot.downloadURL;
      this.salvar(evento);
    });

  }

  uploadEAlterar(evento, key: string){

  }


  remover(evento){
    return this.eventos.remove(evento.key)
    .then( () => {
      this.removerArquivo(evento.fullPath);
    });
  }

  private removerArquivo(fullPath: string){
    let storageRef = this.firebaseApp.storage().ref();
    storageRef.child(fullPath).delete();

  }

}
