import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams } from 'ionic-angular';
import { NovoEventoMapaPage } from '../novo-evento-mapa/novo-evento-mapa';
import { EventoService } from '../../providers/evento-service/evento-service';
import { Observable } from 'rxjs/Observable';
import { UtilsProvider } from '../../providers/utils/utils';
import { UsuarioEventoServiceProvider } from '../../providers/usuario-evento-service/usuario-evento-service';
import { UsuarioEvento } from '../../models/usuarioEvento';
import * as firebase from 'firebase';
import { forEach } from '@firebase/util';
import { UsuarioService } from '../../providers/usuario-service/usuario-service';
import { EventoDetalhesPage } from '../evento-detalhes/evento-detalhes';

/**
 * Generated class for the ListEventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-list-eventos',
  templateUrl: 'list-eventos.html',
})
export class ListEventosPage {


  eventos: Observable<any>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eventoService: EventoService,
    private usuarioEventoService: UsuarioEventoServiceProvider,
    private utils: UtilsProvider,
    private usuarioService: UsuarioService) {
    this.eventos = this.eventoService.consultarTodos();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListEventosPage');
  }

  amountChange(valorIngresso) {
    if (valorIngresso)
      return this.utils.detectAmount(valorIngresso);
    else
      return 'Gratuito'
  }

  // desmarcarPresencaEvento(evento) {
  //   this.usuarioEventoService.consultarTodos().forEach(objetos => {
  //    debugger;
  //     objetos.filter((o: any) => o.usuario === firebase.auth().currentUser.uid && o.evento === evento.key).forEach(objeto => {
  //      debugger;
  //      this.usuarioEventoService.remover(objeto.key)
  //     })
  //   });
  // }

  // marcarPresencaEvento(evento) {
  //   this.usuarioEventoService.salvar(evento, firebase.auth().currentUser.uid);
  // }

  verificarPresenca(evento) {
    debugger;
    let whatever = this.usuarioEventoService.consultarPorUsuario(evento).map(lista => lista.length > 0);
    return whatever;
  }

  detalhesEvento(evento:any){
    this.navCtrl.push(EventoDetalhesPage, {evento: evento});
  }

  // 
 

}
