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

@Component({
  templateUrl: './createGroupDialogComponent.html',
})
export class CreateGroupDialogComponent implements OnDestroy, OnInit {
  public nameText: string = '';
  public nameTextFieldEmpty = true;

  constructor(
    private _dialogHandle: DialogHandle,
    private _firestoreService: FirestoreService,
    @Optional() private _dashboardContext: DashboardContext
  ) {}

  async ngOnInit() {}

  public closeDialog() {
    this._dialogHandle.closeDialog();
  }

  ngOnDestroy() {}

  public textChange() {
    this.nameTextFieldEmpty = this.nameText.trim() == '';
  }

  public onKeyPress(event: KeyboardEvent) {
    const keyCode = EventUtilities.getKeyCodeFromEvent(event);
    if (keyCode === KeyCodeEnum.Enter && !this.nameTextFieldEmpty) {
      this.onConfirmClick();
    }
  }

  public async onConfirmClick() {
    if (this.nameTextFieldEmpty) {
      return;
    }
    const group = { name: this.nameText } as Group;

    await this._firestoreService.createGroup(group);
    if (this._dashboardContext != null && this._dashboardContext != undefined) {
      this._dashboardContext.reloadGroupOverview.next();
    }
    this.closeDialog();
  }

  public onCancelClick() {
    this.closeDialog();
  }
}
