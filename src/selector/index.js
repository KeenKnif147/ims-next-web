import { createSelector } from "reselect";

export const authSelector = createSelector(
  (state) => state?.auth?.auth,
  (auth) => auth ?? null
);
