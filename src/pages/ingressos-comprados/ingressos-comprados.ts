import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IngressoServiceProvider } from '../../providers/ingresso-service/ingresso-service';
import { EventoService } from '../../providers/evento-service/evento-service';
import { UtilsProvider } from '../../providers/utils/utils';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../../providers/usuario-service/usuario-service';

/**
 * Generated class for the IngressosCompradosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ingressos-comprados',
  templateUrl: 'ingressos-comprados.html',
})
export class IngressosCompradosPage {

  ingressos:any;
  
  ingressoSubject;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ingressoService: IngressoServiceProvider,
              private eventoService: EventoService,
              private usuarioService: UsuarioService,
              private utils: UtilsProvider) {
      this.ingressos = this.ingressoService.consultarIngressosAndEventoPorUsuario(usuarioService.getUsuarioKey());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngressosCompradosPage');
  }

  amountChange(valorIngresso) {
    if (valorIngresso)
      return 'R$' + this.utils.detectAmount(valorIngresso);
    else
      return 'Gratuito'
  }

}
