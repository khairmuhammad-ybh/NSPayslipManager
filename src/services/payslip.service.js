import {store} from '../redux/store';
import * as Actions from '../redux/actions';
// id generator
import UUIDGenerator from 'react-native-uuid-generator';
// datasource
import * as dbPayslip from '../datasource/payslip.datasource';
// google-crashlytics
import crashlytics from '@react-native-firebase/crashlytics';

// payslip template (CRUD) functions
export const calculatePayslipTemplate = data => {
  return new Promise((resolve, reject) => {
    generateUUID().then(uuid => {
      let dbId = uuid;
      let vocationAllowance = 225;
      let otherAllowance = parseFloat(data.mealAllowance) + vocationAllowance;
      let grossSalary = parseFloat(data.rank) + otherAllowance;
      let totalDeduction =
        parseFloat(data.deductionAmount) + parseFloat(data.claimAmount);
      let netSalary = parseFloat(grossSalary - totalDeduction);

      let current_datetime = new Date();
      // let formattedDate =
      //   current_datetime.getDate() +
      //   '/' +
      //   (current_datetime.getMonth() + 1) +
      //   '/' +
      //   current_datetime.getFullYear() +
      //   ' ' +
      //   current_datetime.getHours() +
      //   ':' +
      //   current_datetime.getMinutes() +
      //   ':' +
      //   current_datetime.getSeconds();
      let formattedDate =
        current_datetime.getFullYear() +
        '-' +
        (current_datetime.getMonth() + 1) +
        '-' +
        current_datetime.getDate() +
        ' ' +
        current_datetime.getHours() +
        ':' +
        current_datetime.getMinutes() +
        ':' +
        current_datetime.getSeconds();

      let newPayslipTemplate = {
        _id: dbId,
        rank: parseFloat(data.rank).toFixed(2),
        vocationAllowance: parseFloat(vocationAllowance).toFixed(2),
        mealAllowance: parseFloat(data.mealAllowance).toFixed(2),
        basicSalary: parseFloat(data.rank).toFixed(2),
        otherAllowance: parseFloat(otherAllowance).toFixed(2),
        grossSalary: parseFloat(grossSalary).toFixed(2),
        deduction: parseFloat(data.deductionAmount).toFixed(2),
        claimAndOthers: parseFloat(data.claimAmount).toFixed(2),
        netSalary: parseFloat(netSalary).toFixed(2),
        timeStamp: formattedDate,
      };
      dbPayslip
        .calculatePayslipTemplate(newPayslipTemplate)
        .then(resp => {
          // success
          // update login state in redux
          store.dispatch(Actions.update_first_launch());
          resolve(resp);
        })
        .catch(err => {
          //  error
          // firebase crashlytics (crash report)
          crashlytics().log('source: payslip.service.js');
          crashlytics().log(
            'method: dbPayslip.calculatePayslipTemplate(newPayslipTemplate)',
          );
          crashlytics().log('summary: unable to calculate payslip template');
          crashlytics().recordError(err);
          reject({
            message: 'unable to calculate payslip template',
            error: err,
          });
        });
    });
  });
};

export const retrievePayslipTemplate = () => {
  return new Promise((resolve, reject) => {
    dbPayslip
      .retrievePayslipTemplate()
      .then(resp => {
        // success registered
        payslipsObj = JSON.parse(JSON.stringify(resp));
        let newPayslips = [];
        Object.keys(payslipsObj).forEach(element => {
          newPayslips.push(payslipsObj[element]);
        });
        resolve(JSON.parse(JSON.stringify(resp)));
      })
      .catch(err => {
        // failed to register
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log('method: dbPayslip.retrievePayslipTemplate()');
        crashlytics().log('summary: unable to retrieve payslip template');
        crashlytics().recordError(err);
        reject({
          message: 'unable to retrieve payslip template',
          error: err,
        });
      });
  });
};

export const clearAllPayslipTemplate = () => {
  return new Promise((resolve, reject) => {
    dbPayslip
      .resetPayslipTemplate()
      .then(resp => {
        // all payslip template removed
        resolve(JSON.parse(JSON.stringify(resp)));
      })
      .catch(err => {
        // payslip template error
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log('method: dbPayslip.resetPayslipTemplate()');
        crashlytics().log('summary: unable to reset payslip template');
        crashlytics().recordError(err);
        reject({
          message: 'unable to reset payslip template',
          error: err,
        });
      });
  });
};

// payslip template recalculation
export const recalculatePayslipTemplate = (data, type) => {
  return new Promise((resolve, reject) => {
    let current_datetime = new Date();
    // let formattedDate =
    //   current_datetime.getDate() +
    //   '/' +
    //   (current_datetime.getMonth() + 1) +
    //   '/' +
    //   current_datetime.getFullYear() +
    //   ' ' +
    //   current_datetime.getHours() +
    //   ':' +
    //   current_datetime.getMinutes() +
    //   ':' +
    //   current_datetime.getSeconds();
    let formattedDate =
        current_datetime.getFullYear() +
        '-' +
        (current_datetime.getMonth() + 1) +
        '-' +
        current_datetime.getDate() +
        ' ' +
        current_datetime.getHours() +
        ':' +
        current_datetime.getMinutes() +
        ':' +
        current_datetime.getSeconds();

    dbPayslip
      .retrievePayslipTemplate()
      .then(resp => {
        // success registered
        let payslipsObj = JSON.parse(JSON.stringify(resp));
        let _id = payslipsObj[0]._id;

        // update payslip template
        let vocationAllowance = 225;
        let otherAllowance =
          type == 'add'
            ? parseFloat(data.mealAllowance) + vocationAllowance
            : parseFloat(payslipsObj[0].mealAllowance) + vocationAllowance;
        let grossSalary = parseFloat(payslipsObj[0].rank) + otherAllowance;
        let totalDeduction =
          parseFloat(payslipsObj[0].deduction) +
          parseFloat(payslipsObj[0].claimAndOthers);
        let netSalary = parseFloat(grossSalary - totalDeduction);

        let updatedPayslipTemplate = {};

        if (type == 'add') {
          updatedPayslipTemplate = {
            _id: _id,
            vocationAllowance: parseFloat(vocationAllowance).toFixed(2),
            mealAllowance: parseFloat(data.mealAllowance).toFixed(2),
            otherAllowance: parseFloat(otherAllowance).toFixed(2),
            grossSalary: parseFloat(grossSalary).toFixed(2),
            netSalary: parseFloat(netSalary).toFixed(2),
            timeStamp: formattedDate,
          };
        } else {
          updatedPayslipTemplate = {
            _id: payslipsObj[0]._id,
            rank: parseFloat(data.rank.rankPay).toFixed(2),
            vocationAllowance: parseFloat(vocationAllowance).toFixed(2),
            otherAllowance: parseFloat(otherAllowance).toFixed(2),
            grossSalary: parseFloat(grossSalary).toFixed(2),
            netSalary: parseFloat(netSalary).toFixed(2),
            timeStamp: formattedDate,
          };
        }

        dbPayslip
          .recalculatePayslipTemplate(updatedPayslipTemplate)
          .then(resp => {
            // success
            // update login state in redux
            let respObj = JSON.parse(JSON.stringify(resp));
            resolve(respObj[0]);
          })
          .catch(err => {
            //  error
            // firebase crashlytics (crash report)
            crashlytics().log('source: payslip.service.js');
            crashlytics().log(
              'method: dbPayslip.recalculatePayslipTemplate(updatedPayslipTemplate)',
            );
            crashlytics().log('summary: unable to retrieve payslip template');
            crashlytics().recordError(err);
            reject({
              message: 'unable to retrieve payslip template',
              error: err,
            });
          });
      })
      .catch(err => {
        // failed to retrieve payslip template
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log('method: dbPayslip.retrievePayslipTemplate()');
        crashlytics().log('summary: unable to retrieve payslip template');
        crashlytics().recordError(err);
        reject({
          message: 'unable to retrieve payslip template',
          error: err,
        });
      });
  });
};

// Normal payslip functions
export const calculatePayslip = (data, expectedPayslip) => {
  return new Promise((resolve, reject) => {
    generateUUID().then(uuid => {
      let dbId = uuid;
      let vocationAllowance = 225.0;
      let otherAllowance = parseFloat(data.mealAllowance) + vocationAllowance;
      let grossSalary = parseFloat(data.rank) + otherAllowance;
      let totalDeduction =
        parseFloat(data.deductionAmount) + parseFloat(data.claimAmount);
      let netSalary = parseFloat(grossSalary - totalDeduction);

      let current_datetime = new Date();
      // let formattedDate =
      //   current_datetime.getDate() +
      //   '/' +
      //   (current_datetime.getMonth() + 1) +
      //   '/' +
      //   current_datetime.getFullYear() +
      //   ' ' +
      //   current_datetime.getHours() +
      //   ':' +
      //   current_datetime.getMinutes() +
      //   ':' +
      //   current_datetime.getSeconds();
      let formattedDate =
        current_datetime.getFullYear() +
        '-' +
        (current_datetime.getMonth() + 1) +
        '-' +
        current_datetime.getDate() +
        ' ' +
        current_datetime.getHours() +
        ':' +
        current_datetime.getMinutes() +
        ':' +
        current_datetime.getSeconds();

      let newPayslip = {
        _id: dbId,
        rank: parseFloat(data.rank).toFixed(2),
        date: {
          month: data.date.month,
          year: data.date.year,
        },
        vocationAllowance: parseFloat(vocationAllowance).toFixed(2),
        mealAllowance: parseFloat(data.mealAllowance).toFixed(2),
        basicSalary: parseFloat(data.rank).toFixed(2),
        otherAllowance: parseFloat(otherAllowance).toFixed(2),
        grossSalary: parseFloat(grossSalary).toFixed(2),
        deduction: parseFloat(data.deductionAmount).toFixed(2),
        claimAndOthers: parseFloat(data.claimAmount).toFixed(2),
        netSalary: parseFloat(netSalary).toFixed(2),
        timeStamp: formattedDate,
      };

      dbPayslip
        .calculatePayslip(newPayslip)
        .then(resp => {
          //  success
          let actualPayslip = resp;

          generateUUID().then(uuid => {
            let dbId = uuid;
            let extraOrLoss =
              parseFloat(actualPayslip.netSalary) -
              parseFloat(expectedPayslip.netSalary);

            let current_datetime = new Date();
            // let formattedDate =
            //   current_datetime.getDate() +
            //   '/' +
            //   (current_datetime.getMonth() + 1) +
            //   '/' +
            //   current_datetime.getFullYear() +
            //   ' ' +
            //   current_datetime.getHours() +
            //   ':' +
            //   current_datetime.getMinutes() +
            //   ':' +
            //   current_datetime.getSeconds();
            let formattedDate =
            current_datetime.getFullYear() +
            '-' +
            (current_datetime.getMonth() + 1) +
            '-' +
            current_datetime.getDate() +
            ' ' +
            current_datetime.getHours() +
            ':' +
            current_datetime.getMinutes() +
            ':' +
            current_datetime.getSeconds();

            let comparedPayslip = {
              _id: dbId,
              date: {
                month: actualPayslip.date.month,
                year: actualPayslip.date.year,
              },
              rank: {
                rankName: store.getState().Profile.rank,
                expected: expectedPayslip.rank,
                actual: actualPayslip.rank,
              },
              mealAllowance: {
                expected: expectedPayslip.mealAllowance,
                actual: actualPayslip.mealAllowance,
              },
              claimAndOthers: {
                expected: expectedPayslip.claimAndOthers,
                actual: actualPayslip.claimAndOthers,
              },
              netSalary: {
                expected: expectedPayslip.netSalary,
                actual: actualPayslip.netSalary,
              },
              extraOrLoss: parseFloat(extraOrLoss).toFixed(2),
              refPayslip: actualPayslip._id,
              timeStamp: formattedDate,
            };

            dbPayslip
              .calculateComparedPayslip(comparedPayslip)
              .then(resp => {
                // success
                store.dispatch(Actions.update_new_payslip(comparedPayslip));
                resolve(comparedPayslip);
              })
              .catch(err => {
                // unable to calculate payslip error
                // firebase crashlytics (crash report)
                crashlytics().log('source: payslip.service.js');
                crashlytics().log(
                  'method: dbPayslip.calculateComparedPayslip(comparedPayslip)',
                );
                crashlytics().log(
                  'summary: unable to calculate compared payslip',
                );
                crashlytics().recordError(err);
                reject({
                  message: 'unable to calculate compared payslip',
                  error: err,
                });
              });
          });
        })
        .catch(err => {
          // error
          // firebase crashlytics (crash report)
          crashlytics().log('source: payslip.service.js');
          crashlytics().log('method: dbPayslip.calculatePayslip(newPayslip)');
          crashlytics().log('summary: unable to calculate payslip');
          crashlytics().recordError(err);
          reject({
            message: 'unable to calculate payslip',
            error: err,
          });
        });
    });
  });
};

export const retrievePayslips = () => {
  return new Promise((resolve, reject) => {
    dbPayslip
      .retrievePayslip()
      .then(resp => {
        // success payslip retrieved
        let payslipsObj = JSON.parse(JSON.stringify(resp));
        let newPayslips = [];
        Object.keys(payslipsObj).forEach(element => {
          newPayslips.push(payslipsObj[element]);
        });
        resolve(JSON.parse(JSON.stringify(resp)));
      })
      .catch(err => {
        // failed to retrieve payslips
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log('method: dbPayslip.retrievePayslip()');
        crashlytics().log('summary: unable to retrieve payslip');
        crashlytics().recordError(err);
        reject({
          message: 'unable to retrieve payslip',
          error: err,
        });
      });
  });
};

export const clearAllPayslip = () => {
  return new Promise((resolve, reject) => {
    dbPayslip
      .resetPayslip()
      .then(resp => {
        // all payslips removed
        dbPayslip
          .resetComparedPayslip()
          .then(resp => {
            // all compared payslips removed
            resolve();
          })
          .catch(err => {
            // compared payslip reset error
            // firebase crashlytics (crash report)
            crashlytics().log('source: payslip.service.js');
            crashlytics().log('method: dbPayslip.resetComparedPayslip()');
            crashlytics().log('summary: unable to reset compared payslip');
            crashlytics().recordError(err);
            reject({
              message: 'unable to reset compared payslip',
              error: err,
            });
          });
      })
      .catch(err => {
        // payslip reset error
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log('method: dbPayslip.resetPayslip()');
        crashlytics().log('summary: unable to reset payslip');
        crashlytics().recordError(err);
        reject({
          message: 'unable to reset payslip',
          error: err,
        });
      });
  });
};

// compared payslip
export const retrieveComparedPayslips = () => {
  return new Promise((resolve, reject) => {
    dbPayslip
      .retrieveComparedPayslip()
      .then(resp => {
        // success retrieving compared payslips
        let payslipsComparedObj = JSON.parse(JSON.stringify(resp));
        let newPayslipsCompared = [];
        Object.keys(payslipsComparedObj).forEach(element => {
          newPayslipsCompared.push(payslipsComparedObj[element]);
        });
        // Sort payslips in descending order
        const sortedPayslipsDSC = newPayslipsCompared.slice().sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime())

        store.dispatch(Actions.populate_payslips(sortedPayslipsDSC)); // populate in flatview for visualization
        resolve(JSON.parse(JSON.stringify(resp)));
      })
      .catch(err => {
        // failed to retrieve compared payslip
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log('method: dbPayslip.retrieveComparedPayslip()');
        crashlytics().log('summary: unable to retrieve compared payslip');
        crashlytics().recordError(err);
        reject({
          message: 'unable to retrieve compared payslip',
          error: err,
        });
      });
  });
};

export const removeSingleComparedPayslip = comparedPayslip => {
  return new Promise((resolve, reject) => {
    dbPayslip
      .removeSinglePayslip(comparedPayslip.refPayslip)
      .then(() => {
        // payslip removed
        dbPayslip
          .removeSingleComparedPayslip(comparedPayslip._id)
          .then(() => {
            // compared payslip removed
            resolve();
          })
          .catch(err => {
            // failed to remove compared payslip
            // firebase crashlytics (crash report)
            crashlytics().log('source: payslip.service.js');
            crashlytics().log(
              'method: dbPayslip.removeSingleComparedPayslip(comparedPayslip._id)',
            );
            crashlytics().log(
              'summary: unable to remove single compared payslip',
            );
            crashlytics().recordError(err);
            reject({
              message: 'unable to remove single compared payslip',
              error: err,
            });
          });
      })
      .catch(err => {
        // failed to remove payslip
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log(
          'method: dbPayslip.removeSinglePayslip(comparedPayslip.refPayslip)',
        );
        crashlytics().log('summary: unable to remove single payslip');
        crashlytics().recordError(err);
        reject({
          message: 'unable to remove single payslip',
          error: err,
        });
      });
  });
};

const generateUUID = () => {
  return new Promise((resolve, reject) => {
    UUIDGenerator.getRandomUUID()
      .then(uuid => {
        resolve(uuid);
      })
      .catch(err => {
        // failed to generate UUID
        // firebase crashlytics (crash report)
        crashlytics().log('source: payslip.service.js');
        crashlytics().log('method: UUIDGenerator.getRandomUUID()');
        crashlytics().log('summary: unable to generate UUID');
        crashlytics().recordError(err);
        reject(err);
      });
  });
};
