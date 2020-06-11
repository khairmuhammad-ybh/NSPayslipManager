const prefix = `[NSPayslipManager]`;

export const SET_PROFILE = `${prefix} SET_PROFILE`;
export const UPDATE_PROFILE = `${prefix} UPDATE_PROFILE`;

export const set_profile = profile => ({
  type: SET_PROFILE,
  payload: profile,
});

export const update_profile = profile => ({
  type: UPDATE_PROFILE,
  payload: profile
});
