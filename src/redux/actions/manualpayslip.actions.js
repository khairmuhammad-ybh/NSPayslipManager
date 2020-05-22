const prefix = `[NSPayslipComparer]`;

export const UPDATE_NEW_PAYSLIP = `${prefix} UPDATE_NEW_PAYSLIP`;

export const update_new_payslip = payslip => ({
  type: UPDATE_NEW_PAYSLIP,
  payload: payslip,
});
