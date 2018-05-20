import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, TabHighlight } from 'ionic-angular';
import { GoogleMapsServiceProvider } from '../../../providers/google-maps-service/google-maps-service';
import { map } from 'rxjs/operator/map';

/**
 * Generated class for the EventoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-modal-maps-nav',
    templateUrl: 'modal-maps-nav.html',
})
export class ModalMapsNavPage {
    @ViewChild('map') mapElement: ElementRef;
    evento: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private googleMapsService: GoogleMapsServiceProvider) {
        this.evento = this.navParams.data.evento || {};

    }

    ionViewDidLoad() {
        this.googleMapsService.create(this.mapElement);
        if (this.evento) {
            this.googleMapsService.calculateRoute(this.evento.latitude, this.evento.longitude);
        } else {
            this.navCtrl.pop();
        }
    }

}
