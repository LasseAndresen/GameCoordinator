import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { ApplicationContext } from '../../services/applicationContext';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'browse-page',
  templateUrl: './browsePageComponent.html',
  styleUrls: ['./browsePageComponent.scss'],
  providers: []
})
export class BrowsePageComponent implements OnInit, AfterViewInit, OnDestroy {
  private _uiSubscriptions: Subscription[] = [];
  private _dbSubscriptions: (() => void)[] = [];
  showloading: boolean = false;
  displayedColumns = ['name', 'description'];
  public dataSource = new MatTableDataSource([{name: 'test', description: 'This is a description'},{name: 'test2', description: 'This is also a description'},
                        {name: 'test3', description: 'This is also a description'},{name: 'test4', description: 'This is also a description'}]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _firebaseService: FirestoreService,
              public applicationContext: ApplicationContext,
    ) { }

  async ngOnInit() {
    this.reload();
    this._uiSubscriptions.push(this.applicationContext.requestAppReload.subscribe(() => this.reload()));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  protected applyFilter(event: KeyboardEvent) {

  }
}