import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UsuarioService } from '../usuario-service/usuario-service';

/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    private usuarioService: UsuarioService) {
    this.angularFireAuth.auth.languageCode = 'pt-br';
  }

  criarConta(usuario: Usuario) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  logar(usuario: Usuario) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);

  }

  signOut() {
    debugger;
    let authProviders = this.angularFireAuth.auth.currentUser.providerData;
    if (authProviders.length) {
      authProviders.forEach(provider => {
        if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID)
          return this.googlePlus.disconnect()
            .then(() => {
              return this.deslogarFirebase();
            });
        else if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID)
          return this.facebook.logout()
            .then(() => {
              return this.deslogarFirebase();
            })
      })
    }
    return this.deslogarFirebase();
  }

  deslogarFirebase() {
    console.log('deslogar');
    return this.angularFireAuth.auth.signOut();
  }

  resetarSenhaUsuario(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  signInWithGoogle() {
    return this.googlePlus.login({
      'webClientId': '536922654223-qt4lq7e508th74m4o72t3aqj06hl5hb7.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then((user: firebase.User) => {
          debugger;
          return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl });
        });
    }).catch((e) => {
      console.log(e);
    });
  }

  signInWithFacebook() {
    return this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        debugger;
        this.facebook.api("/me?fields=email,name,picture", ["public_profile"])
          .then(response => {
            debugger;
            let listaUsuario = this.usuarioService.buscarPorEmail(response.email);
            let usuario: any;
            usuario.nome = response.name;
            usuario.email = response.email;
            usuario.tipoUsuario = false;
            usuario.photoURL = response.picture;
          });
        console.log(res);
        return this.angularFireAuth.auth
          .signInWithCredential(firebase.auth.FacebookAuthProvider
            .credential(res.authResponse.accessToken));
      })
      .catch((e) => {
        console.log(e);
      });
  }

}
