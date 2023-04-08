import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";

@Component({
  templateUrl: './boardgameDetailComponent.html',
  selector: 'boardgame-details',
  standalone: true
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
