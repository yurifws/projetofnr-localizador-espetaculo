import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service/evento-service';
import { ModalMapsNavPage } from './modal-maps-nav/modal-maps-nav';
import { UtilsProvider } from '../../providers/utils/utils';
import { UsuarioService } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../models/usuario';

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
    public toastCtrl: ToastController) {
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
    let usuario:any = {} as Usuario;
    let uid: string = this.usuarioService.getUsuarioKey()
    const subscribe = this.usuarioService.buscarPorId(uid).subscribe((c: Usuario) => {
      subscribe.unsubscribe();
      usuario.email = c.email;
      usuario.nome = c.nome;
      usuario.tipoUsuario = c.tipoUsuario;
      let data: Date = new Date();
      let chave: string = this.evento.key;
      let protIngresso: string = '' + data.getFullYear() + data.getMonth() + data.getDay() + data.getHours() + data.getMinutes() + data.getSeconds();
      this.usuarioService.comprarIngresso(this.evento.key, protIngresso).then(() =>{
        toast.setMessage('Ingresso Comprado com Sucesso!');                
      }).catch((e) => {
        toast.setMessage('Ingresso não foi comprado.');                
      });
    });
    toast.present();


  }

  amountChange(valorIngresso) {
    if (valorIngresso)
      return 'R$ ' + this.utils.detectAmount(valorIngresso);
    else
      return 'Gratuito'
  }

}
