import { Injectable, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable()
export class ApplicationContext {
    public appMainContainer: ViewContainerRef;
    public appHeight: number;
    public appWidth: number;

    public requestAppReload: Subject<void> = new Subject<void>();
}