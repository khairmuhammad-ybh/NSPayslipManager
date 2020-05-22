import Realm from 'realm';

import {manualPayslipDbOptions} from './dbconfig.database';
import {manualPayslipSchema, additionalSchema} from './dbModel.database';

export const calculatePayslip = newManualPayslip => {
  return new Promise((resolve, reject) => {
    Realm.open(manualPayslipDbOptions)
      .then(realm => {
        let manualPayslip = realm.objects(manualPayslipSchema.name);
        let payslips = manualPayslip.filtered(
          `timeStamp = \"${newManualPayslip.timeStamp}\"`,
        );
        if (payslips > 0) {
          reject('payslip has been added');
        }
        //   write new payslip profile into database
        realm.write(() => {
          realm.create(manualPayslipSchema.name, newManualPayslip);
        });
        realm.close();
        resolve(newManualPayslip);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const resetPayslips = () => {
  return new Promise((resolve, reject) => {
    Realm.open(manualPayslipDbOptions)
      .then(realm => {
        realm.write(() => {
          let allPayslips = realm.objects(manualPayslipSchema.name);
          realm.delete(allPayslips);
        });

        let retrievePayslips = realm.objects(manualPayslipSchema.name);
        resolve(JSON.parse(JSON.stringify(retrievePayslips)));
      })
      .catch(err => {
        reject(err);
      });
  });
};
