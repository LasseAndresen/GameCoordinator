import { Injectable } from '@angular/core';
import { GroupPost } from '../../../backend/models/GroupPost';
import { DialogService } from '@services';
import { AddGroupPostDialogArgs } from './addGroupPostDialogArgs';
import { AddGroupPostDialogComponent } from './addGroupPostDialogComponent';

@Injectable()
export class AddGroupPostDialog {
  constructor(private _dialogService: DialogService) {}
  public show(
    groupID: string,
    taggableUsers: string[],
    existingPost: GroupPost
  ) {
    const dialogArgs = new AddGroupPostDialogArgs(
      groupID,
      taggableUsers,
      existingPost
    );
    this._dialogService.showDialog<AddGroupPostDialogComponent>(
      AddGroupPostDialogComponent,
      [{ provide: AddGroupPostDialogArgs, useValue: dialogArgs }]
    );
  }
}
