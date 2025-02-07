import { Routes } from '@angular/router';
import { RoutingPath } from './core/enums/routing.enum';
import { viewsRoutes } from './views/views.routes';

export const routes: Routes = [
  {path: '', redirectTo: RoutingPath.Dashboard, pathMatch: 'full'},
  ...viewsRoutes
];
