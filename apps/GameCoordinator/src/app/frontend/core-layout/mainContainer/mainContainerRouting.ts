import { Routes, RouterModule } from '@angular/router';
import { GroupPageComponent } from '../../pages/group/groupPageComponent';
import { HomePageComponent } from '../../pages/home/homePageComponent';
import { MainContainerComponent } from './mainContainerComponent';
import { BrowsePageComponent } from '../../pages/browse/browsePageComponent';

export const childRoutes: Routes = [
  /*{
    path: 'login',
    component: MainContainerComponent,
  },*/
  {
    path: 'pages',
    component: MainContainerComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home/homePageModule').then(
            (m) => m.HomePageModule
          ),
        component: HomePageComponent,
      },
      {
        path: 'groups/:id',
        loadChildren: () =>
          import('../../pages/group/groupPageModule').then(
            (m) => m.GroupPageModule
          ),
        component: GroupPageComponent,
      },
      {
        path: 'browse',
        loadChildren: () =>
          import('../../pages/browse/browsePageModule').then(
            (m) => m.BrowsePageModule
          ),
        component: BrowsePageComponent,
      },
      { path: '**', redirectTo: 'pages/home' },
    ],
  },
];

export const routing = RouterModule.forChild(childRoutes);
