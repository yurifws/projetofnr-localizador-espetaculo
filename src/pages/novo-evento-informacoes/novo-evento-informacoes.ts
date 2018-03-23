import { InformacoesEvento } from './../../models/informacoesEvento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Evento } from '../../models/evento';

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

  evento = {} as Evento;
  informacoesEvento = {} as InformacoesEvento;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.evento = this.navParams.get('evento');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoEventoInformacoesPage');
  }

  openPage() {
    let alert = this.alertCtrl.create({ 
      title: 'Confirmação de informações do evento',
      message: 'Confirma as informações: Nome do evento: '+ this.informacoesEvento.nome +
      ', sinopse: '+this.informacoesEvento.sinopse+ ', classificação: '+this.informacoesEvento.classificacao+ 
      ', data: '+ this.informacoesEvento.data+', duração: '+this.informacoesEvento.duracao,
      buttons: [
        {
          text: 'Cancela',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirma',
          handler: () => {
            
            this.evento.nome = this.informacoesEvento.nome;
            this.evento.sinopse = this.informacoesEvento.sinopse;
            this.evento.classificacao = this.informacoesEvento.classificacao;
            this.evento.data = this.informacoesEvento.data;
            this.evento.duracao = this.informacoesEvento.duracao;

            this.navCtrl.push('NovoEventoImagemPage', 
            {evento: this.evento});
          }
        }
      ]
    });
    alert.present();
  }

}
