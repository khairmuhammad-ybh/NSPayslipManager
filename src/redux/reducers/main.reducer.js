import {combineReducers} from 'redux';
import NSPayslipManager from './nspayslipmanager.reducer';
import Profile from './profile.reducer';
import Payslip from './payslip.reducer';

// Redux-Persist
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

const NSPayslipManagerPersistConfig = {
  key: 'nspayslipmanager',
  storage: AsyncStorage,
  whitelist: ['firstLaunch'],
};

const NSPayslipManagerProfilePersistConfig = {
  key: 'profile',
  storage: AsyncStorage,
  whitelist: ['name', 'rank', 'vocation'],
};

export default combineReducers({
  NSPayslipManager: persistReducer(
    NSPayslipManagerPersistConfig,
    NSPayslipManager,
  ),
  Profile: persistReducer(NSPayslipManagerProfilePersistConfig, Profile),
  Payslip: Payslip,
});
