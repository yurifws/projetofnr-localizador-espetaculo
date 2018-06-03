import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service/evento-service';
import { ModalMapsNavPage } from './modal-maps-nav/modal-maps-nav';
import { UtilsProvider } from '../../providers/utils/utils';
import { UsuarioService } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../models/usuario';
import { IngressoServiceProvider } from '../../providers/ingresso-service/ingresso-service';

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
    public modalNav: ModalController,
    public alertCtrl: AlertController,
    public utils: UtilsProvider,
    public usuarioService: UsuarioService,
    public toastCtrl: ToastController,
    public ingressoService: IngressoServiceProvider) {
    this.evento = this.navParams.data.evento || {};
  }

  ionViewDidLoad() {

  }

  abrirMapsTracarRota() {
    this.modalNav.create(ModalMapsNavPage, { evento: this.evento }).present();
  }

  openAlertComprarIngresso() {
    let alert = this.alertCtrl.create({
      title: 'Confirmação da Compra do Ingresso',
      message: 'Confirmar a compra do Ingresso no valor: ' + this.amountChange(this.evento.valorIngresso),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.comprarIngresso();
            // this.preecherLocalEvento();            
          }
        }
      ]
    });
    alert.present();
  }

  comprarIngresso() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
    let ingresso:any = {};
    ingresso.evento = this.evento.key;
    ingresso.usuario = this.usuarioService.getUsuarioKey();
    this.ingressoService.salvar(ingresso).then(() =>{
      toast.setMessage('Ingresso Comprado com Sucesso!');                
    }, error => {
      toast.setMessage('Ingresso não foi comprado.');                
    })
    toast.present();


  }

  amountChange(valorIngresso) {
    if (valorIngresso)
      return 'R$ ' + this.utils.detectAmount(valorIngresso);
    else
      return 'Gratuito'
  }

  descClassificacao(opcao){
    if(opcao === '0')
      return 'Livre';
    else if (opcao === '1')
      return 'A partir de 10 anos';
    else if (opcao === '2')
      return 'A partir de 12 anos';
    else if (opcao === '3')
      return 'A partir de 14 anos';
    else if (opcao === '4')
      return 'A partir de 16 anos';
    else if (opcao === '5')
      return 'A partir de 18 anos';
  }

}
