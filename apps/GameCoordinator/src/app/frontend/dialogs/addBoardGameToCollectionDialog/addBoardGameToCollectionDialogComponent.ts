import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBoardGameToLibraryDialog } from '../addBoardGameToLibrary/addBoardGameToLibraryDialog';
import { BehaviorSubject } from 'rxjs';
import { BoardGame } from '../../../backend/models/BoardGame';
import {
  FirestoreService,
  QueryObservable,
} from '../../../backend/services/FirestoreService';
import { DialogHandle } from '@la-ui';
import { BggThingDto } from 'boardgamegeekclient/dist/esm/dto';

@Component({
  templateUrl: './addBoardGameToCollectionDialogComponent.html',
})
export class AddBoardGameToCollectionDialogComponent
  implements OnDestroy, OnInit
{
  public boardGameLibrary: BehaviorSubject<BoardGame[]>;
  public ownedBoardGameIDs: number[] = [];
  public selectedBoardGames: BoardGame[] = [];
  private _dbSubscriptions: (() => void)[] = []; // Callback functions to unsubscribe database listeners when closing the dialog. Otherwise they would pesist and leak memory/cost

  constructor(
    private _dialogHandle: DialogHandle,
    private _firestoreService: FirestoreService,
    private _addBoardGameToLibraryDialog: AddBoardGameToLibraryDialog
  ) {}

  async ngOnInit() {
    const queryObservable = <QueryObservable<BoardGame[]>>(
      await this._firestoreService.getBoardGameLibrary(true)
    );
    this.boardGameLibrary = queryObservable.observable;
    this._dbSubscriptions.push(queryObservable.unsubscribeCallBackFunction);
    this.ownedBoardGameIDs = (
      await this._firestoreService.getBoardGameCollection()
    ).map((c) => c.bggID);
    console.log('Owned board games ', this.ownedBoardGameIDs);
  }

  public closeDialog() {
    this._dialogHandle.closeDialog();
  }

  ngOnDestroy() {
    this._dbSubscriptions.forEach((s) => s());
  }

  public onBoardgameSelectedFromSearch(game: BggThingDto) {
    this.addBoardGameToSelected({
      guid: game.id.toString(),
      bggID: game.id,
      name: game.name,
      isFavorite: false,
      bggThing: game,
    } as BoardGame);
  }

  public addBoardGameToSelected(game: BoardGame) {
    if (this.ownedBoardGameIDs.includes(game.bggID)) return;
    if (!this.selectedBoardGames.includes(game))
      this.selectedBoardGames.push(game);
  }

  public onSelectedBoardGameClicked(game: BoardGame) {
    this.selectedBoardGames.splice(this.selectedBoardGames.indexOf(game), 1);
  }

  public onAddToLibraryClick() {
    this._addBoardGameToLibraryDialog.show();
  }

  public async onConfirmClick() {
    const promises: Promise<void>[] = [];
    for (const game of this.selectedBoardGames) {
      promises.push(this._firestoreService.addBoardGameToCollection(game));
    }
    await Promise.all(promises);
    this._dialogHandle.closeDialog();
  }

  public onCancelClick() {
    this.closeDialog();
  }
}
