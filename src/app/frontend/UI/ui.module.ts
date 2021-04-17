import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/buttonComponent';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: [
    ],
    declarations: [
        LoadingComponent,
        CardComponent,
        ButtonComponent
    ],
    exports: [
        LoadingComponent,
        CardComponent,
        ButtonComponent
    ]
})
export class UIModule { }
