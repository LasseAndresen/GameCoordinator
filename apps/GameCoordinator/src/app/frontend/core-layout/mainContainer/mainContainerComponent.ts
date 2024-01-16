import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { AuthService } from '../../../backend/services/AuthService';
import { ApplicationContext } from '@services';

@Component({
  selector: 'app-pages',
  templateUrl: './mainContainerComponent.html',
  styleUrls: ['./mainContainerComponent.scss'],
})
export class MainContainerComponent implements OnInit {
  public appInitialized = false;
  public appMinHeight: number;

  @ViewChild('mainContainer')
  public mainContainer: ElementRef;
  @ViewChild('dialogInjectionContainer', { read: ViewContainerRef })
  dialogInjectionContainer;
  // public mainContainer: ViewContainerRef;

  constructor(
    private _authService: AuthService,
    private _applicationContext: ApplicationContext
  ) {}

  async ngOnInit() {
    this._authService.appInitialized
      .pipe(
        filter((b: boolean) => b),
        take(1)
      )
      .subscribe(() => {
        this.appInitialized = true;
        console.log('app initialized');
        setTimeout(() => {
          (this._applicationContext.appMainContainer =
            this.dialogInjectionContainer),
            20;
          this._applicationContext.appHeight =
            this.mainContainer.nativeElement.clientHeight;
          this._applicationContext.appWidth =
            this.mainContainer.nativeElement.clientWidth;
        });
      });

    this.appMinHeight = window.innerHeight;
  }
}
