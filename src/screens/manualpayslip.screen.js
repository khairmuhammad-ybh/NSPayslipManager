import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// styles
import styles from '../styles/manualpayslip.style';
import commonStyles from '../styles/common.style';

// components
import {Picker} from '@react-native-community/picker';

// resources
import stringResource from '../resources/string.resource';

// TODO: code cleanup
class ManualPayslipScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankNameSelected: 'SC2',
      rankPaySelected: '600',
      monthSelected: 'Jan',
      deductionAmount: 0,
      claimAmount: 0,
      MealAmount: 0,
    };
  }

  onRankValueChange(rankValue, rankIndex) {
    console.log(
      stringResource.pickersContents.pickerRankContent.ranks[rankIndex],
      rankValue,
    );
    this.setState({
      rankPaySelected: rankValue,
      rankNameSelected:
        stringResource.pickersContents.pickerRankContent.ranks[rankIndex],
    });
  }

  onMonthValueChange(value) {
    this.setState({
      monthSelected: value,
    });
  }

  onDeductionValueChange(value) {
    this.setState({
      deductionAmount: value,
    });
  }

  onClaimValueChange(value) {
    this.setState({
      claimAmount: value,
    });
  }

  onMealValueChange(value) {
    this.setState({
      MealAmount: value * 5,
    });
  }

  onRegisterProfile = () => {
    let user = {
      rank: {
        rankName: this.state.rankNameSelected,
        rankPay: this.state.rankPaySelected,
      },
      monthSelected: this.state.monthSelected,
      deductionAmount: this.state.deductionAmount,
      claimAmount: this.state.claimAmount,
    };
  };

  render() {
    let rankItems = stringResource.pickersContents.pickerRankContent.ranks.map(
      (s, i) => {
        return (
          <Picker.Item
            key={i}
            value={`${
              stringResource.pickersContents.pickerRankContent.allowance[i]
            }`}
            label={`${s}`}
          />
        );
      },
    );

    let monthItems = stringResource.pickersContents.pickerMonthContent.map(
      (s, i) => {
        return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
      },
    );

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={-100}
        style={{flex: 1, flexDirection: 'column'}}>
        <View style={commonStyles.container}>
          {/* Header */}
          <View style={styles.contentHeader}>
            <Text style={styles.headerText}>
              {stringResource.formHeaders.manual_mainHeader}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.horizontalFlexContainer}>
              {/* Rank section */}
              <View style={styles.contentContainer}>
                <Text style={styles.contentHeader}>
                  {stringResource.formHeaders.manual_sub_headers[0]}
                </Text>
                <Picker
                  mode={'dropdown'}
                  style={styles.dropdownInput}
                  selectedValue={this.state.rankPaySelected}
                  onValueChange={(rankValue, rankIndex) =>
                    this.onRankValueChange(rankValue, rankIndex)
                  }>
                  {rankItems}
                </Picker>
              </View>
              {/* Month section */}
              <View style={styles.contentContainer}>
                <Text style={styles.contentHeader}>
                  {stringResource.formHeaders.manual_sub_headers[1]}
                </Text>
                <Picker
                  mode={'dropdown'}
                  style={styles.dropdownInput}
                  selectedValue={this.state.monthSelected}
                  onValueChange={this.onMonthValueChange.bind(this)}>
                  {monthItems}
                </Picker>
              </View>
            </View>
            {/* Meal allowance section */}
            <Text style={styles.contentHeader}>
              {stringResource.formHeaders.manual_sub_headers[2]}
            </Text>
            <View style={styles.horizontalFlexContainer}>
              <View style={[styles.manualMealContent, {flex: 2}]}>
                <TextInput
                  keyboardType={'number-pad'}
                  placeholder={
                    stringResource.formHeaders.manual_sub_placeholder[2]
                  }
                  onChangeText={name => this.onMealValueChange(name)}
                  ref={input => {
                    this.profileName = input;
                  }}
                />
              </View>
              <View style={[styles.manualOperatorContainer]}>
                <Text>X</Text>
              </View>
              <View
                style={[
                  styles.manualMealContent,
                  styles.manualOperatorContainer,
                ]}>
                <Text>5</Text>
              </View>
              <View style={[styles.manualOperatorContainer]}>
                <Text>=</Text>
              </View>
              <View
                style={[
                  styles.manualMealContent,
                  styles.manualOperatorContainer,
                ]}>
                <Text>{this.state.MealAmount}</Text>
              </View>
            </View>
            {/* Deduction section */}
            <View style={styles.contentContainer}>
              <Text style={styles.contentHeader}>
                {stringResource.formHeaders.manual_sub_headers[3]}
              </Text>
              <View style={styles.textInput}>
                <TextInput
                  keyboardType={'numeric'}
                  placeholder={
                    stringResource.formHeaders.manual_sub_placeholder[3]
                  }
                  onChangeText={name => this.onDeductionValueChange(name)}
                  ref={input => {
                    this.profileName = input;
                  }}
                />
              </View>
            </View>
            {/* Claim/others section */}
            <View style={styles.contentContainer}>
              <Text style={styles.contentHeader}>
                {stringResource.formHeaders.manual_sub_headers[4]}
              </Text>
              <View style={styles.textInput}>
                <TextInput
                  keyboardType={'numeric'}
                  placeholder={
                    stringResource.formHeaders.manual_sub_placeholder[4]
                  }
                  onChangeText={name => this.onClaimValueChange(name)}
                  ref={input => {
                    this.profileName = input;
                  }}
                />
              </View>
            </View>
          </View>
          {/* button - calculate payslip */}
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.buttonInput}
              onPress={() => console.log('calcualte payslip')}>
              <Text style={styles.btnText}>
                {stringResource.formHeaders.manual_buttons[0]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ManualPayslipScreen;
