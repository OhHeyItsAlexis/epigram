import {Injectable} from '@angular/core';

/**
 * A math utility service with some useful functions
 */
@Injectable({providedIn: 'root'})
export class MathService {
  public getRandomInRange(min: number, max: number, precision: number) {
    min = min === undefined ? 0 : min;
    max = max === undefined ? Number.MAX_SAFE_INTEGER : max;
    precision = precision === undefined ? 0 : precision;

    const random = Math.random() * (max - min) + min;

    return random.toFixed(precision);
  }
}
