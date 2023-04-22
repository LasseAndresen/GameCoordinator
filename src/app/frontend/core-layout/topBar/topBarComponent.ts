import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../backend/services/AuthService';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'top-bar',
  templateUrl: './topBarComponent.html',
  styleUrls: ['./topBarComponent.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  avatarImgSrc: string = 'assets/images/DiceLogo.png';
  userName: string = '';

  public loggedIn = false;

  tip = { ring: true, email: true };

  constructor(private _authService: AuthService,
              private _fireBaseService: FirestoreService) { }

  public ngOnInit() {
    this._subscriptions.push(this._authService.user.subscribe(user => this.updateUserInfo(user)));
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private updateUserInfo(user: User) {
    this.userName = user != null ? user.displayName : '';
    this.loggedIn = user != null;
  }

  public onLogoClick() {

  }

  public async onLoginClick() {
    await this._authService.signInWithGoogle();

  }

  public async onLogoutClick() {
    await this._authService.signOut();
  }
}
