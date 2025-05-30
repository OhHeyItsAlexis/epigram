import { Routes } from '@angular/router';
import {EpigramComponent} from './pages/epigram/epigram.component';
import {NewComponent} from './pages/new/new.component';
import {EditComponent} from './pages/edit/edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/epigrams',
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: EditComponent,
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
