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
  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  formGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService: AuthService,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      this.formGroup = formBuilder.group({
        email:new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.EMAILPATTERN)])),
        senha:new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
      })

      this.usuario.email = '';
      this.usuario.senha = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  teste(){

  }

  
  logar(){

    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});

    if (this.usuario.email === null || this.usuario.email === '') {
      toast.setMessage('Insira um E-mail Valido!');
      toast.present();
      return;
    } else if (this.EMAILPATTERN.test(this.usuario.email) === false) {
      toast.setMessage('Email Invalido');
      toast.present();
      return;
    } else if (this.usuario.senha === null || this.usuario.senha === '') {
      toast.setMessage('Insira a Senha!');
      toast.present();
      return;
    } else if (this.usuario.senha.length < 6) {
      toast.setMessage('Senha precisa ter no minimo 6 caracteres!');
      toast.present();
      return;
    } 

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
