import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './mainContainerComponent';

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
      { path: 'home', loadChildren: '../../pages/home/homePageModule#HomePageModule' }, //  component: HomePageComponent }, //
      { path: 'groups', loadChildren: '../../pages/group/groupPageModule#GroupPageModule' }, //  component: GroupPageComponent } //
    ]
  }
];

export const routing = RouterModule.forChild(childRoutes);
