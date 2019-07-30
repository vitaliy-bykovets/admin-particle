import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromField from './field.reducer';

export interface DashboardState {
  field: fromField.State
}

export const reducers: ActionReducerMap<DashboardState> = {
  field: fromField.reducer
};

export const selectDashboardState = createFeatureSelector<DashboardState>("dashboard");
