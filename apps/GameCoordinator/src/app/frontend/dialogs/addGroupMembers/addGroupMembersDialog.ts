import { Injectable } from '@angular/core';
import { DialogService } from '@services';
import { AddGroupMembersDialogComponent } from './addGroupMembersComponent';
import { AddGroupMembersDialogArgs } from './addGroupMembersDialogArgs';

@Injectable()
export class AddGroupMembersDialog {
  constructor(private _dialogService: DialogService) {}
  public show(groupID: string) {
    const dialogArgs = new AddGroupMembersDialogArgs(groupID);
    this._dialogService.showDialog<AddGroupMembersDialogComponent>(
      AddGroupMembersDialogComponent,
      [{ provide: AddGroupMembersDialogArgs, useValue: dialogArgs }]
    );
  }
}
