import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationContext } from '@services';
import { UserFactory } from '../models/User';
import {
  Auth,
  AuthProvider,
  GoogleAuthProvider,
  User,
  authState,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';

@Injectable()
export class AuthService {
  private _user: User;
  private _observableUser: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );

  public appInitialized: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get authenticated(): boolean {
    return !!this._user;
  }

  public get user(): BehaviorSubject<User> {
    return this._observableUser;
  }

  constructor(
    public afAuth: Auth,
    public afs: Firestore,
    private _applicationContext: ApplicationContext
  ) {
    authState(afAuth).subscribe((user) => {
      this._user = user;
      console.log('Authenticated user ', this._user);
      this._observableUser.next(user);
      if (!this.appInitialized.value) {
        if (!!user) {
          const userFactory = new UserFactory();
          getDoc(doc(this.afs, 'Users/' + user.uid)).then((snapshot) => {
            const user = userFactory.fromDbObject(snapshot);
            this._applicationContext.loggedInUser = {
              guid: user.guid,
              name: user.name,
            };
            this.appInitialized.next(true);
          });
        } else {
          this._applicationContext.loggedInUser = null;
          this.appInitialized.next(true);
        }
      } else {
        this._applicationContext.requestAppReload.next();
      }
    });
  }

  public signInWithEmail(credentials) {
    return signInWithEmailAndPassword(
      this.afAuth,
      credentials.email,
      credentials.password
    );
  }

  public signUp(credentials) {
    return createUserWithEmailAndPassword(
      this.afAuth,
      credentials.email,
      credentials.password
    );
  }

  public getEmail(): string {
    return this.user && this._user.email;
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  public async signInWithGoogle() {
    return this.oauthSignIn(new GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return signInWithPopup(this.afAuth, provider);
    } else {
      return signInWithRedirect(this.afAuth, provider).then(() => {
        return getRedirectResult(this.afAuth)
          .then((result) => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            // let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
          })
          .catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
      });
    }
  }
}
