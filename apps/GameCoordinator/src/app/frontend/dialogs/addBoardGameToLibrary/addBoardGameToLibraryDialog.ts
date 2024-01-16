import { Injectable } from '@angular/core';
import { DialogService } from '@services';
import { AddBoardGameToLibraryDialogComponent } from './addBoardGameToLibraryDialogComponent';

@Injectable()
export class AddBoardGameToLibraryDialog {
  constructor(private _dialogService: DialogService) {}
  public show() {
    this._dialogService.showDialog<AddBoardGameToLibraryDialogComponent>(
      AddBoardGameToLibraryDialogComponent,
      []
    );
  }
}
