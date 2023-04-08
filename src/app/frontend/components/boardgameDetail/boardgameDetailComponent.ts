import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";
import { BestPlayerCountPipe } from "./bestPlayerCountPipe";

@Component({
  templateUrl: './boardgameDetailComponent.html',
  selector: 'boardgame-details',
  standalone: true,
  imports: [BestPlayerCountPipe]
})
export class BoardgameDetailComponent implements OnDestroy, OnInit {

  @Input()
  public game: BggThingDto;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
