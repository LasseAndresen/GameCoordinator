import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Optional,
} from '@angular/core';
import { Group } from '../../../backend/models/Group';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { DashboardContext } from '../../pages/contexts/dashboardContext';
import { DialogHandle } from '../../UI/dialogComponent/dialogHandle';
import { EventUtilities, KeyCodeEnum } from '../../utilities/EventUtilities';
import { AddGroupMembersDialogArgs } from './addGroupMembersDialogArgs';

@Component({
  templateUrl: './addGroupMembersDialogComponent.html',
})
export class AddGroupMembersDialogComponent implements OnDestroy, OnInit {
  public emailText: string = '';
  public emailFieldEmpty = true;

  constructor(
    private _dialogHandle: DialogHandle,
    private _firestoreService: FirestoreService,
    private _dialogArgs: AddGroupMembersDialogArgs
  ) {}

  async ngOnInit() {}

  public closeDialog() {
    this._dialogHandle.closeDialog();
  }

  ngOnDestroy() {}

  public textChange() {
    this.emailFieldEmpty = this.emailText.trim() == '';
  }

  public onKeyPress(event: KeyboardEvent) {
    const keyCode = EventUtilities.getKeyCodeFromEvent(event);
    if (keyCode === KeyCodeEnum.Enter && !this.emailFieldEmpty) {
      this.onConfirmClick();
    }
  }

  public async onConfirmClick() {
    if (this.emailFieldEmpty) {
      return;
    }
    const group = { name: this.emailText } as Group;

    await this._firestoreService.addMemberToGroup(
      this.emailText,
      this._dialogArgs.groupID
    );
    this.closeDialog();
  }

  public onCancelClick() {
    this.closeDialog();
  }
}
