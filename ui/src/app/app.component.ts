import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EpigramService} from './shared/services/epigram.service';
import {Epigram} from './shared/models/epigram';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private epigramService: EpigramService) {
    this.epigramService.getRandomEpigram().subscribe((e: Epigram) => this.epigram = e)
  }

  title: string = 'ui'
  epigram: Epigram | undefined
}
