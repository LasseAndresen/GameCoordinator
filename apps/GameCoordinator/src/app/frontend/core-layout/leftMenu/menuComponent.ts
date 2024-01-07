import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../backend/services/AuthService';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { ApplicationContext } from '../../services/applicationContext';
import { MenuItem } from './models/menuItem';

@Component({
  selector: 'left-menu',
  templateUrl: './menuComponent.html',
  styleUrls: ['./menuComponent.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  public menuItems: MenuItem[] = [];
  public isLoading = false;

  @HostBinding('class')
  public appendClasses = 'position-relative';

  constructor(
    private _applicationContext: ApplicationContext,
    private _firestoreService: FirestoreService
  ) {}

  public ngOnInit() {
    this.reloadMenu();
    this._subscriptions.push(
      this._applicationContext.requestAppReload.subscribe(() =>
        this.reloadMenu()
      )
    );
  }

  public ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  public async reloadMenu() {
    this.isLoading = true;
    const dashboardItem = <MenuItem>{
      routerLink: ['home'],
      title: 'Home',
      icon: 'home',
    };
    const groups = await this._firestoreService.getUserGroups();
    const groupItems = [];
    groups.value.forEach((g) =>
      groupItems.push(<MenuItem>{
        routerLink: ['groups', g.guid],
        title: g.name,
      })
    );
    console.log('groupItems, ', groupItems);
    const groupItem = <MenuItem>{
      title: 'Groups',
      icon: 'user-group',
      expanded: true,
      children: groupItems,
    };

    const collectionItem = <MenuItem>{
      routerLink: ['my-collection'],
      title: 'My games',
      icon: 'dice',
    };

    const browseItem = <MenuItem>{
      routerLink: ['browse'],
      title: 'Browse',
      icon: 'chess-board',
    };
    this.menuItems = [dashboardItem, groupItem, collectionItem, browseItem];
    this.isLoading = false;
  }
}
