import * as ACTION from '../actions/nspayslipcomparer.actions';

const initState = {
  firstLaunch: true,
};

const NsPayslipComparer = (state = initState, {type, payload}) => {
  switch (type) {
    case ACTION.UPDATE_FIRST_LAUNCH:
      return {
        ...state,
        firstLaunch: !state.firstLaunch
        
      };
    default:
      return state;
  }
};

export default NsPayslipComparer;
