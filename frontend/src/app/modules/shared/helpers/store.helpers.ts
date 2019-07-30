import * as R from "ramda";

export const statusLen = R.lensProp("status");

export const setStatusFalse = R.compose(statusLen, R.always(false));
