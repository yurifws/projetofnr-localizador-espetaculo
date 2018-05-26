import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the IngressoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngressoServiceProvider {
  private ingressos:any;
  private path = '/ingressos/';

  constructor(public angularFireDatabase: AngularFireDatabase) {
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

  consultarPorUsuario(){
    return this.angularFireDatabase
               .list(this.path, 
                     ref => ref.orderByChild('usuarioCriador')
                              .equalTo(firebase.auth().currentUser.uid))
               .snapshotChanges()
               .map( changes => { 
                 return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
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
