const stringResource = {
  welcomeHeader: 'Welcome, please introduce yourself',
  welcomeContent: [
    {
      name: 'Name',
      placeholder: 'Name',
    },
    {
      name: 'Division/Unit',
      placeholder: 'Procom/Alpha',
    },
    {
      name: 'Troop',
      placeholder: 'Troop',
    },
    {
      name: 'Rank',
      placeholder: 'What is your rank?',
    },
  ],
  welcomeButtons: ['Continue'],
  pickerDivContent: {
    prefix: 'Procom',
    units: ['Alpha', 'Bravo', 'Charlie'],
    troops: ['Alpha', 'Bravo', 'Charlie', 'Delta'],
  },
  pickerRankContent: {
    ranks: ['SC2', 'CPL', 'SGT(1)', 'SGT(2)', 'NSPI', 'NSI'],
    allowance: [600, 650, 900, 1000, 1100, 1280],
  },
  aboutContent: {
    disclaimer: {
      title: 'DISCLAIMER',
      content:
        'This application were developed to help remove the complication of calculating your payslip manually, and a one stop solution to keep track of your payslips',
    },
    applicationInfo: {
      developer: 'Muhammad Khairi',
      github: 'Khairmuhammad-ybh',
      version: '1.0',
    },
  },
};

export default stringResource;
