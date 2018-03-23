import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEventosCriadosPage } from './list-eventos-criados';

@NgModule({
  declarations: [
    ListEventosCriadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEventosCriadosPage),
  ],
})
export class ListEventosCriadosPageModule {}
