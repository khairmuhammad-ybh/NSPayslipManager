import {
    profileSchema, 
    rankSchema,
    payslipTemplateSchema,
    payslipSchema,
    payslipComparedSchema,
    payslipDiffSchema,
} from './dbmodel.datasource';

export const profileDbOptions = {
    path: 'profileDb.realm',
    schema: [profileSchema, rankSchema],
    schemaVersion: 0, // optional
};

export const payslipTemplateDbOptions = {
    path: 'payslipTemplateDb.realm',
    schema: [payslipTemplateSchema],
    schemaVersion: 0, // optional
};

export const payslipDbOptions = {
    path: 'payslipDb.realm',
    schema: [payslipSchema],
    schemaVersion: 0, // optional
};

export const payslipComparedDbOptions = {
    path: 'payslipComparedDb.realm',
    schema: [payslipComparedSchema, payslipDiffSchema],
    schemaVersion: 0, // optional
}