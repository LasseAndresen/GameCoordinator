import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardGame } from '../../../backend/models/BoardGame';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { DialogHandle } from '../../UI/dialogComponent/dialogHandle';
import { EventUtilities, KeyCodeEnum } from '../../utilities/EventUtilities';

@Component({
  templateUrl: './addBoardGameToLibraryDialogComponent.html',
})
export class AddBoardGameToLibraryDialogComponent implements OnDestroy, OnInit {
  public nameText: string = '';
  public nameTextFieldEmpty = true;

  constructor(
    private _dialogHandle: DialogHandle,
    private _firestoreService: FirestoreService
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
    const boardGame = { name: this.nameText } as BoardGame;

    await this._firestoreService.addBoardGameToLibrary(boardGame);
    this.closeDialog();
  }

  public onCancelClick() {
    this.closeDialog();
  }
}
