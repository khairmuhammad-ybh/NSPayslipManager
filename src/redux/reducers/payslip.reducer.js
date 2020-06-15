import * as ACTION from '../actions/payslip.action';

const initState = {
  payslips: [],
};

const Payslip = (state = initState, {type, payload}) => {
  switch (type) {
    case ACTION.UPDATE_NEW_PAYSLIP:
      return {
        ...state,
        payslips: [...state.payslips, payload],
      };
    case ACTION.POPULATE_PAYSLIPS:
      return {
        payslips: payload,
      };
    case ACTION.RESET_PAYSLIPS:
      return {
        payslips: [],
      };
    default:
      return state;
  }
};

export default Payslip;
