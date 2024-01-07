import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BggThingDto } from 'boardgamegeekclient/dist/esm/dto';
import { BestPlayerCountPipe } from './bestPlayerCountPipe';
import { GamePublisherPipe } from './gamePublisherPipe';
import { DecimalPipe } from '@angular/common';

@Component({
  templateUrl: './boardgameDetailComponent.html',
  selector: 'boardgame-details',
  standalone: true,
  imports: [BestPlayerCountPipe, GamePublisherPipe, DecimalPipe],
})
export class BoardgameDetailComponent implements OnDestroy, OnInit {
  @Input()
  public game: BggThingDto;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
