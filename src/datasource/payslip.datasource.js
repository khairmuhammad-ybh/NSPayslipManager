import Realm from 'realm';
import { payslipTemplateDbOptions, payslipDbOptions, payslipComparedDbOptions} from '../datasource/dbconfig.datasource';
import { payslipTemplateSchema, payslipSchema, payslipComparedSchema} from '../datasource/dbmodel.datasource';

// payslip template (CRUD) functions 
export const calculatePayslipTemplate = newPayslipTemplate => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipTemplateDbOptions)
            .then(realm => {
                let payslipTemplates = realm.objects(payslipTemplateSchema.name);
                let payslips = payslipTemplates.filtered(`timeStamp = \"${newPayslipTemplate.timeStamp}\"`);
                if (payslips > 0) {
                    reject('payslip has been added');
                }
                //   write new payslip profile into database
                realm.write(() => {
                    realm.create(payslipTemplateSchema.name, newPayslipTemplate);
                });
                realm.close();
                resolve(newPayslipTemplate);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const retrievePayslipTemplate = () => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipTemplateDbOptions)
        .then(realm => {
            let allPayslipTemplate = realm.objects(payslipTemplateSchema.name);
            resolve(allPayslipTemplate);
        })
        .catch(err => reject(err));
    });
};

export const resetPayslipTemplate = () => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipTemplateDbOptions)
            .then(realm => {
                realm.write(() => {
                    let allPayslipsTemplate = realm.objects(payslipTemplateSchema.name);
                    realm.delete(allPayslipsTemplate);
                });
    
                let retrievePayslipsTemplate = realm.objects(payslipTemplateSchema.name);
                resolve(retrievePayslipsTemplate);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const recalculatePayslipTemplate = updateData => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipTemplateDbOptions)
            .then(realm => {
                let payslipTemplates = realm.objects(payslipTemplateSchema.name);
                if (payslipTemplates > 0) {
                    reject('payslip has been added');
                }
                // modified payslip template in database
                realm.write(() => {
                    realm.create(payslipTemplateSchema.name, updateData, 'modified');
                });
                realm.close();
                retrievePayslipTemplate()
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => {
                    reject(err)
                })
            })
            .catch(err => {
                reject(err);
            });
    });
};

// Normal payslip (CRUD) functions
export const calculatePayslip = newPayslip => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipDbOptions)
            .then(realm => {
                let allPayslips = realm.objects(payslipSchema.name);
                let payslips = allPayslips.filtered(`timeStamp = \"${newPayslip.timeStamp}\"`);
                if (payslips > 0) {
                    reject('payslip has been added');
                }
                //   write new payslip into database
                realm.write(() => {
                    realm.create(payslipSchema.name, newPayslip);
                });
                realm.close();
                resolve(newPayslip);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const removeSinglePayslip = (_id) => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipDbOptions)
            .then(realm => {
                realm.write(() => {
                    let allPayslips = realm.objects(payslipSchema.name);
                    let filteredPayslip = allPayslips.filtered(`_id = \"${_id}\"`)
                    realm.delete(filteredPayslip);
                });
    
                // let retrievePayslips = realm.objects(payslipSchema.name);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const retrievePayslip = () => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipDbOptions)
        .then(realm => {
            let allPayslips = realm.objects(payslipSchema.name);
            resolve(allPayslips);
        })
        .catch(err => reject(err));
    });
};

export const resetPayslip = () => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipDbOptions)
            .then(realm => {
                realm.write(() => {
                    let allPayslips = realm.objects(payslipSchema.name);
                    realm.delete(allPayslips);
                });
    
                let retrievePayslips = realm.objects(payslipSchema.name);
                resolve(retrievePayslips);
            })
            .catch(err => {
                reject(err);
            });
    });
};

// compared payslip
export const calculateComparedPayslip = newComparedPayslip => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipComparedDbOptions)
            .then(realm => {
                let allComparedPayslips = realm.objects(payslipComparedSchema.name);
                let comparedPayslips = allComparedPayslips.filtered(`timeStamp = \"${newComparedPayslip.timeStamp}\"`);
                if (comparedPayslips > 0) {
                    reject('payslip has been added');
                }
                //   write new compared payslip into database
                realm.write(() => {
                    realm.create(payslipComparedSchema.name, newComparedPayslip);
                });
                realm.close();
                resolve(newComparedPayslip);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const resetComparedPayslip = () => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipComparedDbOptions)
            .then(realm => {
                realm.write(() => {
                    let allComparedPayslips = realm.objects(payslipComparedSchema.name);
                    realm.delete(allComparedPayslips);
                });
    
                let retrieveComparedPayslips = realm.objects(payslipComparedSchema.name);
                resolve(retrieveComparedPayslips);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const removeSingleComparedPayslip = (_id) => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipComparedDbOptions)
            .then(realm => {
                realm.write(() => {
                    let allComparedPayslips = realm.objects(payslipComparedSchema.name);
                    let filteredPayslip = allComparedPayslips.filtered(`_id = \"${_id}\"`)
                    realm.delete(filteredPayslip);
                });
    
                // let retrieveComparedPayslips = realm.objects(payslipComparedSchema.name);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const retrieveComparedPayslip = () => {
    return new Promise((resolve, reject) => {
        Realm.open(payslipComparedDbOptions)
        .then(realm => {
            let allComparedPayslips = realm.objects(payslipComparedSchema.name);
            resolve(allComparedPayslips);
        })
        .catch(err => reject(err));
    });
};