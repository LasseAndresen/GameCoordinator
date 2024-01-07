import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DashboardContext {
  public reloadGroupOverview: Subject<void> = new Subject<void>();

  constructor() {}
}
