import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FIREBASE_CONFIG } from './firebase.credentials';

import { AuthService } from '../providers/auth-service/auth-service';
import { UsuarioService } from '../providers/usuario-service/usuario-service';
import { EventoService } from '../providers/evento-service/evento-service';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListEventosPage } from '../pages/list-eventos/list-eventos';
import { ListEventosCriadosPage } from '../pages/list-eventos-criados/list-eventos-criados';
import { NovoEventoMapaPage } from '../pages/novo-evento-mapa/novo-evento-mapa';
import { EditarUsuarioPage } from "../pages/editar-usuario/editar-usuario";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListEventosPage,
    ListEventosCriadosPage,
     NovoEventoMapaPage,
     EditarUsuarioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListEventosPage,
    ListEventosCriadosPage,
     NovoEventoMapaPage,
     EditarUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UsuarioService,
    EventoService
  ]
})
export class AppModule {}
