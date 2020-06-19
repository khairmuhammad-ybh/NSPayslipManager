import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/welcome.style';
// resources
import stringResource from '../resources/string.resource';
// service
import * as servicePayslip from '../services/payslip.service';

class PayslipContScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealAmount: 0,
    };
  }

  onMealAmountChange(value) {
    this.setState({
      mealAmount: value,
    });
  }

  onCalculatePayslip() {
    const data = this.props.route.params;

    if (this.state.mealAmount == 0) {
      Alert.alert('Incomplete field', 'Please fill up the field provided');
    } else {
      // recalculate payslip template
      servicePayslip
        .recalculatePayslipTemplate(
          {mealAllowance: this.state.mealAmount},
          'add',
        )
        .then(resp => {
          let expectedPayslip = resp;
          // calculate payslip
          servicePayslip
            .calculatePayslip(data, expectedPayslip)
            .then(resp => {
              // success calculate payslip
              this.props.navigation.navigate('Home');
            })
            .catch(err => {
              // duplicate payslip
              // Alert user to remove current payslip, before creating new one
              Alert.alert(
                'Alert',
                `duplicate payslip, please remove the current payslip before adding new one.` +
                  ` You will be redirect back to 'Home'`,
                [
                  {
                    text: 'OK',
                    onPress: () => this.props.navigation.navigate('Home'),
                  },
                ],
              );
            });
        })
        .catch(err => {
          // recalculate payslip template error
          // Alert user to retry input their payslip
          Alert.alert(
            'Alert',
            'Something went wrong in calculating your payslip, please try again',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('AddPayslip'),
              },
            ],
          );
        });
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
        {/* Main container */}
        <View style={commonStyles.container}>
          {/* Top header */}
          <View style={styles.topContainer}>
            <Text style={styles.title}>
              {stringResource.formHeaders.payslip_mainHeader[1]}
            </Text>
          </View>
          {/* Middle content */}
          <View style={styles.middleContainer}>
            {/* Input name */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.payslip_subHeaders[6]}
              </Text>
              <TextInput
                style={styles.inputText}
                keyboardType={'numeric'}
                returnKeyType={'done'}
                placeholder={`Total ${stringResource.formHeaders.payslip_subHeaders[6].toLowerCase()}`}
                onChangeText={mealAmount => this.onMealAmountChange(mealAmount)}
              />
            </View>
            {/* Register profile button */}
            {/* button - continue */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onCalculatePayslip()}>
              <Text style={styles.btnText}>
                {stringResource.formHeaders.payslip_buttons[1]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default PayslipContScreen;
