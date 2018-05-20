import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service/evento-service';
import { ModalMapsNavPage } from './modal-maps-nav/modal-maps-nav';

/**
 * Generated class for the EventoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evento-detalhes',
  templateUrl: 'evento-detalhes.html',
})
export class EventoDetalhesPage {

  evento: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventoService: EventoService,
              public modalNav: ModalController) {
    this.evento = this.navParams.data.evento || {};
  }

  ionViewDidLoad() {

  }

  abrirMapsTracarRota(){
    this.modalNav.create(ModalMapsNavPage, {evento:this.evento}).present();
  }

}
