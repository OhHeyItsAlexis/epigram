import {Component, Input, SimpleChanges} from '@angular/core';
import {EpigramService} from '../../services/epigram.service';
import {LoggerService} from '../../services/logger.service';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-letter',
  imports: [],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss'
})
export class LetterComponent {
  @Input() character!: string;
  seconds: number = 0;
  delay: number = 1;
  isAnimationComplete: boolean = false;
  isFlipping: boolean = false;
  oldCharacter: string = " ";
  newCharacter: string = " ";
  animationLength = 3;
  private timerSubscription: Subscription | undefined;

  constructor(private loggerService: LoggerService) {}

  ngOnDestroy() {
    this.destroyTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['character'];
    if (change) {
      this.transitionLetter(change.previousValue, change.currentValue)
    }
  }

  destroyTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer(): void {
    this.seconds = 0;
    const source = timer(0, 100);
    this.timerSubscription = source.subscribe(() => {
      this.seconds++;
      if (this.seconds >= this.animationLength){
        this.oldCharacter = this.newCharacter;
        this.isFlipping = false;
        this.isAnimationComplete = true;
      }
    });
  }

  transitionLetter(previousValue: string, currentValue: string) {
    this.destroyTimer();
    if (previousValue === currentValue) { return; }
    this.oldCharacter = previousValue;
    this.isFlipping = false;
    this.newCharacter = currentValue;
    this.delay = Math.floor(Math.random() * 20);
    this.animationLength = 10;
    this.isFlipping = true;
    this.startTimer();
  }
}
