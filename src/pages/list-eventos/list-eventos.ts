import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams } from 'ionic-angular';
import { NovoEventoMapaPage } from '../novo-evento-mapa/novo-evento-mapa';
import { EventoService } from '../../providers/evento-service/evento-service';
import { Observable } from 'rxjs/Observable';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';
import { forEach } from '@firebase/util';
import { UsuarioService } from '../../providers/usuario-service/usuario-service';
import { EventoDetalhesPage } from '../evento-detalhes/evento-detalhes';
import { InteressadosServiceProvider } from '../../providers/interessados-service/interessados-service';

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

  eventos:Observable<any[]>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eventoService: EventoService,
    private utils: UtilsProvider,
    private usuarioService: UsuarioService,
    private interessadosService: InteressadosServiceProvider) {
    this.consultarEvento();

  }

  consultarEvento() {
    this.eventos = this.eventoService.consultarEventoAndInteressado();
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

  temInteresse(evento, interesse) {
    if (evento.interessado === undefined || evento.interessado !== interesse) {
      let interessado: any = {};
      interessado.evento = evento.key;
      interessado.usuario = this.usuarioService.getUsuarioKey();
      interessado.temInteresse = interesse;
      this.interessadosService.salvar(interessado).then(() => {
        evento.interessado = interesse;
      });
    } else {
      const c = this.interessadosService.consultarPorUsuario().subscribe(interessados => {
        c.unsubscribe();
        interessados.filter(interessado => interessado.evento === evento.key).forEach(interessado => {
          evento.usuarioOpinou = false;
          this.interessadosService.remover(interessado.key).then(() => {
            evento.interessado = undefined;
            evento.usuarioOpinou = false;
          });
        })
      })
    }
  }

  detalhesEvento(evento: any) {
    this.navCtrl.push(EventoDetalhesPage, { evento: evento });
  }

  // 


}
