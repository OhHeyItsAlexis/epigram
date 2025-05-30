import { Routes } from '@angular/router';
import {EpigramComponent} from './pages/epigram/epigram.component';
import {NewComponent} from './pages/new/new.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/epigrams',
    pathMatch: 'full'
  },
  {
    path: 'epigrams',
    component: EpigramComponent,
  },
  {
    path: 'epigrams/:id',
    component: EpigramComponent,
  },
  {
    path: 'new',
    component: NewComponent,
  },
];
