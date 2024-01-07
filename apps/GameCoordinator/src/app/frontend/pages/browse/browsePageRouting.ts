import { Routes, RouterModule } from '@angular/router';
import { BrowsePageComponent } from './browsePageComponent';

const childRoutes: Routes = [
  {
    path: '',
    component: BrowsePageComponent,
  },
];

export const routing = RouterModule.forChild(childRoutes);
