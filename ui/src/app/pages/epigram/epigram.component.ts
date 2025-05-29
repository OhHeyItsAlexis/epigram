import {Component, Input} from '@angular/core';
import { CommonModule} from '@angular/common';
import {BoardComponent} from "../../shared/components/board/board.component";
import {EpigramService} from '../../shared/services/epigram.service';
import {Epigram} from '../../shared/models/epigram';
import {Subscription, timer} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-epigram',
    imports: [
        BoardComponent,
        CommonModule
    ],
  templateUrl: './epigram.component.html',
  styleUrl: './epigram.component.scss'
})
export class EpigramComponent {
  private seconds: number = 0;
  private readonly timerSubscription: Subscription | undefined;
  paused = false;
  epigram: Epigram | undefined;

  @Input() id: number | undefined


  constructor(private epigramService: EpigramService, private route: ActivatedRoute) {
    const source = timer(0, 1000);
    this.timerSubscription = source.subscribe(() => {
      if (this.paused) {
        console.log(`Paused at ${this.seconds} seconds.`);
        return;
      }
      this.seconds++;
      if (this.seconds >= 30){
        this.seconds = 0;
        this.getNewEpigram()
      }
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.paused = true;
      this.epigramService.getEpigram(this.id).subscribe((e: Epigram) => this.epigram = e);
    } else {
      this.getNewEpigram()
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  play(): void {
    this.paused = false;
  }

  pause(): void {
    this.paused = true;
  }

  getNewEpigram(): void {
    this.seconds = 0;
    this.epigramService.getRandomEpigram().subscribe((e: Epigram) => {
      //While we could hypothetically get stuck in an infinite loop here, it's not likely
      if (this.epigram?.id == e.id) {
        this.getNewEpigram();
      } else {
        this.epigram = e;
      }
    });
  }
}
