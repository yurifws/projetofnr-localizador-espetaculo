import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Keyboard } from 'ionic-angular';

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
import { ListEventosPage } from '../pages/list-eventos/list-eventos';
import { ListEventosCriadosPage } from '../pages/list-eventos-criados/list-eventos-criados';
import { NovoEventoMapaPage } from '../pages/novo-evento-mapa/novo-evento-mapa';
import { EditarUsuarioPage } from "../pages/editar-usuario/editar-usuario";
import { HomePage } from '../pages/home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { UtilsProvider } from '../providers/utils/utils';
import { EventoDetalhesPage } from '../pages/evento-detalhes/evento-detalhes';
import { GoogleMapsServiceProvider } from '../providers/google-maps-service/google-maps-service';
import { ModalMapsNavPage } from '../pages/evento-detalhes/modal-maps-nav/modal-maps-nav';
import { IngressoServiceProvider } from '../providers/ingresso-service/ingresso-service';
import { IngressosCompradosPage } from '../pages/ingressos-comprados/ingressos-comprados';
import { InteressadosServiceProvider } from '../providers/interessados-service/interessados-service';

@NgModule({
  declarations: [
    MyApp,
    ListEventosPage,
    ListEventosCriadosPage,
     NovoEventoMapaPage,
     EditarUsuarioPage,
     EventoDetalhesPage,
     HomePage,
     ModalMapsNavPage,
     IngressosCompradosPage
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
    ListEventosPage,
    ListEventosCriadosPage,
     NovoEventoMapaPage,
     EditarUsuarioPage,
     EventoDetalhesPage,
     HomePage,
     ModalMapsNavPage,
     IngressosCompradosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UsuarioService,
    EventoService,
    GooglePlus,
    Facebook,
    Keyboard,
    UtilsProvider,
    GoogleMapsServiceProvider,
    IngressoServiceProvider,
    InteressadosServiceProvider,
  ]
})
export class AppModule {}
