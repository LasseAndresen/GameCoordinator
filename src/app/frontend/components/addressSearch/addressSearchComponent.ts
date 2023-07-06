import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, Subscription } from "rxjs";
import { debounceTime, skip } from "rxjs/operators";
import GooglePlacesAPICaller, { LocationSuggestion } from "../../../backend/services/GooglePlacesAPICaller";
import { MatInputModule } from "@angular/material/input";

@Component({
  templateUrl: './addressSearchComponent.html',
  selector: 'address-search',
  standalone: true,
  imports: [MatAutocompleteModule, CommonModule, MatInputModule]
})
export class AddressSearchComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _inputObservable = new BehaviorSubject<string>(null);
  private _searchQueue: string[] = [];

  public options: LocationSuggestion[] = [];
  public isLoading = false;

  @Input()
  public width = '100%';

  @Output()
  public addressSelected = new EventEmitter<string>();

  @ViewChild('searchInput')
  private _inputElement: ElementRef;

  constructor(private _placesAPI: GooglePlacesAPICaller) {

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
      try {
        this.isLoading = true;
        this.options = await this._placesAPI.search(searchString);
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
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

  public onOptionSelected(optionEvent: MatAutocompleteSelectedEvent) {
    this.addressSelected.emit(optionEvent.option.value);
  }
}
