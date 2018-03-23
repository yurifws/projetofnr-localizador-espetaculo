import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoEventoInformacoesPage } from './novo-evento-informacoes';

@NgModule({
  declarations: [
    NovoEventoInformacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoEventoInformacoesPage),
  ],
})
export class NovoEventoInformacoesPageModule {}
