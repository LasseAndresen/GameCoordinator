import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DialogHandle } from './dialogHandle';
import { Subscription } from 'rxjs';
import { DialogService } from '@services';

@Component({
  selector: 'la-dialog',
  templateUrl: './dialogComponent.html',
  styleUrls: ['./dialogComponent.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  @Input()
  public height: number;

  @Input()
  public width: number;

  @Input()
  public title: string;

  constructor(
    private _dialogService: DialogService,
    private _dialogHandle: DialogHandle
  ) {}

  ngOnInit() {
    this._subscriptions.push(
      this._dialogHandle.requestDialogClose.subscribe(() => this.closeDialog())
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  public onBackgroundClick() {
    this.closeDialog();
  }

  private closeDialog() {
    this._dialogService.closeDialog();
  }
}
