import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as supplyActions from '../actions/supply.action';
import * as supplyService from '../../services/supply.service';

@Injectable()
export class SupplyEffects {
  constructor(
    private actions$: Actions,
    private supplyService: supplyService.SupplyService
  ) {}

  @Effect()
  resupplyStock$ = this.actions$.pipe(
    ofType(supplyActions.SUPPLY),
    switchMap((action: supplyActions.Supply) => {
      return this.supplyService.resupplyMachine(action.payload).pipe(
        map((supply) => new supplyActions.SupplySuccess(supply)),
        catchError((error) => of(new supplyActions.SupplyFail(error)))
      );
    })
  );
}
