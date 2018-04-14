import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../providers/usuario-service/usuario-service";

/**
 * Generated class for the EditarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-editar-usuario',
  templateUrl: 'editar-usuario.html',
})
export class EditarUsuarioPage {

  usuario = {} as Usuario;
  uid: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastCtrl: ToastController) {  

      this.uid = this.authService.retornarUidUsuarioLogado();

      if (this.uid) {
          const subscribe = this.usuarioService.buscarPorId(this.uid).subscribe((c: any) => {
            subscribe.unsubscribe();
            this.usuario = c;
          })
        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarUsuarioPage');
  }


  alterarUsuario(){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});

    let usuario = {} as Usuario;

    usuario.email = this.usuario.email;
    usuario.nome = this.usuario.nome;
    usuario.tipoUsuario = this.usuario.tipoUsuario; 

    this.usuarioService.atualizar(this.uid, usuario)
    .then(() => {
      toast.setMessage('Usuário alterado com sucesso.');
    })
    .catch((error) => {
      toast.setMessage('Erro ao alterar o usuario.');
      console.error(error);
    });
    toast.present();
    
  }


}
