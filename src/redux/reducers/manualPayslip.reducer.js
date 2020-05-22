import * as ACTION from '../actions/manualpayslip.actions';

const initState = {
  payslips: [],
};

const ManualPayslip = (state = initState, {type, payload}) => {
    switch (type) {
      case ACTION.UPDATE_NEW_PAYSLIP:
        return {
          ...state,
          payslips: [...state.payslips, payload]
          
        };
      default:
        return state;
    }
  };
  
  export default ManualPayslip;
