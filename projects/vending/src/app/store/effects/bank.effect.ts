import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as bankActions from '../actions/bank.action';
import * as services from '../../services';

@Injectable()
export class BankEffects {
  constructor(
    private _actions$: Actions,
    private _bankService: services.BankService,
    private _messageService: services.MessageService
  ) {}

  @Effect()
  depositCoin$ = this._actions$.pipe(
    ofType(bankActions.DEPOSIT),
    switchMap((action: bankActions.Deposit) => {
      return this._bankService.depositCoin(action.payload).pipe(
        map((bank) => new bankActions.DepositSuccess(bank)),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new bankActions.DepositFail(error));
        })
      );
    })
  );

  @Effect()
  purchased$ = this._actions$.pipe(
    ofType(bankActions.PURCHASE),
    switchMap((action: bankActions.Purchase) => {
      return this._bankService.purchase().pipe(
        map((bank) => {
          const amount = bank.returned.amount ? bank.returned.amount : 0;

          this._messageService.newMessage(`
          Returned coins: 
          $2: ${bank.returned.twodollars},
          $1: ${bank.returned.onedollar},
          50c: ${bank.returned.fiftycents},
          20c: ${bank.returned.twentycents},
          10c: ${bank.returned.tencents},
          5c: ${bank.returned.fivecents}
          
          Total amount returned: $${amount}
          `);
          return new bankActions.PurchaseSuccess(bank);
        }),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new bankActions.PurchaseFail(error));
        })
      );
    })
  );

  @Effect()
  cancelCoinDeposit$ = this._actions$.pipe(
    ofType(bankActions.CANCEL_DEPOSIT),
    switchMap(() => {
      return this._bankService.cancelOrder().pipe(
        map((bank) => {
          this._messageService.newMessage(`
          Returned coins: 
          $2: ${bank.returned.twodollars},
          $1: ${bank.returned.onedollar},
          50c: ${bank.returned.fiftycents},
          20c: ${bank.returned.twentycents},
          10c: ${bank.returned.tencents},
          5c: ${bank.returned.fivecents}
          
          Total amount returned: $${bank.returned.amount}
          `);
          return new bankActions.CancelDepositSuccess(bank);
        }),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new bankActions.CancelDepositFail(error));
        })
      );
    })
  );
}
