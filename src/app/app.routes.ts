import { Routes } from '@angular/router';
import { ViewUsersComponent } from './pages/view-users/view-users.component';

export const routes: Routes = [
  { path: '', component: ViewUsersComponent },
  { path: '**', component: ViewUsersComponent, pathMatch: 'full' },
];
