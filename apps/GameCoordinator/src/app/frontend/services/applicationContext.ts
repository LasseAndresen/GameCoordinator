import { Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class ApplicationContext {
  public appMainContainer: ViewContainerRef;
  public appHeight: number;
  public appWidth: number;

  public loggedInUser: { guid: string; name: string };

  public requestAppReload: Subject<void> = new Subject<void>();
}
