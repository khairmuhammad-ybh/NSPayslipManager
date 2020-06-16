import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/welcome.style';
// resources
import stringResource from '../resources/string.resource';
// services
import * as serviceProfile from '../services/profile.service';
import * as servicePayslip from '../services/payslip.service';

class WelcomeContScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deductionAmount: 1,
    };
  }

  onDeductionAmountChange(value) {
    this.setState({
      deductionAmount: value,
    });
  }

  onRegisterProfile() {
    const user = this.props.route.params;
    let data = {
      rank: user.rank.rankPay,
      mealAllowance: 0,
      deductionAmount: this.state.deductionAmount,
      claimAmount: 0,
    };
    serviceProfile
      .createProfile(user)
      .then(() => {
        // user profile created
        servicePayslip
          .calculatePayslipTemplate(data)
          .then(resp => {
            // payslip template created
          })
          .catch(err => {
            // unable to generate template
            // Alert user due to unable to register profile
            // TODO CLEAR all profile, payslips, compared payslips, payslip template (v1.1 functions)
            this.profileRegisterAlertError();
          });
      })
      .catch(err => {
        // unable to create profile
        // Alert user due to unable to register profile
        // TODO CLEAR all profile, payslips, compared payslips, payslip template (v1.1 functions)
        this.profileRegisterAlertError();
      });
  }

  profileRegisterAlertError = () => {
    Alert.alert('Alert', 'Unable to register profile, please try again later', [
      {
        text: 'OK',
        onPress: () => this.props.navigation.navigate('Welcome'),
      },
    ]);
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={-100}
        style={styles.keyboard}>
        {/* Main container */}
        <View style={commonStyles.container}>
          {/* Top header */}
          <View style={styles.topContainer}>
            <Text style={styles.title}>
              {stringResource.formHeaders.welcome_mainHeaders[1]}
            </Text>
          </View>
          {/* Middle content */}
          <View style={styles.middleContainer}>
            {/* Input name */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.welcome_otherHeaders[0]}
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder={`${
                  stringResource.formHeaders.welcome_otherPlaceholders[0]
                } (Default: $${this.state.deductionAmount})`}
                onChangeText={deductionAmount =>
                  this.onDeductionAmountChange(deductionAmount)
                }
              />
            </View>
            {/* Register profile button */}
            {/* button - continue */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onRegisterProfile()}>
              <Text style={styles.btnText}>
                {stringResource.formHeaders.welcome_buttons[1]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default WelcomeContScreen;
