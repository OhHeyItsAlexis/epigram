import {Component, Input, SimpleChanges} from '@angular/core';
import {NgFor} from '@angular/common';
import {LetterComponent} from '../letter/letter.component';
import {LoggerService} from '../../services/logger.service';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [
    LetterComponent,
    NgFor
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  constructor(private loggerService: LoggerService) {}

  @Input() width!: number;
  @Input() height!: number;
  @Input({transform: (value: string | undefined): string => value || ""}) text!: string;
  page: number = 0;
  pageSize: number = 0;
  characterArray: string[][] = new Array(0);
  seconds: number = 0;
  pageTime: number = 10;
  private timerSubscription: Subscription | undefined;

  ngOnInit() {
    const source = timer(0, 1000);
    this.timerSubscription = source.subscribe(() => {
      this.seconds++;
      if (this.seconds >= this.pageTime) {
        this.nextPage();
        this.seconds = 0;
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes:  SimpleChanges): void {
    if(changes['width'] || changes['height']) {
      this.createArray();;
    }
    if (changes['text']) {
      this.updateText();
      this.resetTimer();
    }
  }

  resetTimer() {
    this.seconds = 0;
  }

  createArray(): void {
    this.pageSize = this.height * this.width;
    this.characterArray = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.characterArray[i] = new Array<string>(this.width);
      for (let j = 0; j < this.width; j++) {
        this.characterArray[i][j] = " ";
      }
    }
  }

  updateText(): void {
    this.page = -1;
    this.nextPage();
  }

  nextPage(): void {
    this.page++;
    if (this.page*this.pageSize > this.text.length) {
      this.loggerService.log(`Page ${this.page} would start at ${this.page*this.pageSize} when string is length ${this.text.length}`);
      this.page = 0;
    }
    this.loggerService.log(`Copying in page ${this.page} of text: ${this.text}`);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const character = this.pageSize*this.page + i*this.width + j;
        if (character < this.text.length) {
          this.characterArray[i][j] = this.text.substring(character, character + 1);
        } else {
          this.characterArray[i][j] = " ";
        }
      }
    }

  }
}
