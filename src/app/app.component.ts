import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as isPrime from 'isprime';
import * as isSquare from 'is-square';

export enum NUM_TYPE_OPTION {
  PRIME,
  FINOBACCI
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fluid-column';
  form: FormGroup;
  result$: Observable<boolean>;
  numTypeOption = [
    { value: NUM_TYPE_OPTION.PRIME, title: 'isPrime' },
    { value: NUM_TYPE_OPTION.FINOBACCI, title: 'isFinobacci' },
  ]

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      number: [null, ''],
      numType: [NUM_TYPE_OPTION.PRIME]
    });

    const number = this.form.get('number').valueChanges.pipe(map(this.toInteger));
    const type = this.form.get('numType').valueChanges.pipe(startWith(NUM_TYPE_OPTION.PRIME));

    this.result$ = combineLatest([number, type]).pipe(map(this.calResult));
  }

  toInteger = (n: number) => {
    n = Number.isInteger(n) ? n : Math.round(n);
    n = n < 0 ? 1 : n;
    this.form.get('number').setValue(n, {emitEvent: false});
    return n;
  }

  calResult = ([number, type]) => {
    console.log(number, type);
    if (type == NUM_TYPE_OPTION.PRIME) {
      return this.isPrime(number);
    } else {
      return this.isFinobacci(number);
    }
  }

  isFinobacci(n: number) {
    if(n === null) { return false; }

    if (isSquare(5 * (n * n) - 4) || isSquare(5 * (n * n) + 4)) {
      return true;
    } else { return false; }
  }

  isPrime(n: number) {
    return n === null ? false : isPrime(n);
  }
}
