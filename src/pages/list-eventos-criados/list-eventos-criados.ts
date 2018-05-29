import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NovoEventoMapaPage } from '../novo-evento-mapa/novo-evento-mapa';
import { Observable } from 'rxjs/observable';
import { EventoService } from '../../providers/evento-service/evento-service';

/**
 * Generated class for the ListEventosCriadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-eventos-criados',
  templateUrl: 'list-eventos-criados.html',
})
export class ListEventosCriadosPage {

  eventos: Observable<any>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eventoService: EventoService ) {
      this.eventos = this.eventoService.consultarEventoAndTotalParticipantes();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListEventosCriadosPage');
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

  ionViewWillLeave(){
    this.eventos.subscribe().unsubscribe();
  }
  
}
