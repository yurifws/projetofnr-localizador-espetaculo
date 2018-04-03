import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListEventosPage } from '../pages/list-eventos/list-eventos';
import { ListEventosCriadosPage } from '../pages/list-eventos-criados/list-eventos-criados';
// import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { EditarUsuarioPage } from "../pages/editar-usuario/editar-usuario";
import { HomePage } from '../pages/home/home';


@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = LoginPage;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  activePage:any;
  id:any;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private authService: AuthService,
    private afAuth: AngularFireAuth){
    this.initializeApp();

    this.pages = [
      { title: 'Eventos', component: ListEventosPage, icon: 'home' },
      { title: 'Eventos Criados', component: ListEventosCriadosPage, icon: 'paper' },
      { title: 'Editar Usuário', component: EditarUsuarioPage, icon: 'person' },
      // { title: 'Sair', component: LoginPage, icon: 'exit' }
      { title: 'Sair', component: HomePage, icon: 'exit' }
    ];

    this.activePage = this.pages[0];

    const authObserver = this.afAuth.authState.subscribe((usuario:any) => {
      if(usuario){
        this.id = usuario.uid;
        console.log('logado', usuario )
        this.rootPage = ListEventosPage;
        authObserver.unsubscribe();
      }
    });



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == HomePage){
      this.authService.signOut().catch((error: any) => {
        console.error(error)
      });
    }else{
      this.activePage = page;
    }
    
    this.nav.setRoot(page.component);
  }

  checkActive(page){
    return page == this.activePage;
  }
}
