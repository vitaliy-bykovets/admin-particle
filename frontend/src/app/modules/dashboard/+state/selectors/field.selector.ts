import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromField from '../reducers/field.reducer';

export const selectFieldState = createSelector(
  fromFeature.selectDashboardState,
  (state: fromFeature.DashboardState) => state.field
);

export const selectField = createSelector(
  selectFieldState,
  fromField.getField
);

export const selectCurrentFieldId = createSelector(
  selectFieldState,
  fromField.getCurrentFieldId
);
