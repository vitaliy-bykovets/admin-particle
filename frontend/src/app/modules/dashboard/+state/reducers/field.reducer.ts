import {Field} from '@modules/dashboard/models/field.model';
import * as fromActions from '@modules/dashboard/+state/actions';

import * as R from 'ramda';

import { setStatusFalse } from '@modules/shared/helpers/store.helpers'
import { DashboardActions } from '@modules/dashboard/+state/actions';
import {GetFieldListSuccess} from '@modules/dashboard/+state/actions/field.actions';

export interface State {
  field: Field[];
  pending: boolean;
  loaded: boolean;
  status: "fail" | "success";
  message: string;
  currentFieldId: number;
}

export const initialState: State = {
  field: null,
  pending: false,
  loaded: false,
  status: null,
  message: null,
  currentFieldId: null
};

const fieldLens = R.lensProp("field");

const setField = R.compose(R.set(fieldLens));

export function reducer(state: State = initialState, action: fromActions.DashboardActions) {
  switch (action.type) {
    case fromActions.GET_FIELD_LIST:
      return {...state};
    // case fromActions.GET_FIELD_LIST:
    //   return R.converge(R.compose, [
    //     setStatusFalse,
    //   ])(action)(state);

    case fromActions.GET_FIELD_LIST_SUCCESS:
      return {
        ...state,
        field: action.payload
      };

    // case fromActions.GET_FIELD_LIST_SUCCESS:
    //   return R.converge(R.compose, [
    //     setField,
    //   ])(action)(state);

    case fromActions.SET_CURRENT_FIELD:
      return {
        ...state,
        currentFieldId: action.payload
      };

    default:
      return state;
  }
}

export const getField = (state: State) => state.field;
export const getFieldPending = (state: State) => state.pending;
export const getFieldLoaded = (state: State) => state.loaded;
export const getFieldStatus = (state: State) => state.status;
export const getFieldMessage = (state: State) => state.message;
export const getCurrentFieldId = (state: State) => state.currentFieldId;
