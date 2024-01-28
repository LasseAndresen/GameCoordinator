import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BestPlayerCountPipe } from './bestPlayerCountPipe';
import { GamePublisherPipe } from './gamePublisherPipe';
import { DecimalPipe } from '@angular/common';
import {ViewBoardGame} from '@gc-shared';

@Component({
  templateUrl: './boardgameDetailComponent.html',
  selector: 'boardgame-details',
  standalone: true,
  imports: [BestPlayerCountPipe, GamePublisherPipe, DecimalPipe],
})
export class BoardgameDetailComponent implements OnDestroy, OnInit {
  @Input()
  public game: ViewBoardGame;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
