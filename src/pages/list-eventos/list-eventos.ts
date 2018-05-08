import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams } from 'ionic-angular';
import { NovoEventoMapaPage } from '../novo-evento-mapa/novo-evento-mapa';
import { EventoService } from '../../providers/evento-service/evento-service';
import { Observable } from 'rxjs/Observable';

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
    private eventoService: EventoService ) {
      this.eventos = this.eventoService.consultarTodos();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListEventosPage');
  }



  criaEvento() {
    console.log('criaEvento()')
    this.navCtrl.push(NovoEventoMapaPage);
  }

  removerEvento(evento: any){
    console.log('removerEvento()',evento)
    this.eventoService.remover(evento);
  }

  editarEvento(evento: any){
    console.log('editarEvento()',evento)
    this.navCtrl.push(NovoEventoMapaPage, {evento: evento});
  }
  
}
