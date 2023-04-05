import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackEndModule } from './backend/BackEndModule';
import { DialogService } from './frontend/services/dialogService';
import { MainContainerModule } from './frontend/core-layout/mainContainer/mainContainerModule';
import { DashboardContext } from './frontend/pages/contexts/dashboardContext';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BackEndModule,
    MainContainerModule,
  ],
  providers: [DialogService, BackEndModule, DashboardContext],
  bootstrap: [AppComponent]
})
export class AppModule { }
