import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { ApplicationContext } from '../../services/applicationContext';

@Component({
  selector: 'browse-page',
  templateUrl: './browsePageComponent.html',
  styleUrls: ['./browsePageComponent.scss'],
  providers: []
})
export class BrowsePageComponent implements OnInit, OnDestroy {
  private _uiSubscriptions: Subscription[] = [];
  private _dbSubscriptions: (() => void)[] = [];
  showloading: boolean = false;

  constructor(private _firebaseService: FirestoreService,
              public applicationContext: ApplicationContext,
    ) { }

  async ngOnInit() {
    this.reload();
    this._uiSubscriptions.push(this.applicationContext.requestAppReload.subscribe(() => this.reload()));
  }

  public async reload() {
    if (!this.applicationContext.loggedInUser) {
      return;
    }
  }

  async ngOnDestroy() {
    this._uiSubscriptions.forEach(s => s.unsubscribe());
    this._dbSubscriptions.forEach(s => s());
  }
}
