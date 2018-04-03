import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../providers/usuario-service/usuario-service";
import { AngularFireAuth } from "angularfire2/auth";

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
    private angularFireAuth: AngularFireAuth,
    private toastCtrl: ToastController) {  
      this.uid = angularFireAuth.auth.currentUser.uid;
      if (this.uid) {
          const subscribe = this.usuarioService.buscarPorId(this.uid).subscribe((c: any) => {
            subscribe.unsubscribe();
            this.usuario = c;
          })
        }
  }

  alterarUsuario(){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});

    let usuario = {} as Usuario;

    usuario.email = this.usuario.email;
    usuario.nome = this.usuario.nome;
    usuario.tipoUsuario = this.usuario.tipoUsuario; 

    this.usuarioService.atualizar(this.uid, usuario)
    .then(() => {
      toast.setMessage('Usuario salvo com sucesso.');
      toast.present();
    })
    .catch((error) => {
      toast.setMessage('Erro ao salvar o usuario.');
      toast.present();
      console.error(error);
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarUsuarioPage');
  }

}
