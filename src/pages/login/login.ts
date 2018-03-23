import { ListEventosPage } from './../list-eventos/list-eventos';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = {} as Usuario;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService: AuthService,
    public toastCtrl: ToastController) {
    
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  teste(){

  }

  
  logar(){

    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});

    this.authService.logar(this.usuario).then((retorno)=> {
      if(retorno.emailVerified){
        this.navCtrl.setRoot(ListEventosPage);
      }
      toast.setMessage('Seu E-mail ainda não foi verificado.');
      toast.present();

    }).catch((error: any) => {

      switch(error.code){
        case 'auth/invalid-email':
        toast.setMessage('E-mail inválido')
          break;
        case 'auth/user-disabled':
          toast.setMessage('Usuário desabilitado.')
          break;
        case 'auth/user-not-found':
          toast.setMessage('Usuário não encontrado.')
          break;
        case 'auth/wrong-password':
          toast.setMessage('Senha errada.')
          break;
        default:
        toast.setMessage('Erro não previsto.')

      }
      toast.present();
    });
  }

  registrar(){
    this.navCtrl.push('RegistroPage');
  }

  resetarSenha(){
    this.navCtrl.push('SenhaResetPage');
  }

}
