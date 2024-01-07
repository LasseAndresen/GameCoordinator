import { Component, OnDestroy, OnInit } from '@angular/core';
import { BggThingDto } from 'boardgamegeekclient/dist/esm/dto';
import { BoardgameDetailsDialogArgs } from './boardgameDetailsDialogArgs';

@Component({
  templateUrl: './boardgameDetailDialogComponent.html',
})
export class BoardgameDetailDialogComponent implements OnDestroy, OnInit {
  public game: BggThingDto;

  constructor(args: BoardgameDetailsDialogArgs) {
    this.game = args.game;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
