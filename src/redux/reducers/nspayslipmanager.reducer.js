import * as ACTION from '../actions/nspayslipmanager.action';

const initState = {
  firstLaunch: true,
};

const NSPayslipManager = (state = initState, {type}) => {
  switch (type) {
    case ACTION.UPDATE_FIRST_LAUNCH:
      return {
        ...state,
        firstLaunch: !state.firstLaunch,
      };
    default:
      return state;
  }
};

export default NSPayslipManager;
