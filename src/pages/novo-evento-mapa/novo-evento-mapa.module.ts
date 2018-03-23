import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoEventoMapaPage } from './novo-evento-mapa';

@NgModule({
  declarations: [
    NovoEventoMapaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoEventoMapaPage),
  ],
})
export class NovoEventoMapaPageModule {}
