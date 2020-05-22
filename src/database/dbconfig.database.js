import {
  profileSchema,
  rankSchema,
  manualPayslipSchema,
  additionalSchema,
} from './dbModel.database';

export const profileDbOptions = {
  path: 'profileDb.realm',
  schema: [profileSchema, rankSchema],
  schemaVersion: 0, // optional
};

export const manualPayslipDbOptions = {
  path: 'manualPayslipDb.realm',
  schema: [manualPayslipSchema, additionalSchema],
  schemaVersion: 0, // optional
};
