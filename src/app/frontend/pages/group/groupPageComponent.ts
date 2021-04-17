import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AddBoardGameToCollectionDialog } from '../../dialogs/addBoardGameToCollectionDialog/addBoardGameToCollectionDialog';
import { CreateGroupDialog } from '../../dialogs/createGroup/createGroupDialog';
import { DashboardContext } from '../contexts/dashboardContext';
import { ActivatedRoute } from '@angular/router';
import { AddGroupMembersDialog } from '../../dialogs/addGroupMembers/addGroupMembersDialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { GroupPageView } from '../../../backend/views/groupPage';
import { ApplicationContext } from '../../services/applicationContext';

@Component({
  selector: 'group-page',
  templateUrl: './groupPageComponent.html',
  styleUrls: ['./groupPageComponent.scss'],
  providers: []
})
export class GroupPageComponent implements OnInit, OnDestroy {
  private _uiSubscriptions: Subscription[] = [];
  private _dbSubscriptions: (() => void)[] = [];
  showloading: boolean = false;
  public view: GroupPageView;

  constructor(private _firestoreService: FirestoreService,
              private _afs: AngularFirestore,
              private _applicationContext: ApplicationContext,
              private _addBoardGameToCollectionDialog: AddBoardGameToCollectionDialog,
              private _route: ActivatedRoute,
              private _addMembersDialog: AddGroupMembersDialog
    ) {  }

  async ngOnInit() {
    this.reload();
    this._uiSubscriptions.push(this._applicationContext.requestAppReload.subscribe(() => this.reload()));
  }

  public async reload() {
    const groupGuid = this._route.snapshot.url[0].path;
    this.view = new GroupPageView(groupGuid, this._afs, this._firestoreService);
    this.view.initialize();
  }

  async ngOnDestroy() {
    this._uiSubscriptions.forEach(s => s.unsubscribe());
    this._dbSubscriptions.forEach(s => s());
    this.view.destroy();
  }

  public async onAddUserClicked() {
    this._addMembersDialog.show(this.view.group.guid);
  }
}
