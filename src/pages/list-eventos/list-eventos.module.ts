import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEventosPage } from './list-eventos';

@NgModule({
  declarations: [
    ListEventosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEventosPage),
  ],
  exports: [
    ListEventosPage,
  ]
})
export class ListEventosPageModule {}
