import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgroService } from '@modules/dashboard/services';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '@modules/dashboard/+state/actions'
import * as fromStore from '@modules/dashboard/+state';

@Injectable()
export class FieldEffects {
  @Effect()
  getFieldList$ = this.actions.pipe(
    ofType(fromActions.GET_FIELD_LIST),
    switchMap((action: fromActions.GetFieldList) =>
      this.s.getAllField()
        .pipe(
          map(
            (res: any) => new fromActions.GetFieldListSuccess(res)
          ),
          catchError((err) => of(new fromActions.GetFieldListFailure(err)))
        )
    )
  );


  constructor(
    private s: AgroService,
    private actions: Actions,
    private store: Store<fromStore.DashboardState>
  ) {}
}
