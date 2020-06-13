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
        vocation: 'string',
    },
};

export const rankSchema = {
    name: 'Rank',
    properties: {
        rankName: 'string',
        rankPay: 'string',
    },
};

export const payslipTemplateSchema = {
    name: 'PayslipTemplate',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        rank: 'string',
        vocationAllowance: 'string',
        mealAllowance: 'string', // default 0
        basicSalary: 'string',
        otherAllowance: 'string',
        grossSalary: 'string',
        deduction: 'string',
        claimAndOthers: 'string',
        netSalary: 'string',
        timeStamp: 'string',
    },
};

export const payslipSchema = {
    name: 'Payslip',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        rank: 'string',
        date: {type: 'Date'},
        vocationAllowance: 'string',
        mealAllowance: 'string',
        basicSalary: 'string',
        otherAllowance: 'string',
        grossSalary: 'string',
        deduction: 'string',
        claimAndOthers: 'string',
        netSalary: 'string',
        timeStamp: 'string',
    },
};

export const dateSchema = {
    name: 'Date',
    properties: {
        month: 'string',
        year: 'string',
    },
}

export const payslipComparedSchema = {
    name: 'ComparedPayslip',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        date: {type: 'Date'},
        rank: {type: 'PayslipRankDiff'},
        mealAllowance: {type: 'PayslipDiff'},
        claimAndOthers: {type: 'PayslipDiff'},
        netSalary: {type: 'PayslipDiff'},
        extraOrLoss: 'string',
        refPayslip: 'string',
        timeStamp: 'string',
    }
}

export const payslipDiffSchema = {
    name: 'PayslipDiff',
    properties: {
        expected: 'string',
        actual: 'string',
    },
};

export const payslipRankDiffSchema = {
    name: 'PayslipRankDiff',
    properties: {
        rankName: 'string',
        expected: 'string',
        actual: 'string',
    },
};