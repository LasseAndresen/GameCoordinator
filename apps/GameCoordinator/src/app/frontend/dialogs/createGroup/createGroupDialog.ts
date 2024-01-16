import { Injectable } from '@angular/core';
import { DialogService } from '@services';
import { CreateGroupDialogComponent } from './createGroupDialogComponent';

@Injectable()
export class CreateGroupDialog {
  constructor(private _dialogService: DialogService) {}
  public show() {
    this._dialogService.showDialog<CreateGroupDialogComponent>(
      CreateGroupDialogComponent,
      []
    );
  }
}
