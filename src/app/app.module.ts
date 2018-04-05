import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
// import { LoginPage } from '../pages/login/login';
import { ListEventosPage } from '../pages/list-eventos/list-eventos';
import { ListEventosCriadosPage } from '../pages/list-eventos-criados/list-eventos-criados';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FIREBASE_CONFIG } from './firebase.credentials';

import { AuthService } from '../providers/auth-service/auth-service';
import { UsuarioService } from '../providers/usuario-service/usuario-service';
import { NovoEventoMapaPage } from '../pages/novo-evento-mapa/novo-evento-mapa';
// import { NovoEventoImagemPage } from './../pages/novo-evento-imagem/novo-evento-imagem';
// import { NovoEventoInformacoesPage } from './../pages/novo-evento-informacoes/novo-evento-informacoes';

import { GooglePlus } from '@ionic-native/google-plus'
import { Facebook } from '@ionic-native/facebook'
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { EventoService } from '../providers/evento-service/evento-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { EditarUsuarioPage } from "../pages/editar-usuario/editar-usuario";
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    // LoginPage,
    ListEventosPage,
    ListEventosCriadosPage,
     NovoEventoMapaPage,
     EditarUsuarioPage,
     HomePage
    // NovoEventoInformacoesPage,
    // NovoEventoImagemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // LoginPage,
    ListEventosPage,
    ListEventosCriadosPage,
     NovoEventoMapaPage,
     EditarUsuarioPage,
     HomePage
    // NovoEventoInformacoesPage,
    // NovoEventoImagemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    Geolocation,
    ImagePicker,
    Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UsuarioService,
    EventoService,
    GooglePlus,
    Facebook,
  ]
})
export class AppModule {}
