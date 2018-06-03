import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service/evento-service';
import { ListEventosCriadosPage } from '../list-eventos-criados/list-eventos-criados';
import * as firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the NovoEventoInformacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-evento-informacoes',
  templateUrl: 'novo-evento-informacoes.html',
})
export class NovoEventoInformacoesPage {

  formGroup;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  evento: any;
  tituloPagina: string;
  filePhoto: File;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private eventoService: EventoService,
    private utils: UtilsProvider,
    private formBuilder: FormBuilder) {
      
    let NOME_PARTERN = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/;
    this.evento =  this.navParams.data.evento || {};
    this.setarTituloPagina()
    this.formGroup = formBuilder.group({
      nome: new FormControl('', Validators.compose([Validators.required, Validators.pattern(NOME_PARTERN)])),
      data:new FormControl('', Validators.compose([Validators.required])),
      horaInicial:new FormControl('', Validators.compose([Validators.required])),
      horaFinal:new FormControl('', Validators.compose([Validators.required])),
    })
  }

  setarTituloPagina(){
    if (this.evento.key){
      this.tituloPagina = 'Alterar informações do evento'
    }else{
      this.tituloPagina = 'Informações do evento'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoEventoInformacoesPage');
  }

  openPage() {
    let alert = this.alertCtrl.create({ 
      title: 'Confirmação de informações do evento',
      message: 'Confirma as informações: Nome do evento: '+ this.evento.nome +
      ', sinopse: '+this.evento.sinopse+ ', classificação: '+this.evento.classificacao+ 
      ', data: '+ this.evento.data+', duração: '+this.evento.horaInicial + 'h até '+ this.evento.horaFinal +'h',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});

            if (this.filePhoto != null) {
              this.confirmarEventoComFoto(toast);
            }else{
              this.confirmarEventoSemFoto(toast);
            }
          }
        }
      ]
    });
    alert.present();
  }

  confirmarEventoComFoto(toast){

      let uploadTask = this.eventoService.uploadESalvar(this.filePhoto);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100; 
          console.log(progress + '% finalizado.');
        },
        (error) => {
          console.error(error);
        },() => {

          
          this.evento.fullPath = this.eventoService.getBasePath() + this.evento.nome + this.filePhoto;
          this.evento.url = uploadTask.snapshot.downloadURL;

          if (this.evento.key){
            this.eventoService.atualizar(this.evento).then(()=>{
              toast.setMessage('Evento alterado com sucesso.');
              this.navCtrl.setRoot(ListEventosCriadosPage);
            }, (error) =>{
              toast.setMessage('Erro ao alterar evento.');
            });
          }else{
            this.eventoService.salvar(this.evento).then(()=>{
              toast.setMessage('Evento cadastrado com sucesso.');
              this.navCtrl.setRoot(ListEventosCriadosPage);
            }, (error) =>{
              toast.setMessage('Erro ao cadastrar evento.');
            });
          }
          toast.present();
        });

    }

  confirmarEventoSemFoto(toast){

    this.evento.url = 'https://firebasestorage.googleapis.com/v0/b/projeto-localizador-espetaculo.appspot.com/o/semImage.png?alt=media&token=fe7847c9-c517-4f8d-aaf5-5296878cf9a2';
    if (this.evento.key){
      this.eventoService.atualizar(this.evento).then(()=>{
        toast.setMessage('Evento alterado com sucesso.');

        this.navCtrl.setRoot(ListEventosCriadosPage);
      }, (error) =>{
        toast.setMessage('Erro ao alterar evento.');
      });
    }else{
      this.eventoService.salvar(this.evento).then(()=>{
        toast.setMessage('Evento cadastrado com sucesso.');
        this.navCtrl.setRoot(ListEventosCriadosPage);
      }, (error) =>{
        toast.setMessage('Erro ao cadastrar evento.');
      });
    }
    toast.present();
  }

  onPhoto(event): void {  
    this.filePhoto = event.target.files[0];
  }

  amountChange() {
    this.evento.valorIngresso = this.utils.detectAmount(this.evento.valorIngresso);
  }

}
