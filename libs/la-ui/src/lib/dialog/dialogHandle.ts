import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class DialogHandle {
  public requestDialogClose: Subject<void> = new Subject<void>();

  constructor() {}

  public closeDialog() {
    this.requestDialogClose.next();
  }
}
