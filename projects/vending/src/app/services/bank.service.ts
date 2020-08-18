import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Bank, } from '../models';
import { SupplyService } from './supply.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private _bank: Bank = {
    transactionValid: false,
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
    returned: {
      amount: 0,
      twodollars: 0,
      onedollar: 0,
      fiftycents: 0,
      twentycents: 0,
      tencents: 0,
      fivecents: 0,
    },
  };

  private PRODUCT_VALUE = 1.6;

  constructor(private _supplyService: SupplyService) {}

  depositCoin(value: number): Observable<Bank> {
    let deposited = this._bank.deposited;
    const parsedValue: number = +value;

    // Ensure transaction is reset when depositing coins.
    this._bank = {
      ...this._bank,
      transactionValid: false,
    };

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
          amount: this._addDecimals(deposited.amount, parsedValue),
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
          amount: this._addDecimals(deposited.amount, parsedValue),
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
          amount: this._addDecimals(deposited.amount, parsedValue),
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
          amount: this._addDecimals(deposited.amount, parsedValue),
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

  purchase(): Observable<Bank> {
    if (this._bank.deposited.amount === this.PRODUCT_VALUE && this._supplyService.hasStock()) {
      this._updateSupply();
      this._bank = {
        ...this._bank,
        transactionValid: true,
      };
    } else if (this._bank.deposited.amount > this.PRODUCT_VALUE && this._supplyService.hasStock()) {
      const deposited = this._bank.deposited.amount;
      this._updateSupply();
      this._calculateChange(deposited);

      this._bank = {
        ...this._bank,
        transactionValid: true,
      };
    } else {
      this._bank = {
        ...this._bank,
        returned: {
          amount: this._bank.deposited.amount,
          twodollars: this._bank.deposited.twodollars,
          onedollar: this._bank.deposited.onedollar,
          fiftycents: this._bank.deposited.fiftycents,
          twentycents: this._bank.deposited.twentycents,
          tencents: this._bank.deposited.tencents,
          fivecents: 0,
        },
        deposited: {
          amount: 0,
          twodollars: 0,
          onedollar: 0,
          fiftycents: 0,
          twentycents: 0,
          tencents: 0,
          fivecents: 0,
        },
        transactionValid: false,
      };
    }

    return of(this._bank);
  }

  cancelOrder(): Observable<Bank> {
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
      returned,
    };

    return of(this._bank);
  }

  private _calculateChange(deposited: number) {
    const originalState = this._bank;
    let changeOwed = ((deposited * 10) - (this.PRODUCT_VALUE * 10)) / 10;

    // Save amount owed.
    this._bank = {
      ...this._bank,
      returned: {
        ...this._bank.returned,
        amount: changeOwed,
      },
    };

    const twodollars = Math.floor(changeOwed / 2);
    if (changeOwed > 2 && this._bank.supply.twodollars >= twodollars) {
      this._bank = {
        ...this._bank,
        supply: {
          ...this._bank.supply,
          twodollars: this._bank.supply.twodollars - twodollars,
        },
        returned: {
          ...this._bank.returned,
          twodollars,
        },
      };

      changeOwed = this._addDecimals(changeOwed, twodollars);
    }

    const onedollar = Math.floor(changeOwed);
    if (changeOwed > 1 && this._bank.supply.onedollar >= onedollar) {
      this._bank = {
        ...this._bank,
        supply: {
          ...this._bank.supply,
          onedollar: this._bank.supply.onedollar - onedollar,
        },
        returned: {
          ...this._bank.returned,
          onedollar,
        },
      };

      changeOwed = this._addDecimals(changeOwed, onedollar);
    }

    const fiftycents = Math.floor(changeOwed / 0.5);
    if (changeOwed > 0.5 && this._bank.supply.fiftycents >= fiftycents) {
      this._bank = {
        ...this._bank,
        supply: {
          ...this._bank.supply,
          fiftycents: this._bank.supply.fiftycents - fiftycents,
        },
        returned: {
          ...this._bank.returned,
          fiftycents,
        },
      };

      changeOwed = this._addDecimals(changeOwed, fiftycents);
    }

    const twentycents = Math.floor(changeOwed / 0.2);
    if (changeOwed > 0.2 && this._bank.supply.twentycents >= twentycents) {
      this._bank = {
        ...this._bank,
        supply: {
          ...this._bank.supply,
          twentycents: this._bank.supply.twentycents - twentycents,
        },
        returned: {
          ...this._bank.returned,
          twentycents,
        },
      };

      changeOwed = this._addDecimals(changeOwed, twentycents);
    }

    const tencents = Math.floor(changeOwed / 0.1);
    if (changeOwed > 0.1 && this._bank.supply.tencents >= tencents) {
      this._bank = {
        ...this._bank,
        supply: {
          ...this._bank.supply,
          tencents: this._bank.supply.tencents - tencents,
        },
        returned: {
          ...this._bank.returned,
          tencents,
        },
      };

      changeOwed = this._addDecimals(changeOwed, tencents);
    }

    if (changeOwed > 0) {
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
        returned: this._bank.returned,
      };
    }
  }

  private _updateSupply() {
    this._bank = {
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
        twodollars:
          this._bank.supply.twodollars + this._bank.deposited.twodollars,
        onedollar: this._bank.supply.onedollar + this._bank.deposited.onedollar,
        fiftycents:
          this._bank.supply.fiftycents + this._bank.deposited.fiftycents,
        twentycents:
          this._bank.supply.twentycents + this._bank.deposited.twentycents,
        tencents: this._bank.supply.tencents + this._bank.deposited.tencents,
      },
      returned: {
        amount: 0,
        twodollars: 0,
        onedollar: 0,
        fiftycents: 0,
        twentycents: 0,
        tencents: 0,
        fivecents: 0,
      },
      transactionValid: false,
    };
  }

  private _addDecimals(first: number, second: number): number {
    // Allow for inaccurate numbers in JavaScript.
    first = first * 10;
    second = second * 10;
    const result = first + second;

    return result / 10;
  }
}
