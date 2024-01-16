import { Injectable } from '@angular/core';
import { DialogService } from '@services';
import { AddBoardGameToCollectionDialogComponent } from './addBoardGameToCollectionDialogComponent';
@Injectable()
export class AddBoardGameToCollectionDialog {
  constructor(private _dialogService: DialogService) {}
  public show() {
    this._dialogService.showDialog<AddBoardGameToCollectionDialogComponent>(
      AddBoardGameToCollectionDialogComponent,
      []
    );
  }
}
