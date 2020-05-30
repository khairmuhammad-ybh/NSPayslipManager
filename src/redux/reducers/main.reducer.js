import {combineReducers} from 'redux';
import NsPayslipComparer from './nspayslipcomparer.reducer';
import ManualPayslip from './manualPayslip.reducer'
// Redux-Persist
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

const NsPayslipComparerPersistConfig = {
  key: 'nspayslipcomparer',
  storage: AsyncStorage,
  whitelist: ['firstLaunch'],
};

export default combineReducers({
  ManualPayslip: ManualPayslip,
  NsPayslipComparer: persistReducer(NsPayslipComparerPersistConfig, NsPayslipComparer),
});