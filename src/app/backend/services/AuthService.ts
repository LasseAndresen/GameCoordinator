import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from 'rxjs';
import { ApplicationContext } from '../../frontend/services/applicationContext';


@Injectable()
export class AuthService {
  private _user: firebase.User;
  private _observableUser: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  public appInitialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get authenticated(): boolean {
    return !!this._user;
  }

  public get user(): BehaviorSubject<firebase.User> {
    return this._observableUser;
  }

  constructor(public afAuth: AngularFireAuth,
              private _applicationContext: ApplicationContext
  ) {
      afAuth.authState.subscribe(user => {
        this._user = user;
        console.log('Authenticated user ', this._user);
        this._observableUser.next(user);
        if (!this.appInitialized.value) {
          this.appInitialized.next(true);
        } else {
          this._applicationContext.requestAppReload.next();
        }
		});
    }

	public signInWithEmail(credentials) {
		return this.afAuth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
    }

  public signUp(credentials) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  public getEmail() {
    return this.user && this._user.email;
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  public async signInWithGoogle() {
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.signInWithPopup(provider);
    } else {
      return this.afAuth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.getRedirectResult().then(result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            // let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
          }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
  }
}
