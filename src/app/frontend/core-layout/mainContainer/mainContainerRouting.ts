import { Routes, RouterModule } from '@angular/router';
import { GroupPageComponent } from '../../pages/group/groupPageComponent';
import { HomePageComponent } from '../../pages/home/homePageComponent';
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
      { path: 'home', loadChildren: () => import('../../pages/home/homePageModule').then(m => m.HomePageModule), component: HomePageComponent },
      { path: 'groups/:id', loadChildren: () => import('../../pages/group/groupPageModule').then(m => m.GroupPageModule), component: GroupPageComponent },
      { path: '**', redirectTo: 'pages/home' }
    ]
  }
];

export const routing = RouterModule.forChild(childRoutes);
