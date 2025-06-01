import {Component, Input, SimpleChanges, ViewChild, ElementRef} from '@angular/core';
import {LoggerService} from '../../services/logger.service';
import {Subscription, timer} from 'rxjs';

/**
 * A component that displays individual letters as a a split-flap display and
 * animated changes automatically
 */
@Component({
  selector: 'app-letter',
  imports: [],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss'
})
export class LetterComponent {
  @Input() character!: string;
  private seconds: number = 0;
  private delay: number = 0;
  bottomFlipping: boolean = false;
  topFlipping: boolean = false;
  topCharacter: string = " ";
  flapCharacter: string = " ";
  bottomCharacter: string = " ";
  showFlapCharacter: boolean = false;
  flapTop: boolean = true;
  private letterStack: string[] = [];
  private timerSubscription: Subscription | undefined;
  @ViewChild('flap') flap!: ElementRef;

  constructor(private loggerService: LoggerService) {}

  ngAfterViewInit() {
    this.loggerService.log('ngAfterViewInit');
    this.flap.nativeElement.addEventListener('animationend', (ev: AnimationEvent) => {
      this.animationFinished();
    });
  }

  ngOnDestroy() {
    this.destroyTimer();
    this.flap.nativeElement.removeEventListener('animationend', this.animationFinished);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['character'];
    if (change) {
      this.generateLetterStack(change.previousValue || " ", change.currentValue)
      this.destroyTimer();
      this.delay = Math.floor(Math.random() * 100)+1;
      this.startTimer();
      this.runLetterStack()
    }
  }

  /**
   * Triggers the next stage after an animation is complete
   */
  animationFinished() {
    if (this.topFlipping) {
      this.flapCharacter = this.topCharacter;
      this.topFlipping = false;
      this.bottomFlipping = true;
      this.flapTop = false;
    } else if (this.bottomFlipping) {
      this.bottomCharacter = this.topCharacter;
      this.bottomFlipping = false;
      this.showFlapCharacter = false;
      this.flapTop = true;
      this.runLetterStack();
    }
  }

  /**
   * Destroys the existing timer subscription
   */
  destroyTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  /**
   * Starts a timer that kicks off the animation after this.delay centiseconds
   */
  startTimer(): void {
    this.seconds = 0;
    const source = timer(0, 10);
    this.timerSubscription = source.subscribe(() => {
      this.seconds++;
      if (this.seconds >= this.delay){
        this.runLetterStack();
        this.destroyTimer();
      }
    });
  }

  /**
   * Fills the letter stack with all of the values to get from startValue (exclusive)
   * to endValue (inclusive.)
   * @param startValue The letter the stack should start populating from (not included in the stack.)
   * @param endValue The letter the stack should end on (included in the stack.)
   */
  generateLetterStack(startValue: string, endValue: string): void {
    // Same character, don't do anything
    if (startValue == endValue) {
      return;
    }
    const startAscii = startValue.charCodeAt(0);
    const endAscii = endValue.charCodeAt(0);
    // Starts outside of alpha, so generate from start of alphabet
    if (startAscii < 65 || startAscii > 90) {
      this.letterStack.push('A');
      this.generateLetterStack('A', endValue);
      return;
    }
    // Ends outside of alpha
    if (endAscii < 65 || endAscii > 90) {
      // So run through remaining alphabet characters
      this.generateLetterStack(startValue, 'Z');
      // Then pretend next flap is our non-alpha
      this.letterStack.push(endValue);
      return;
    }
    // End point is earlier in alphabet, so we need to roll around
    if (endAscii < startAscii) {
      this.generateLetterStack(startValue, 'Z');
      // Since generate excludes the starting character
      this.letterStack.push('A');
      this.generateLetterStack('A', endValue);
      return;
    }
    // Everything is in order, so lets push in the alphabet
    for(let i = startAscii + 1; i <= endAscii; i++) {
      this.letterStack.push(String.fromCharCode(i));
    }
  }

  /**
   * Starts animating the display through the existing stack
   */
  runLetterStack() {
    //Destroy the timer so that the only thing trigger animations is the end of the previous one
    this.destroyTimer();

    if (this.letterStack.length == 0) { return; }
    this.topCharacter = this.letterStack.shift() || " ";
    this.showFlapCharacter = true;
    this.bottomFlipping = false;
    this.topFlipping = true;
  }

  /**
   * An easter egg! Makes the flap "accidentally" drop a few more if you tap it
   * @param e The event details for the mouse interaction (unused)
   */
  tapTheFlap(e: MouseEvent): void {
    //Don't bother doing anything if we're in the middle of a flip
    if (this.bottomFlipping || this.topFlipping) {
      return;
    }

    const startAscii = this.topCharacter.charCodeAt(0);
    if (startAscii > 90 || startAscii < 65) {
      this.generateLetterStack(this.topCharacter, String.fromCharCode(65+Math.floor(Math.random()*3)));
    } else {
      const endAscii = 65+(startAscii+Math.floor(Math.random()*3)-65)%25;
      this.generateLetterStack(this.topCharacter, String.fromCharCode(endAscii));
    }
    this.runLetterStack();
  }
}
