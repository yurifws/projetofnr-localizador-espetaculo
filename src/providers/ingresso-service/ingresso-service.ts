import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventoService } from '../evento-service/evento-service';

/*
  Generated class for the IngressoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngressoServiceProvider {
  private ingressos:any;
  private path = '/ingressos/';
  private eventoPath = '/eventos/';

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.ingressos = this.angularFireDatabase.list(this.path);
  }

  consultar() {

  }

  consultarTodos() {
    return this.ingressos
    .snapshotChanges()
    .map( changes => { 
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
      }))
    });
  }

  consultarIngressosAndEventoPorUsuario(usuario){
    return this.angularFireDatabase.list(this.path,
      ref => ref.orderByChild('usuario')
        .equalTo(usuario))
      .snapshotChanges()
      .map(ingressos => {
        return ingressos.map(c => ({
          key: c.payload.key, ...c.payload.val()
        })).map(ingresso => {
          ingresso.eventoPreenchido = {};
          this.angularFireDatabase.object(this.eventoPath + ingresso.evento)
          .snapshotChanges()
          .map(c => {
            return { key: c.key, ...c.payload.val() };
          })
          .subscribe(evento => {
            ingresso.eventoPreenchido = evento;
          })
          return ingresso;
        })
      });
  }

  consultarPorUsuario(){
    return this.angularFireDatabase
               .list(this.path, 
                     ref => ref.orderByChild('usuario')
                              .equalTo(firebase.auth().currentUser.uid))
               .snapshotChanges()
               .map( changes => { 
                 return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
                 }))
               });
  }

  consultarPorEvento(eventoKey){
    return this.angularFireDatabase
               .list(this.path, 
                     ref => ref.orderByChild('evento')
                              .equalTo(eventoKey))
               .snapshotChanges()
               .map( evento => { 
                 return evento.map(c => ({ key: c.payload.key, ...c.payload.val()
                 }))
               });
  }

  buscarPorId(key: string) {
    return this.angularFireDatabase.object(this.path + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  salvar(ingresso: any) {
    return this.angularFireDatabase.list(this.path).push(ingresso);
  }

  atualizar(ingresso:any) {
    return this.angularFireDatabase.object(this.path + ingresso.key).update(ingresso);

  }

  remover(key) {
    return this.angularFireDatabase.object(this.path + key).remove();
  }

  getUsuarioLogado() {
    return { ...firebase.auth().currentUser.providerData };
  }

  getUsuarioKey() {
    return firebase.auth().currentUser.uid;
  }

}
