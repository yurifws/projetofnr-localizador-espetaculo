import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenhaResetPage } from './senha-reset';

@NgModule({
  declarations: [
    SenhaResetPage,
  ],
  imports: [
    IonicPageModule.forChild(SenhaResetPage),
  ],
})
export class SenhaResetPageModule {}
