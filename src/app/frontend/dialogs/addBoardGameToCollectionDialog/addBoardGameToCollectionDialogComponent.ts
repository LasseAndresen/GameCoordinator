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
    private _dbSubscriptions: (() => void)[] = []; // Callback functions to unsubscribe database listeners when closing the dialog. Otherwise they would pesist and leak memory/cost

    constructor(private _dialogHandle: DialogHandle,
                private _firestoreService: FirestoreService,
                private _addBoardGameToLibraryDialog: AddBoardGameToLibraryDialog) { }

    async ngOnInit() {
        const queryObservable = <QueryObservable<BoardGame[]>>(await this._firestoreService.getBoardGameLibrary(true));
        this.boardGameLibrary = queryObservable.observable;
        this._dbSubscriptions.push(queryObservable.unsubscribeCallBackFunction);
    }

    public closeDialog() {
        this._dialogHandle.closeDialog();
    }

    ngOnDestroy() {
        this._dbSubscriptions.forEach(s => s());
    }

    public onAddToLibraryClick() {
        this._addBoardGameToLibraryDialog.show();
    }

    public onConfirmClick() {

    }

    public onCancelClick() {
        this.closeDialog();
    }
}
