const prefix = `[NSPayslipManager]`;

export const UPDATE_NEW_PAYSLIP = `${prefix} UPDATE_NEW_PAYSLIP`;
export const POPULATE_PAYSLIPS = `${prefix} POPULATE_PAYSLIPS`;
export const RESET_PAYSLIPS = `${prefix} RESET_PAYSLIPS`;

export const update_new_payslip = payslip => ({
  type: UPDATE_NEW_PAYSLIP,
  payload: payslip,
});

export const populate_payslips = payslips => ({
  type: POPULATE_PAYSLIPS,
  payload: payslips
});

export const reset_payslips = () => ({
  type: RESET_PAYSLIPS
});
