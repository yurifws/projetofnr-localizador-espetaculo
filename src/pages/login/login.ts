import { ListEventosPage } from './../list-eventos/list-eventos';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

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
  formGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService: AuthService,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.formGroup = formBuilder.group({
        email:new FormControl('', Validators.compose([Validators.required, Validators.pattern(EMAILPATTERN)])),
        senha:new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
      })
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
        this.authService.firebaseDatabaseToOnline();
        this.navCtrl.setRoot(ListEventosPage);
      } else {
        toast.setMessage('Seu E-mail ainda não foi verificado.');        
        toast.present();
      }      

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

  // registrar(){
  //   this.navCtrl.push('RegistroPage');
  // }

  resetarSenha(){
    this.navCtrl.push('SenhaResetPage');
  }

}
