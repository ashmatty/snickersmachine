import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Bank } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private deposited = 0;

  bank: Bank = {
    deposited: {
      amount: 0,
      twodollars: 0,
      onedollar: 0,
      fiftycents: 0,
      twentycents: 0,
      tencents: 0,
    },
    
    supply: {
      twodollars: 15,
      onedollar: 11,
      fiftycents: 5,
      twentycents: 25,
      tencents: 8,
    },
  };

  depositCoin(value: CoinSet): Observable<Bank> {
    // const deposit = this.bank.deposited + value;
    // this.bank = {
    //   ...this.bank,
    //   deposited: deposit,
    // };

    

    return of(this.bank);
  }

  cancelOrder(): Observable<Bank> {
    // this.bank = {
    //   ...this.bank,
    //   deposited: 0,
    // };

    return of(this.bank);
  }
}
