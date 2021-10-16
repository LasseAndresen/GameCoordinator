import { Component, OnDestroy, OnInit } from "@angular/core";
import { AddBoardGameToLibraryDialog } from "../addBoardGameToLibrary/addBoardGameToLibraryDialog";
import { BehaviorSubject } from "rxjs";
import { BoardGame } from "../../../backend/models/BoardGame";
import { FirestoreService, QueryObservable } from "../../../backend/services/FirestoreService";
import { DialogHandle } from "../../UI/dialogComponent/dialogHandle";

@Component({
    templateUrl: './addBoardGameToCollectionDialogComponent.html'
  })
export class AddBoardGameToCollectionDialogComponent implements OnDestroy, OnInit {
    public boardGameLibrary: BehaviorSubject<BoardGame[]>;
    public ownedBoardGameGuids: string[] = [];
    public selectedBoardGames: BoardGame[] = [];
    private _dbSubscriptions: (() => void)[] = []; // Callback functions to unsubscribe database listeners when closing the dialog. Otherwise they would pesist and leak memory/cost

    constructor(private _dialogHandle: DialogHandle,
                private _firestoreService: FirestoreService,
                private _addBoardGameToLibraryDialog: AddBoardGameToLibraryDialog) { }

    async ngOnInit() {
        const queryObservable = <QueryObservable<BoardGame[]>>(await this._firestoreService.getBoardGameLibrary(true));
        this.boardGameLibrary = queryObservable.observable;
        this._dbSubscriptions.push(queryObservable.unsubscribeCallBackFunction);
        this.ownedBoardGameGuids = (await this._firestoreService.getBoardGameCollection()).map(c => c.guid);
        console.log('Owned board games ', this.ownedBoardGameGuids);
    }

    public closeDialog() {
        this._dialogHandle.closeDialog();
    }

    ngOnDestroy() {
        this._dbSubscriptions.forEach(s => s());
    }

    public onBoardGameClicked(game: BoardGame) {
      if (this.ownedBoardGameGuids.includes(game.guid))
        return;
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
