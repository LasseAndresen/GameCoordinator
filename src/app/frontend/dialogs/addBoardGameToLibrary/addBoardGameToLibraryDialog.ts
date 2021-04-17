import { Injectable } from "@angular/core";
import { DialogService } from "../../services/dialogService";
import { AddBoardGameToLibraryDialogComponent } from "./addBoardGameToLibraryDialogComponent";

@Injectable()
export class AddBoardGameToLibraryDialog {
    constructor(private _dialogService: DialogService) {

    }
    public show() {
        this._dialogService.showDialog<AddBoardGameToLibraryDialogComponent>(AddBoardGameToLibraryDialogComponent, []);
    }
}
