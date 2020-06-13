import { store } from '../redux/store';
import * as Actions from '../redux/actions';
// id generator
import UUIDGenerator from 'react-native-uuid-generator';
// datasource
import * as dbPayslip from '../datasource/payslip.datasource';

// payslip template (CRUD) functions
export const calculatePayslipTemplate = data => {
    return new Promise((resolve, reject) => {
        generateUUID().then(uuid => {
            let dbId = uuid;
            let vocationAllowance = 225;
            let otherAllowance = parseFloat(data.mealAllowance) + vocationAllowance;
            let grossSalary = parseFloat(data.rank) + otherAllowance;
            let totalDeduction = parseFloat(data.deductionAmount) + parseFloat(data.claimAmount);
            let netSalary = parseFloat(grossSalary - totalDeduction);

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
            dbPayslip.calculatePayslipTemplate(newPayslipTemplate).then(resp => {
                // success 
                // update login state in redux
                // console.log(newPayslipTemplate)
                store.dispatch(Actions.update_first_launch());
                resolve(resp);
            })
                .catch(err => {
                    //  error
                    reject(err);
                });
        });
    });
};

export const retrievePayslipTemplate = () => {
    return new Promise((resolve, reject) => {
        dbPayslip.retrievePayslipTemplate().then(resp => {
            // success registered
            // console.log(`total number of payslips' template: ${resp.length}`)  // logging total number of template
            payslipsObj = JSON.parse(JSON.stringify(resp))
            let newPayslips = []
            Object.keys(payslipsObj).forEach(element => {
                newPayslips.push(payslipsObj[element])
            });
            // store.dispatch(Actions.populate_payslips(newPayslips)); // temp populate in flatview for visualization
            resolve(JSON.parse(JSON.stringify(resp)));
        })
            .catch(err => {
                // failed to register
                reject(err);
            });
    });
};

export const clearAllPayslipTemplate = () => {
    return new Promise((resolve, reject) => {
        dbPayslip.resetPayslipTemplate().then(resp => {
            console.log(`all payslips' template removed`)
            console.log(`total number of payslips' template: ${resp.length}`)
            resolve(JSON.parse(JSON.stringify(resp)));
        })
            .catch(err => {
                reject(err);
            });
    });
};

// payslip template recalculation
export const recalculatePayslipTemplate = (data, type) => {
    return new Promise((resolve, reject) => {


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

        dbPayslip.retrievePayslipTemplate().then(resp => {
            // success registered
            // console.log(`total number of payslips' template: ${resp.length}`)  // logging total number of template
            let payslipsObj = JSON.parse(JSON.stringify(resp))
            let _id = payslipsObj[0]._id;

            // update payslip template
            let vocationAllowance = 225;
            let otherAllowance = type == 'add' ? parseFloat(data.mealAllowance) + vocationAllowance : parseFloat(payslipsObj[0].mealAllowance) + vocationAllowance;
            let grossSalary = parseFloat(payslipsObj[0].rank) + otherAllowance;
            let totalDeduction = parseFloat(payslipsObj[0].deduction) + parseFloat(payslipsObj[0].claimAndOthers);
            let netSalary = parseFloat(grossSalary - totalDeduction);

            let updatedPayslipTemplate = {}

            console.log(type)
            
            if(type == 'add') {
                updatedPayslipTemplate = {
                    _id: payslipsObj[0]._id,
                    vocationAllowance: parseFloat(vocationAllowance).toFixed(2),
                    mealAllowance: parseFloat(data.mealAllowance).toFixed(2),
                    otherAllowance: parseFloat(otherAllowance).toFixed(2),
                    grossSalary: parseFloat(grossSalary).toFixed(2),
                    netSalary: parseFloat(netSalary).toFixed(2),
                    timeStamp: formattedDate,
                }
            }else {
                updatedPayslipTemplate = {
                    _id: payslipsObj[0]._id,
                    rank: parseFloat(data.rank.rankPay).toFixed(2),
                    vocationAllowance: parseFloat(vocationAllowance).toFixed(2),
                    otherAllowance: parseFloat(otherAllowance).toFixed(2),
                    grossSalary: parseFloat(grossSalary).toFixed(2),
                    netSalary: parseFloat(netSalary).toFixed(2),
                    timeStamp: formattedDate,
                }
            }

            // console.log(otherAllowance, grossSalary, totalDeduction, netSalary)
            // console.log('retrieve payslip template')
            // console.log(payslipsObj)
            // console.log('updated payslip template')
            // console.log(updatePayslipTemplate)

            dbPayslip.recalculatePayslipTemplate(updatedPayslipTemplate).then(resp => {
                // success 
                // update login state in redux
                // console.log(updatePayslipTemplate)
                let respObj = JSON.parse(JSON.stringify(resp))
                resolve(respObj[0]);
            })
                .catch(err => {
                    //  error
                    reject(err);
                });
            // store.dispatch(Actions.populate_payslips(newPayslips)); // temp populate in flatview for visualization
            // resolve(payslipsObj);

        })
            .catch(err => {
                // failed to register
                reject(err);
            });
    });
};

// Normal payslip functions
export const calculatePayslip = (data, expectedPayslip) => {
    return new Promise((resolve, reject) => {
        generateUUID().then(uuid => {
            let dbId = uuid;
            let vocationAllowance = 225.00;
            let otherAllowance = parseFloat(data.mealAllowance) + vocationAllowance;
            let grossSalary = parseFloat(data.rank) + otherAllowance;
            let totalDeduction = parseFloat(data.deductionAmount) + parseFloat(data.claimAmount);
            let netSalary = parseFloat(grossSalary - totalDeduction);

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

            let newPayslip = {
                _id: dbId,
                rank: parseFloat(data.rank).toFixed(2),
                date: {
                    month: data.date.month,
                    year: data.date.year
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

            // console.log(newManualPayslip);

            dbPayslip.calculatePayslip(newPayslip).then(resp => {
                //  success 
                let actualPayslip = resp

                generateUUID().then(uuid => {
                    let dbId = uuid;
                    let extraOrLoss = parseFloat(actualPayslip.netSalary) - parseFloat(expectedPayslip.netSalary)

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

                    let comparedPayslip = {
                        _id: dbId,
                        date: {
                            month: actualPayslip.date.month,
                            year: actualPayslip.date.year
                        },
                        rank: {
                            rankName: store.getState().Profile.rank,
                            expected: expectedPayslip.rank,
                            actual: actualPayslip.rank
                        },
                        mealAllowance: {
                            expected: expectedPayslip.mealAllowance,
                            actual: actualPayslip.mealAllowance
                        },
                        claimAndOthers: {
                            expected: expectedPayslip.claimAndOthers,
                            actual: actualPayslip.claimAndOthers
                        },
                        netSalary: {
                            expected: expectedPayslip.netSalary,
                            actual: actualPayslip.netSalary
                        },
                        extraOrLoss: parseFloat(extraOrLoss).toFixed(2),
                        refPayslip: actualPayslip._id,
                        timeStamp: formattedDate
                    }

                    dbPayslip.calculateComparedPayslip(comparedPayslip).then(resp => {
                        // success
                        store.dispatch(Actions.update_new_payslip(comparedPayslip));
                        // console.log(`Exptected Payslip`)
                        // console.log(expectedPayslip)
                        // console.log(`Actual Payslip`)
                        // console.log(actualPayslip)
                        // console.log(`Compared Payslip`)
                        // console.log(resp)
                        resolve(comparedPayslip);
                    })
                        .catch(err => {
                            // error
                            reject(err)
                        })
                });
            })
                .catch(err => {
                    //  error
                    reject(err);
                });
        });
    });
};

export const retrievePayslips = () => {
    return new Promise((resolve, reject) => {
        dbPayslip.retrievePayslip().then(resp => {
            // success registered
            // console.log(`total number of payslips' template: ${resp.length}`)  // logging total number of template
            let payslipsObj = JSON.parse(JSON.stringify(resp))
            let newPayslips = []
            Object.keys(payslipsObj).forEach(element => {
                newPayslips.push(payslipsObj[element])
            });
            // store.dispatch(Actions.populate_payslips(newPayslips)); // temp populate in flatview for visualization
            resolve(JSON.parse(JSON.stringify(resp)));
        })
            .catch(err => {
                // failed to register
                reject(err);
            });
    });
};

export const clearAllPayslip = () => {
    return new Promise((resolve, reject) => {
        dbPayslip.resetPayslip().then(resp => {
            console.log(`all payslips removed`)
            console.log(`total number of payslips: ${resp.length}`)
            dbPayslip.resetComparedPayslip().then(resp => {
                console.log(`all compared payslips removed`)
                console.log(`total number of compared payslips: ${resp.length}`)
                resolve()
            })
                .catch(err => {
                    reject(err);
                })
            // resolve(JSON.parse(JSON.stringify(resp)));
        })
            .catch(err => {
                reject(err);
            });
    });
};

// comapared payslip
export const retrieveComparedPayslips = () => {
    return new Promise((resolve, reject) => {
        dbPayslip.retrieveComparedPayslip().then(resp => {
            // success registered
            // console.log(`total number of payslips' template: ${resp.length}`)  // logging total number of template
            let payslipsComparedObj = JSON.parse(JSON.stringify(resp))
            let newPayslipsCompared = []
            Object.keys(payslipsComparedObj).forEach(element => {
                newPayslipsCompared.push(payslipsComparedObj[element])
            });
            store.dispatch(Actions.populate_payslips(newPayslipsCompared)); // temp populate in flatview for visualization
            resolve(JSON.parse(JSON.stringify(resp)));
        })
            .catch(err => {
                // failed to register
                reject(err);
            });
    });
};

export const removeSingleComparedPayslip = (comparedPayslip) => {
    return new Promise((resolve, reject) => {
        dbPayslip.removeSinglePayslip(comparedPayslip.refPayslip).then(() => {
            // payslip removed
            dbPayslip.removeSingleComparedPayslip(comparedPayslip._id).then(() => {
                // comapared payslip removed
                resolve();
            })
                .catch(err => {
                    reject(err);
                })
        })
            .catch(err => {
                reject(err);
            })
    })
}

const generateUUID = () => {
    return new Promise((resolve, reject) => {
        UUIDGenerator.getRandomUUID().then(uuid => {
            resolve(uuid);
        })
            .catch(err => {
                reject(err);
            });
    });
};