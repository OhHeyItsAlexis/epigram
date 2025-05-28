import { Routes } from '@angular/router';
import {EpigramComponent} from './pages/epigram/epigram.component';
import {NewComponent} from './pages/new/new.component';

export const routes: Routes = [
  {
    path: '',
    component: EpigramComponent,
  },
  {
    path: 'new',
    component: NewComponent,
  },
];
