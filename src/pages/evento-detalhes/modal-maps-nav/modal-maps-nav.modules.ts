import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalMapsNavPage } from './modal-maps-nav';

@NgModule({
  declarations: [
    ModalMapsNavPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalMapsNavPage),
  ],
})
export class ModalMapsNavPageModule {}