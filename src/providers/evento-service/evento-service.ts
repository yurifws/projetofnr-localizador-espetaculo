import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Evento } from '../../models/evento';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { InteressadosServiceProvider } from '../interessados-service/interessados-service';
import { IngressoServiceProvider } from '../ingresso-service/ingresso-service';
import { Subscription } from 'rxjs/Subscription';

/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoService {

  private path = '/eventos/';
  eventos: AngularFireList<Evento[]>;
  storageRef: any;
  basePath: string;

  constructor(public angularFireDatabase: AngularFireDatabase,
    public firebaseApp: FirebaseApp,
    private interessadosService: InteressadosServiceProvider,
    private ingressoService: IngressoServiceProvider) {

    this.eventos = this.angularFireDatabase.list(this.path);
    this.basePath = this.path + firebase.auth().currentUser.uid + '/';
    this.storageRef = this.firebaseApp.storage().ref();
  }

  consultarTodos() {
    return this.eventos
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

  }

  consultarPorUsuario() {
    return this.angularFireDatabase.list(this.path,
      ref => ref.orderByChild('usuario')
        .equalTo(firebase.auth().currentUser.uid))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }  

  consultarEventoAndInteressado() {    
    return this.eventos
      .snapshotChanges()
      .map(eventos => {
        return eventos.map(c => ({
          key: c.payload.key, ...c.payload.val()
        })).map(evento => {
          evento.usuarioOpinou = false;
          this.interessadosService.consultarPorUsuario().subscribe(interessados => {
            interessados.filter(interessado => interessado.evento === evento.key).forEach(interessado => {
              evento.usuarioOpinou = true;
              evento.interessado = interessado.temInteresse;
            });
          });
          return evento;
        })
      });
  }

  consultarEventoAndTotalParticipantes() {
    return this.angularFireDatabase.list(this.path,
      ref => ref.orderByChild('usuarioCriador')
        .equalTo(firebase.auth().currentUser.uid))
      .snapshotChanges()
      .map(eventos => {
        return eventos.map(c => ({
          key: c.payload.key, ...c.payload.val()
        })).map(evento => {
          evento.totalParticipantes = 0
          this.ingressoService.consultarPorEvento(evento.key).subscribe(ingressos => {
            evento.totalParticipantes = ingressos.length;
          });
          return evento;
        })
      });
  }

  consultar(key: string) {
    return this.angularFireDatabase.object(this.path + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  public salvar(evento) {
    evento.usuarioCriador = firebase.auth().currentUser.uid;
    return this.eventos.push(evento);
  }
  public atualizar(evento) {
    return this.eventos.update(evento.key, evento);
  }

  uploadESalvar(filePhoto: File) {
    return firebase.storage().ref().child(this.basePath).put(filePhoto);
  }

  remover(evento) {
    return this.eventos.remove(evento.key).then(() => {
      const c = this.interessadosService.consultarPorEvento(evento.key).subscribe((interessados) => {
        c.unsubscribe();
        interessados.forEach((interessado) => {
          this.interessadosService.remover(interessado);
        })
      })
      const e = this.ingressoService.consultarPorEvento(evento.key).subscribe((ingressos) => {
        e.unsubscribe();
        ingressos.forEach((ingresso) => {
          this.ingressoService.remover(ingresso);
        })
      })
    });
  }

  private removerArquivo(fullPath: string) {
    this.storageRef.child(fullPath).delete();
  }

  getBasePath() {
    return this.basePath;
  }

}
