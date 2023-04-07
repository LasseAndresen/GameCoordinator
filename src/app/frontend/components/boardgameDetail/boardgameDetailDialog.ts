import { Injectable, ComponentFactoryResolver } from "@angular/core";
import { ApplicationContext } from "../../services/applicationContext";
import { DialogService } from "../../services/dialogService";
import { BoardgameDetailComponent } from "./boardgameDetailComponent";

@Injectable()
export class BoardgameDetailDialog {
    constructor(private _dialogService: DialogService,) {

    }
    public show() {
        this._dialogService.showDialog<BoardgameDetailComponent>(BoardgameDetailComponent, []);
    }
}
