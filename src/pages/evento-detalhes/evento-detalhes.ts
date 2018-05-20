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

  urlSemFoto = 'https://firebasestorage.googleapis.com/v0/b/projeto-localizador-espetaculo.appspot.com/o/semImage.png?alt=media&token=fe7847c9-c517-4f8d-aaf5-5296878cf9a2';
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
