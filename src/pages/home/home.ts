import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ListEventosPage } from '../list-eventos/list-eventos';
import { Facebook } from '@ionic-native/facebook';
import { UsuarioService } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private authService: AuthService,
              private facebook: Facebook,
              private usuarioService: UsuarioService,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  toSignInPage(){
    this.navCtrl.push('LoginPage');
  }

  toSignUpPage(){
    this.navCtrl.push('RegistroPage');
  }

  signInWithGoogle(){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
    this.authService.signInWithGoogle()
      .then(() => {
        this.navCtrl.setRoot(ListEventosPage);
      })
      .catch((e) => {
        console.log(e)
        toast.setMessage('Erro durante o login.').present();
      });
  }

  signInWithFacebook(){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
    this.authService.signInWithFacebook()
      .then(() => {       
        this.navCtrl.setRoot(ListEventosPage);
      })
      .catch((e) => {
        console.log(e)
        toast.setMessage('Erro durante o login.').present();
      });
  }

}
