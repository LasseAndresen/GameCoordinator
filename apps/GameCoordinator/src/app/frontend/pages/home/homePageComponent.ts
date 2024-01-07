import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AddBoardGameToCollectionDialog } from '../../dialogs/addBoardGameToCollectionDialog/addBoardGameToCollectionDialog';
import { CreateGroupDialog } from '../../dialogs/createGroup/createGroupDialog';
import { DashboardContext } from '../contexts/dashboardContext';
import { BehaviorSubject } from 'rxjs';
import { BoardGame } from '../../../backend/models/BoardGame';
import { CompactGroup } from '../../../backend/models/Group';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { ApplicationContext } from '../../services/applicationContext';
import { BoardGameGeekApiCaller } from '../../../backend/services/boardGameGeekApiCaller';
import { BoardgameDetailComponent } from '../../components/boardgameDetail/boardgameDetailComponent';
import { BoardgameDetailDialog } from '../../dialogs/boardgameDetailsDialog/boardgameDetailDialog';
import { BackendUtilities } from '../../../backend/utilities/backendUtilities';

@Component({
  selector: 'home-page',
  templateUrl: './homePageComponent.html',
  styleUrls: ['./homePageComponent.scss'],
  providers: [],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private _uiSubscriptions: Subscription[] = [];
  private _dbSubscriptions: (() => void)[] = [];
  showloading: boolean = false;
  public boardGameCollection: BoardGame[] = [];
  public groups: BehaviorSubject<CompactGroup[]>;

  constructor(
    private _firebaseService: FirestoreService,
    public applicationContext: ApplicationContext,
    private _addBoardGameToCollectionDialog: AddBoardGameToCollectionDialog,
    private _createGroupDialog: CreateGroupDialog,
    private _dashboardContext: DashboardContext,
    private _bggApi: BoardGameGeekApiCaller,
    private _boardgameDetailDialog: BoardgameDetailDialog
  ) {}

  async ngOnInit() {
    this.reload();
    this._uiSubscriptions.push(
      this.applicationContext.requestAppReload.subscribe(() => this.reload())
    );
    this._uiSubscriptions.push(
      this._dashboardContext.reloadGroupOverview.subscribe(() =>
        this.loadGroups()
      )
    );
  }

  public async reload() {
    if (!this.applicationContext.loggedInUser) {
      return;
    }
    const boardGamePromise = this.loadBoardGames();
    const groupPromise = this.loadGroups();

    Promise.all([boardGamePromise, groupPromise]);
  }

  public async loadBoardGames(): Promise<void> {
    this._firebaseService.getBoardGameCollection().then(async (data) => {
      await BackendUtilities.fillBggDataForBoardGames(this._bggApi, data);
      this.boardGameCollection = data;
    });
  }

  public async loadGroups(): Promise<void> {
    console.log('Getting groups');
    this._firebaseService.getUserGroups().then((data) => {
      console.log('Setting groups ', data);
      this.groups = data;
    });
  }

  async ngOnDestroy() {
    this._uiSubscriptions.forEach((s) => s.unsubscribe());
    this._dbSubscriptions.forEach((s) => s());
  }

  public groupMemberText(memberCount: number): string {
    return memberCount + ' ' + (memberCount === 1 ? 'member' : 'members');
  }

  public groupBoardGameText(boardGameCount: number): string {
    return (
      boardGameCount +
      ' ' +
      (boardGameCount === 1 ? 'board game' : 'board games')
    );
  }

  public onAddBoardGameToCollectionClicked() {
    this._addBoardGameToCollectionDialog.show();
  }

  public onCreateGroupClicked() {
    this._createGroupDialog.show();
  }

  public async onManageGroupClicked(id: string) {
    const game = (await this._bggApi.getBoardGames([266192]))[0];
    this._boardgameDetailDialog.show(game);
    // this._bggApi.search('Wingspan', false);
  }
}
