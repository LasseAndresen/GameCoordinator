import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DialogHandle } from './dialogHandle';
import { Subscription } from 'rxjs';
import { ApplicationContext } from '../../services/applicationContext';
import { DialogService } from '../../services/dialogService';

@Component({
  selector: 'dialog-window',
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
    public applicationContext: ApplicationContext,
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
