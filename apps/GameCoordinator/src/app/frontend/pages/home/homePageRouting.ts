import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homePageComponent';

const childRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

export const routing = RouterModule.forChild(childRoutes);
