// Redux
import {store} from '../redux/store';
import * as Actions from '../redux/actions';

// uuid
import UUIDGenerator from 'react-native-uuid-generator';

// database
import * as dbManualpayslip from '../database/manualPayslip.database';
import {manualPayslipDbOptions} from '../database/dbconfig.database';
import {manualPayslipSchema} from '../database/dbModel.database';

export const calculatePayslip = data => {
  return new Promise((resolve, reject) => {
    generateUUID().then(uuid => {
      let dbId = uuid;
      let vocationAllowance = 225;
      let otherAllowance = parseInt(data.mealAllowance) + vocationAllowance;
      let grossSalary = parseInt(data.rank) + otherAllowance;
      let totalDeduction =
        parseInt(data.deductionAmount) + parseInt(data.claimAmount);
      let netSalary = grossSalary - totalDeduction;

      let current_datetime = new Date();
      let formattedDate =
        current_datetime.getDate() +
        '/' +
        (current_datetime.getMonth() + 1) +
        '/' +
        current_datetime.getFullYear() +
        ' ' +
        current_datetime.getHours() +
        ':' +
        current_datetime.getMinutes() +
        ':' +
        current_datetime.getSeconds();

      let newManualPayslip = {
        _id: dbId,
        rank: parseFloat(data.rank).toFixed(2),
        month: data.month,
        vocationAllowance: parseFloat(vocationAllowance).toFixed(2),
        mealAllowance: parseFloat(data.mealAllowance).toFixed(2),
        basicSalary: parseFloat(data.rank).toFixed(2),
        otherAllowance: parseFloat(otherAllowance).toFixed(2),
        grossSalary: parseFloat(grossSalary).toFixed(2),
        deduction: parseFloat(data.deductionAmount).toFixed(2),
        claimAndOthers: parseFloat(data.claimAmount).toFixed(2),
        netSalary: parseFloat(netSalary).toFixed(2),
        additional: {
          rank: '',
          mealAllowance: '0',
          claimAndOthers: '0',
        },
        timeStamp: formattedDate,
      };

      // console.log(newManualPayslip);

      dbManualpayslip
        .calculatePayslip(newManualPayslip)
        .then(resp => {
          //  success
          store.dispatch(Actions.update_new_payslip(newManualPayslip));
          resolve(resp);
        })
        .catch(err => {
          //  error
          reject(err);
        });
    });
  });
};

export const clearAllPayslip = () => {
  return new Promise((resolve, reject) => {
    dbManualpayslip
      .resetPayslips()
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const generateUUID = () => {
  return new Promise((resolve, reject) => {
    UUIDGenerator.getRandomUUID().then(uuid => {
      resolve(uuid);
    });
  });
};
