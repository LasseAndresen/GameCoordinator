import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardgameDetailsDialogArgs } from './boardgameDetailsDialogArgs';
import {ViewBoardGame} from '@gc-shared';

@Component({
  templateUrl: './boardgameDetailDialogComponent.html',
})
export class BoardgameDetailDialogComponent implements OnDestroy, OnInit {
  public game: ViewBoardGame;

  constructor(args: BoardgameDetailsDialogArgs) {
    this.game = ViewBoardGame.fromBggThing(args.game);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
