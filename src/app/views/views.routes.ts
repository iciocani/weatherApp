import { RoutingPath } from '../core/enums/routing.enum';
import { Routes } from '@angular/router';

export const viewsRoutes: Routes = [
  {
    path: RoutingPath.Dashboard,
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
]
