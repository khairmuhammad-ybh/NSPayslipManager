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
