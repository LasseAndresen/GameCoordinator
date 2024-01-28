import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { ApplicationContext } from '@services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {WeaviateService} from '../../../backend/services/WeaviateService';

@Component({
  selector: 'browse-page',
  templateUrl: './browsePageComponent.html',
  styleUrls: ['./browsePageComponent.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [],
})
export class BrowsePageComponent implements OnInit, AfterViewInit, OnDestroy {
  private _uiSubscriptions: Subscription[] = [];
  private _dbSubscriptions: (() => void)[] = [];
  public showloading = false;
  public displayedColumns: string[] = [];

  public dataSource = new MatTableDataSource([
    // { name: 'test', description: 'This is a description' },
    // { name: 'test2', description: 'This is also a description' },
    // { name: 'test3', description: 'This is also a description' },
    // { name: 'test4', description: 'This is also a description' },>
  ]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _firebaseService: FirestoreService,
    private _weaviateService: WeaviateService,
    public applicationContext: ApplicationContext,
  ) {}

  async ngOnInit() {
    this.reload();
    this._uiSubscriptions.push(
      this.applicationContext.requestAppReload.subscribe(() => this.reload())
    );
    const view = await this._weaviateService.getView();
    console.log('View ', view);
    this.dataSource = new MatTableDataSource(view.rows);
    this.displayedColumns = view.columns;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {

  }

  public async reload() {
    if (!this.applicationContext.loggedInUser) {
      return;
    }
  }

  async ngOnDestroy() {
    this._uiSubscriptions.forEach((s) => s.unsubscribe());
    this._dbSubscriptions.forEach((s) => s());
  }

  protected applyFilter(event: KeyboardEvent) {}

  public test() {
    console.log('Clicked');
  }
}
