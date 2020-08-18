import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  private _MAX_SUPPLY = 10;
  private _supply = 0;

  resupplyMachine(amount: number): Observable<number> {
    if (amount > this._MAX_SUPPLY) {
      return throwError(
        `Resupply amount is too high. Please try an amount lower than ${this._MAX_SUPPLY}`
      );
    } else if (this._supply + amount > this._MAX_SUPPLY) {
      return throwError(
        `Total amount of stock will exceed ${this._MAX_SUPPLY}`
      );
    } else {
      this._supply += amount;
      return of(this._supply);
    }
  }

  consumeItem(): Observable<boolean> {
    if (this._supply > 0) {
      this._supply -= 1;
      return of(true);
    } else {
      return throwError(
        `Insufficient stock in the vending machine. Please resupply.`
      );
    }
  }

  hasStock(): boolean {
    return this._supply > 0;
  }
}
