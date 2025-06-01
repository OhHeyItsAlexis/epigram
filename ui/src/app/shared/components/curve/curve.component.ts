import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MathService} from '../../services/math.service';

/**
 * A component that displays a randomized curve
 */
@Component({
  selector: 'app-curve',
  imports: [],
  templateUrl: './curve.component.html',
  styleUrl: './curve.component.scss'
})
export class CurveComponent {
  @Input() height: number = 600;
  @Input() width: number = 300;
  @Input() strokeWidth: number = 10;
  @Input() color: string = 'black';
  path = "";

  constructor(private mathService: MathService) {
    this.generateStem();
  }

  private generateStem() {
    const x1 = this.mathService.getRandomInRange(15, 30, 0);
    const x2 = this.mathService.getRandomInRange(-30, -15, 0);
    const x3 = this.mathService.getRandomInRange(15, 30, 0);
    const x4 = this.mathService.getRandomInRange(-30, -15, 0);

    this.path =
      'M' + 0 + ',' + (this.height) +
      'C' + 0 + ',' + (this.height) + ' ' + x1 + ',' + (this.height * .9) + ' ' + (x1) + ',' + (this.height * .8) +
      'C' + x1 + ',' + (this.height * .7) + ' ' + x2 + ',' + (this.height * .65) + ' ' + (x2) + ',' + (this.height * .55) +
      'C' + x2 + ',' + (this.height * .45) + ' ' + x3 + ',' + (this.height * .4) + ' ' + (x3) + ',' + (this.height * .3) +
      'C' + x3 + ',' + (this.height * .2) + ' ' + x4 + ',' + (this.height * .2) + ' ' + (x4) + ',0'
    ;
  }
}
