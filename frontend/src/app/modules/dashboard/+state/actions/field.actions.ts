export const GET_FIELD_LIST = 'GET_FIELD_LIST';
export const GET_FIELD_LIST_SUCCESS = 'GET_FIELD_LIST_SUCCESS';
export const GET_FIELD_LIST_FAILURE = 'GET_FIELD_LIST_FAILURE';

export const SET_CURRENT_FIELD = 'SET_CURRENT_FIELD';

export class GetFieldList {
  readonly type = GET_FIELD_LIST;
  constructor() {};
}

export class GetFieldListSuccess {
  readonly type = GET_FIELD_LIST_SUCCESS;
  constructor(public payload: any) {};
}

export class GetFieldListFailure {
  readonly type = GET_FIELD_LIST_FAILURE;
  constructor(public payload: any) {};
}

export class SetCurrentField {
  readonly type = SET_CURRENT_FIELD;
  constructor(public payload: number) {};
}
