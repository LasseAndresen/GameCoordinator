import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, Subscription } from "rxjs";
import { debounceTime, skip } from "rxjs/operators";
import { BoardGameGeekApiCaller } from "../../../backend/services/boardGameGeekApiCaller";
import { BggSearchDto, BggThingDto } from "boardgamegeekclient/dist/esm/dto";

@Component({
  templateUrl: './boardgameSearchComponent.html',
  selector: 'boardgame-search',
  standalone: true,
  imports: [MatAutocompleteModule, CommonModule]
})
export class BoardgameSearchComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _inputObservable = new BehaviorSubject<string>(null);
  private _searchQueue: string[] = [];
  public testOptions = ['Testing', 'Still testing', 'Something else'];
  public options: BggThingDto[] = [];

  constructor(private _bggApi: BoardGameGeekApiCaller) {

  }

  ngOnInit(): void {
    this._subscriptions.push(this._inputObservable.pipe(skip(1), debounceTime(250)).subscribe(i => this.searchInputUpdated(i)));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private searchInputUpdated(searchString: string) {
    this._searchQueue.push(searchString);
    if (this._searchQueue.length > 1) {
      return;
    }
    this.updateOptions();
  }

  private async updateOptions(): Promise<void> {
    const searchString = this._searchQueue.pop();
    this._searchQueue = [];
    if (searchString.length < 3) {
      this.options = [];
    } else {
      const result = await this._bggApi.search(searchString, false);
      console.log('Results ', result);
      this.options = result?.length > 0 ? (await this._bggApi.getBoardGames(result.map(r => r.id).splice(0, 30))) : [];
      this.options.sort((a, b) => b.statistics.ratings.average - a.statistics.ratings.average);
    }

     this.checkSearchQueue();
  }

  private checkSearchQueue() {
    if (this._searchQueue.length > 0) {
      this.updateOptions();
    }
  }

  public onSearchInputChange(event: any) {
    this._inputObservable.next(event.target.value);
  }

  public onOptionSelected(option: MatAutocompleteSelectedEvent) {
    option.option.value;
  }
}
