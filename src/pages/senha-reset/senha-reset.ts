import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the SenhaResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-senha-reset',
  templateUrl: 'senha-reset.html',
})
export class SenhaResetPage {
  email: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService:AuthService, 
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SenhaResetPage');
  }

  resetarSenha(){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});

    this.authService.resetarSenhaUsuario(this.email).then(() => {

      toast.setMessage('Solicitação foi enviada com sucesso.');
      this.navCtrl.pop();
      
    }).catch((error: any) => {
      switch(error.code){
        case 'auth/invalid-email':
          toast.setMessage('E-mail inválido')
          break;
        case 'aauth/user-not-found':
          toast.setMessage('Usuário não encontrado.')
          break;
        default:
        toast.setMessage('Erro não previsto.')

      }
      toast.present();

    });
  }

}
