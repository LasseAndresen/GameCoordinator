import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class ApplicationContext {
  public appMainContainer: ViewContainerRef;
  public appHeight: number;
  public appWidth: number;
  public rightDrawerActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public loggedInUser: { guid: string; name: string };

  public requestAppReload: Subject<void> = new Subject<void>();

  public createEvent(): void {
    this.rightDrawerActive.next(true);
  }

  public editEvent(id: string): void {

  }
}
