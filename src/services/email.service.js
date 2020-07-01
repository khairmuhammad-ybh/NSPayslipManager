import {Linking} from 'react-native';
// resources
import stringResource from '../resources/string.resource';

export const sendFeedBack = () => {
  const to = stringResource.contactUs.email;
  const subject = 'NSPSM Feedback';
  return Linking.openURL(`mailto:${to}?subject=${subject}`);
};

export const askQuestion = () => {
  const to = stringResource.contactUs.email;
  const subject = 'NSPSM Questions & Answers';
  return Linking.openURL(`mailto:${to}?subject=${subject}`);
};

export const reportError = () => {
  const to = stringResource.contactUs.email;
  const subject = 'NSPSM Report Error';
  return Linking.openURL(`mailto:${to}?subject=${subject}`);
};
