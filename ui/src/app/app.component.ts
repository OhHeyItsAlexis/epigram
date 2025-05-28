import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BoardComponent} from './shared/components/board/board.component';
import {EpigramComponent} from './shared/components/epigram/epigram.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EpigramComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'ui';
}
