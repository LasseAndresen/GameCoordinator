import { Injectable, Type, Injector, ReflectiveInjector, ComponentRef, ComponentFactoryResolver, RendererFactory2, ValueProvider } from "@angular/core";
import { ApplicationContext } from "./applicationContext";

@Injectable()
export class DialogService {
    private _dialogComponentRefs: ComponentRef<any>[] = [];

    constructor(private _applicationContext: ApplicationContext,
                private _cfr: ComponentFactoryResolver,
                private _rendererFactory: RendererFactory2) {
    }

    public showDialog<T>(component: Type<T>, providers: ValueProvider[]) {
        const injector: Injector = ReflectiveInjector.resolveAndCreate([
          ...providers
        ]);
        const factory = this._cfr.resolveComponentFactory(component);
        const cr: ComponentRef<T> = this._applicationContext.appMainContainer.createComponent(factory, 0, injector);
        const renderer = this._rendererFactory.createRenderer(cr.location.nativeElement, null);
        renderer.setStyle(cr.location.nativeElement, 'position', 'fixed');
        renderer.setStyle(cr.location.nativeElement, 'z-index', this._dialogComponentRefs.length + 1);
        this._dialogComponentRefs.push(cr);
    }

    public closeDialog() {
        this._dialogComponentRefs[this._dialogComponentRefs.length-1].destroy();
        this._dialogComponentRefs.pop();
    }
}
