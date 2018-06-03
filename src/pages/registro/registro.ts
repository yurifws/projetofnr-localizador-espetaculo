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
  usuario:any = {} as Usuario;

  constructor( private authService: AuthService,
    private usuarioService: UsuarioService,
    private toastCtrl:ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registrar() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});

          this.authService.criarConta(this.usuario).then((retorno: any) => {
            retorno.sendEmailVerification().then(()=> {
              let usuario:any = {} as Usuario;
              usuario.email = this.usuario.email;
              usuario.tipoUsuario = false;
              this.usuarioService.salvar(retorno.uid, usuario).then(() =>{
                toast.setMessage('Um e-mail de confirmação foi enviado para conclusão do registro do usuário.');
                toast.present();
                this.navCtrl.pop();

              }).catch((error) => {
                console.error(error);
              });
            }).catch((error:any) => {
              console.error(error);
            });            
          }).catch((error: any) => {
            switch(error.code){
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
