import { Component } from '@angular/core';
import {BoardComponent} from "../board/board.component";
import {EpigramService} from '../../services/epigram.service';
import {Epigram} from '../../models/epigram';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-epigram',
    imports: [
        BoardComponent
    ],
  templateUrl: './epigram.component.html',
  styleUrl: './epigram.component.scss'
})
export class EpigramComponent {
  private seconds: number = 0;
  private timerSubscription: Subscription | undefined;
  epigram: Epigram | undefined;

  constructor(private epigramService: EpigramService) {
    this.getNewEpigram()

    const source = timer(0, 1000);
    this.timerSubscription = source.subscribe(() => {
      this.seconds++;
      if (this.seconds >= 60){
        this.seconds = 0;
        this.getNewEpigram()
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getNewEpigram(): void {
    console.log('Getting new epigram');
    this.epigramService.getRandomEpigram().subscribe((e: Epigram) => this.epigram = e);
  }
}
