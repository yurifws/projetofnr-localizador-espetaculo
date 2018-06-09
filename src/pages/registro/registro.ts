import { UsuarioService } from './../../providers/usuario-service/usuario-service';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuario: any = {} as Usuario;
  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  
  constructor(private authService: AuthService,
    private usuarioService: UsuarioService,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registrar() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
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
    this.authService.criarConta(this.usuario).then((retorno: any) => {
      retorno.sendEmailVerification().then(() => {
        let usuario: any = {} as Usuario;
        usuario.email = this.usuario.email;
        usuario.tipoUsuario = false;
        this.usuarioService.salvar(retorno.uid, usuario).then(() => {
          toast.setMessage('Um e-mail de confirmação foi enviado para conclusão do registro do usuário.');
          toast.present();
          this.navCtrl.pop();

        }).catch((error) => {
          console.error(error);
        });
      }).catch((error: any) => {
        console.error(error);
      });
    }).catch((error: any) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.setMessage('E-mail já está em uso.');
          break;
        case 'auth/invalid-email':
          toast.setMessage('E-mail inválido')
          break;
        case 'auth/operation-not-allowed':
          toast.setMessage('Usuário registado com sucesso.')
          break;
        case 'auth/weak-password':
          toast.setMessage('Senha fraca.')
          break;
        default:
          toast.setMessage('Erro não previsto.')

      }

      toast.present();

    });


  }

}
