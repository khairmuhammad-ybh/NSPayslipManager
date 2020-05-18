const stringResource = {
  aboutContent: {
    disclaimer: {
      title: 'DISCLAIMER',
      content:
        'This application were developed to help remove the complication of calculating your payslip manually, and a one stop solution to keep track of your payslips',
    },
    applicationInfo: {
      developer: 'Muhammad Khairi',
      github: 'NSPayslipComparer@Github',
      version: '1.0',
    },
  },
  // New format
  formHeaders: {
    // Welcome screen
    welcome_mainHeader: 'Welcome, please introduce yourself',
    welcome_sub_headers: ['Name', 'Division/Unit', 'Troop', 'Rank'],
    welcome_sub_placeholder: ['Name', '', '', '', ''],
    welcome_buttons: ['Continue'],
    // ManualPayslip screen
    manual_mainHeader: 'Please enter details for your payslip',
    manual_sub_headers: [
      'Rank',
      'Month',
      'Meal Allowance(Unit)',
      'Deduction (if application)',
      'Claim/others (if any)',
    ],
    manual_sub_placeholder: ['', '', 'No. of units', 'Total amount deduction', 'Total amount claim/others'],
    manual_buttons: ['Calculate payslip'],
    other_buttons: ['Reset'],
  },
  pickersContents: {
    pickerDivContent: {
      prefix: 'Procom',
      units: ['Alpha', 'Bravo', 'Charlie'],
      troops: ['Alpha', 'Bravo', 'Charlie', 'Delta'],
    },
    pickerRankContent: {
      ranks: ['SC2', 'CPL', 'SGT(1)', 'SGT(2)', 'NSPI', 'NSI'],
      allowance: [600, 650, 900, 1000, 1100, 1280],
    },
    pickerMonthContent: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
};

export default stringResource;
