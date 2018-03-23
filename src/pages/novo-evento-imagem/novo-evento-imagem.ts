import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Evento } from '../../models/evento';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { EventoService } from '../../providers/evento-service/evento-service';
import { ListEventosCriadosPage } from '../list-eventos-criados/list-eventos-criados';

/**
 * Generated class for the NovoEventoImagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-evento-imagem',
  templateUrl: 'novo-evento-imagem.html',
})
export class NovoEventoImagemPage {
  imgPath: string;
  fileToUpload: any;
  evento = {} as Evento;

  filePhoto: File;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eventoService: EventoService,
    private imagePicker: ImagePicker,
    private base64: Base64) {
      console.log('base64', this.base64);
    this.evento = this.navParams.get('evento');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoEventoImagemPage');
  }

  confirmarEvento(){
    if(this.imgPath != ''){
      console.log('base64', this.fileToUpload);
      this.eventoService.uploadESalvar(this.evento, this.fileToUpload)
      this.navCtrl.setRoot(ListEventosCriadosPage);
    }
  }

  escolherFoto(){
    this.imagePicker.hasReadPermission()
    .then(hasPermission =>{
      if(hasPermission){
        this.pegarImagem();
      }else{
        this.solicitarPermissao();
      }
    }).catch(error => {
      console.error('Erro ao escolher foto',error);
    });

  }

  solicitarPermissao(){
    this.imagePicker.requestReadPermission()
    .then(hasPermission =>{
      if(hasPermission){
        this.pegarImagem();
      }else{
        console.error('Permissao negada!')
      }
    }).catch(error => {
      console.error('Erro ao solicitar permissão',error);
    });

  }

  pegarImagem(){
    let option = {
      maximumImagesCount: 1, //uma imagem
      outputType: 0 // 0 path, 1 base64
    }

    this.imagePicker.getPictures(option)
    .then(results => {
        for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.imgPath = results[i];
        }
        this.converterBase64(this.imgPath);
    }).catch(error => {
      console.error('Erro ao recuperar imagem',error);
    });

  }

  converterBase64(filePath){
    this.base64.encodeFile(filePath).then((base64File: string) => {
      this.fileToUpload = base64File;
      }, (error) => {
        console.error(error);
      });
  }

  // onPhoto(event): void {  
  //   this.filePhoto = event.target.files[0];
  //   console.log(this.filePhoto);
  // }
 

}
