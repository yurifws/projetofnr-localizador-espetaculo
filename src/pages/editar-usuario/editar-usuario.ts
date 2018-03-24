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

@IonicPage()
@Component({
  selector: 'page-editar-usuario',
  templateUrl: 'editar-usuario.html',
})
export class EditarUsuarioPage {

  usuario:any = {} as Usuario;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private usuarioService: UsuarioService,
    private angularFireAuth: AngularFireAuth,
    private toastCtrl: ToastController) {  
      let id:any;
      id = angularFireAuth.auth.currentUser.uid;
      if (id) {
          const subscribe = this.usuarioService.buscarPorId(id).subscribe((c: any) => {
            subscribe.unsubscribe();
            this.usuario = c;
            // this.createForm();
          })
        }
  }

  alterarUsuario(){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
    this.usuarioService.atualizar(this.usuario)
    .then(() => {
      toast.setMessage('Usuario salvo com sucesso.');
      toast.present();
    })
    .catch((e) => {
      toast.setMessage('Erro ao salvar o contato.');
      toast.present();
      console.error(e);
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarUsuarioPage');
  }

  // createForm() {
  //   this.form = this.formBuilder.group({
  //     key: [this.usuario.key],
  //     email: [this.usuario.email],
  //     nome: [this.usuario.nome, Validators.required],
  //   });
  // }

}
