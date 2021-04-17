import { Routes, RouterModule } from '@angular/router';
import { GroupPageComponent } from './groupPageComponent';

const childRoutes: Routes = [
    {
        path: '',
        component: GroupPageComponent,
        /*children: [{
          path: "**",
          component: GroupPageComponent
        }]*/
    }
];

export const routing = RouterModule.forChild(childRoutes);
