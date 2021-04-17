import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector, ReflectiveInjector, ComponentRef } from "@angular/core";
import { ApplicationContext } from "../../services/applicationContext";
import { DialogService } from "../../services/dialogService";
import { AddBoardGameToCollectionDialogComponent } from "./addBoardGameToCollectionDialogComponent";
@Injectable()
export class AddBoardGameToCollectionDialog {
    constructor(private _cfr: ComponentFactoryResolver,
                private _dialogService: DialogService,
                private _applicationContext: ApplicationContext) {

    }
    public show() {
        this._dialogService.showDialog<AddBoardGameToCollectionDialogComponent>(AddBoardGameToCollectionDialogComponent, []);
    }
}
