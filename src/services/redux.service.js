// redux
import {store} from '../redux/store';
import * as Actions from '../redux/actions';
// google-crashlytics
import crashlytics from '@react-native-firebase/crashlytics';

export const resetPayslip = () => {
  return new Promise((resolve, reject) => {
    try {
      store.dispatch(Actions.reset_payslips(''));
      resolve();
    } catch (err) {
      // failed to reset payslip redux
      // firebase crashlytics (crash report)
      crashlytics().log('source: redux.service.js');
      crashlytics().log("method: store.dispatch(Actions.reset_payslips(''))");
      crashlytics().log('summary: [Redux] unable to reset payslip');
      crashlytics().recordError(err);
      reject({
        message: '[Redux] unable to reset payslip',
        error: err,
      });
    }
  });
};

export const userSignOut = () => {
  return new Promise((resolve, reject) => {
    try {
      store.dispatch(Actions.reset_payslips(''));
      store.dispatch(Actions.set_profile({name: '', rank: '', vocation: ''}));
      store.dispatch(Actions.update_first_launch());
      // signout success
      resolve();
    } catch (err) {
      // user signout error (clear user data in redux)
      // firebase crashlytics (crash report)
      crashlytics().log('source: redux.service.js');
      crashlytics().log(
        "method: store.dispatch(Actions.reset_payslips('')), store.dispatch(Actions.set_profile({name: '', rank: '', vocation: ''}))",
      );
      crashlytics().log('summary: [Redux] unable to reset payslip/profile');
      crashlytics().recordError(err);
      reject({
        message: '[Redux] unable to reset payslip/profile',
        error: err,
      });
    }
  });
};
