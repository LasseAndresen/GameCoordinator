import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ButtonComponent } from './components/button/buttonComponent';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [],
  declarations: [LoadingComponent, ButtonComponent],
  exports: [LoadingComponent, ButtonComponent],
})
export class UIModule {}
