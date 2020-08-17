import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Bank, CoinSet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private _bank: Bank = {
    deposited: {
      amount: 0,
      twodollars: 0,
      onedollar: 0,
      fiftycents: 0,
      twentycents: 0,
      tencents: 0,
      fivecents: 0,
    },
    supply: {
      twodollars: 15,
      onedollar: 11,
      fiftycents: 5,
      twentycents: 25,
      tencents: 8,
    },
  };

  depositCoin(value: number): Observable<Bank> {
    let deposited = this._bank.deposited;
    const parsedValue: number = +value;

    switch (parsedValue) {
      case 2.0: {
        if (this._bank.supply.twodollars === 25) {
          return throwError('Coin bank full. $2 returned.');
        }

        deposited = {
          ...deposited,
          twodollars: deposited.twodollars + 1,
          amount: deposited.amount + parsedValue,
        };
        break;
      }
      case 1.0: {
        if (this._bank.supply.onedollar === 25) {
          return throwError('Coin bank full. $1 returned.');
        }
        
        deposited = {
          ...deposited,
          onedollar: deposited.onedollar + 1,
          amount: deposited.amount + parsedValue,
        };
        break;
      }
      case 0.5: {
        if (this._bank.supply.fiftycents === 25) {
          return throwError('Coin bank full. 50c returned.');
        }
        
        deposited = {
          ...deposited,
          fiftycents: deposited.fiftycents + 1,
          amount: deposited.amount + parsedValue,
        };
        break;
      }
      case 0.2: {
        if (this._bank.supply.twentycents === 25) {
          return throwError('Coin bank full. 20c returned.');
        }
        
        deposited = {
          ...deposited,
          twentycents: deposited.twentycents + 1,
          amount: deposited.amount + parsedValue,
        };
        break;
      }
      case 0.1: {
        if (this._bank.supply.tencents === 25) {
          return throwError('Coin bank full. 10c returned.');
        }
        
        deposited = {
          ...deposited,
          tencents: deposited.tencents + 1,
          amount: deposited.amount + parsedValue,
        };
        break;
      }
      case 0.05: {
        return throwError('5c are not accepted by this machine. 5c returned.');
        break;
      }
    }

    // Rebuild immutable object.
    this._bank = {
      ...this._bank,
      deposited,
    };

    return of(this._bank);
  }

  dispense() {}

  cancelOrder(): Observable<CoinSet> {
    const returned = this._bank.deposited;

    this._bank = {
      ...this._bank,
      deposited: {
        amount: 0,
        twodollars: 0,
        onedollar: 0,
        fiftycents: 0,
        twentycents: 0,
        tencents: 0,
        fivecents: 0,
      },
    };

    return of(returned);
  }
}
