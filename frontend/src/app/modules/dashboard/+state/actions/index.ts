import { GetFieldList, GetFieldListSuccess, GetFieldListFailure, SetCurrentField } from '@modules/dashboard/+state/actions/field.actions';

export type DashboardActions =
  | GetFieldList
  | GetFieldListSuccess
  | GetFieldListFailure
  | SetCurrentField;

export * from '@modules/dashboard/+state/actions/field.actions';

