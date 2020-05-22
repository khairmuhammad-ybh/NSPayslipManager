export const profileSchema = {
  name: 'Profile',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    profileId: 'string',
    name: 'string',
    rank: {type: 'Rank'},
    divAndUnit: 'string',
    troop: 'string',
    payslipOCR: 'string',
    payslipManual: 'string',
  },
};

export const rankSchema = {
  name: 'Rank',
  properties: {
    rankName: 'string',
    rankPay: 'string',
  },
};

// Manual payslip
export const manualPayslipSchema = {
  name: 'ManualPayslip',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    rank: 'string',
    month: 'string',
    vocationAllowance: 'string',
    mealAllowance: 'string',
    basicSalary: 'string',
    otherAllowance: 'string',
    grossSalary: 'string',
    deduction: 'string',
    claimAndOthers: 'string',
    netSalary: 'string',
    additional: {type: 'additional'},
    timeStamp: 'string',
  },
};

export const additionalSchema = {
  name: 'additional',
  properties: {
    rank: 'string',
    mealAllowance: 'string',
    claimAndOthers: 'string',
  },
};
