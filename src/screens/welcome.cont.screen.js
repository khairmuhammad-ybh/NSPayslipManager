import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/welcome.style';
import payslipStyles from '../styles/payslip.style';
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
    if (value == '') {
      this.setState({
        deductionAmount: 1,
      });
    } else {
      this.setState({
        deductionAmount: value,
      });
    }
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
      <KeyboardAwareScrollView
        contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
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
            {/* Input total deduction */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.welcome_otherHeaders[0]}
              </Text>
              <View
                style={
                  Platform.OS == 'ios'
                    ? [
                        payslipStyles.inputFullTextIOS,
                        payslipStyles.inputTooltip,
                      ]
                    : [payslipStyles.inputFullText, payslipStyles.inputTooltip]
                }>
                <Text style={payslipStyles.currencySymbol}>$</Text>
                <TextInput
                  style={
                    Platform.OS == 'ios'
                      ? [payslipStyles.textStyleIOS, payslipStyles.inputStyles]
                      : payslipStyles.inputStyles
                  }
                  keyboardType={'number-pad'}
                  placeholder={`${
                    stringResource.formHeaders.welcome_otherPlaceholders[0]
                  } (Default: $${this.state.deductionAmount})`}
                  onChangeText={deductionAmount =>
                    this.onDeductionAmountChange(deductionAmount)
                  }
                />
              </View>
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
      </KeyboardAwareScrollView>
    );
  }
}

export default WelcomeContScreen;
