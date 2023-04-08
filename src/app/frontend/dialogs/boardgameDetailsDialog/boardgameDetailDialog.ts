import { Injectable, ComponentFactoryResolver } from "@angular/core";
import { DialogService } from "../../services/dialogService";
import { BoardgameDetailDialogComponent } from "./boardgameDetailDialogComponent";

@Injectable()
export class BoardgameDetailDialog {
    constructor(private _dialogService: DialogService,) {

    }
    public show() {
        this._dialogService.showDialog<BoardgameDetailDialogComponent>(BoardgameDetailDialogComponent, []);
    }
}
