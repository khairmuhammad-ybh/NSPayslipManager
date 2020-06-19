const stringResource = {
  applicationInfo: {
    applicationName: 'NSPayslipsManager',
    developer: 'Muhammad Khairi',
    github: 'NSPayslipManager@Github',
    version: '1.0',
    links: {
      developer: 'https://khairmuhammad-ybh.github.io',
      github: 'https://github.com/khairmuhammad-ybh/NSPayslipManager',
      license: '',
      privacy_policy:
        'https://khairmuhammad-ybh.github.io/policies/nspsm/nspsm-privacy-policy.html',
      terms_and_condition:
        'https://khairmuhammad-ybh.github.io/policies/nspsm/nspsm-terms-and-condition.html',
    },
  },
  settingScreen: {
    options: [
      'Contact Us',
      'Terms and Privacy Policy',
      'How it work?',
      'App Info',
      'Rate Us',
    ],
  },
  howItWorkScreen: {
    header: 'How we calculate your payslip'
  },
  contactUs: {
    options: ['Send Feedback', 'Ask Question', 'Report Error'],
    email: 'khairmuhammad.ybh@gmail.com'
  },
  aboutContent: {
    disclaimer: {
      title: 'DISCLAIMER',
      content:
        'This application were developed to help remove the complication of calculating your payslip manually, and a one stop solution to keep track of your payslips',
    },
  },
  // New format
  formHeaders: {
    // Welcome screen
    welcome_mainHeaders: [
      'Welcome, please introduce yourself',
      'Please specify fixed deduction if any',
    ],
    welcome_sub_headers: ['Name', 'Division/Unit', 'Troop', 'Vocation', 'Rank'],
    welcome_sub_placeholder: ['Name', '', '', '', '', ''],
    welcome_buttons: ['Continue', 'Register Profile'],
    welcome_otherHeaders: ['Deduction (if applicable)'],
    welcome_otherPlaceholders: ['Total deduction'],
    welcome_policies_acceptance: ['By registering, you agreed and accepted to the policies implies to you'],
    // Profile screen
    profile_mainHeaders: ['Update My Profile'],
    profile_sub_headers: ['Name', 'Rank', 'Vocation'],
    profile_buttons: ['Update My Profile'],
    // Payslip screen
    payslip_mainHeader: [
      'Please enter details for your payslip',
      'Expected total meal allowance',
    ],
    payslip_subHeaders: [
      'Month',
      'Year',
      'Total Rank Pay',
      'Total Meal Allowance',
      'Total Deductions',
      'Total Claim/others',
      'Total Expected Meal Allowance',
    ],
    payslip_subPlaceholder: [
      '',
      '',
      'Total amount rank pay',
      'Total amount meal allowance',
      'Total amount deductions',
      'Total amount claim/others',
      'Total expected meal allowance',
    ],
    payslip_buttons: ['Continue', 'Calculate Payslip'],
  },
  pickersContents: {
    pickerDivContent: {
      prefix: 'Procom',
      units: ['Alpha', 'Bravo', 'Charlie'],
      troops: ['Alpha', 'Bravo', 'Charlie', 'Delta'],
    },
    pickerVocationContent: {
      vocations: ['SLP', 'IRT', 'POI'],
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
