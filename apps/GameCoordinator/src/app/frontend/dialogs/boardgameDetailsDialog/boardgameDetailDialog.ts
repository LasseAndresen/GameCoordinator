import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { DialogService } from '@services';
import { BoardgameDetailDialogComponent } from './boardgameDetailDialogComponent';
import { BggThingDto } from 'boardgamegeekclient/dist/esm/dto';
import { BoardgameDetailsDialogArgs } from './boardgameDetailsDialogArgs';

@Injectable()
export class BoardgameDetailDialog {
  constructor(private _dialogService: DialogService) {}
  public show(game: BggThingDto) {
    const dialogArgs = new BoardgameDetailsDialogArgs(game);
    this._dialogService.showDialog<BoardgameDetailDialogComponent>(
      BoardgameDetailDialogComponent,
      [{ provide: BoardgameDetailsDialogArgs, useValue: dialogArgs }]
    );
  }
}
