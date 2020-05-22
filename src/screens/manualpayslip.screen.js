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

// service
import * as service from '../services/manualpayslip.service';

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

  onCalculatePaylip = () => {
    let data = {
      rank: this.state.rankPaySelected,
      month: this.state.monthSelected,
      mealAllowance: this.state.MealAmount,
      deductionAmount: this.state.deductionAmount,
      claimAmount: this.state.claimAmount,
    };

    service
      .calculatePayslip(data)
      .then(resp => {
        console.log('calculated');
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onClearPaylip = () => {
    service
      .clearAllPayslip()
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
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
        style={styles.keyboard}>
        <View style={commonStyles.container}>
          {/* Top header */}
          <View style={styles.topContainer}>
            <View>
              <Text style={styles.title}>
                {stringResource.formHeaders.manual_mainHeader}
              </Text>
            </View>
          </View>
          {/* Middle content */}
          <View style={styles.middleContainer}>
            <View style={styles.horizontalFlexContainer_one}>
              {/* Rank section */}
              <View style={styles.horizontalFlexSubContainer_one}>
                <Text style={styles.inputHeader}>
                  {stringResource.formHeaders.manual_sub_headers[0]}
                </Text>
                <Picker
                  mode={'dropdown'}
                  style={styles.picker}
                  selectedValue={this.state.rankPaySelected}
                  onValueChange={(rankValue, rankIndex) =>
                    this.onRankValueChange(rankValue, rankIndex)
                  }>
                  {rankItems}
                </Picker>
              </View>
              {/* Month section */}
              <View style={styles.horizontalFlexSubContainer_two}>
                <Text style={styles.inputHeader}>
                  {stringResource.formHeaders.manual_sub_headers[1]}
                </Text>
                <Picker
                  mode={'dropdown'}
                  style={styles.picker}
                  selectedValue={this.state.monthSelected}
                  onValueChange={this.onMonthValueChange.bind(this)}>
                  {monthItems}
                </Picker>
              </View>
            </View>
            {/* Meal allowance section */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.manual_sub_headers[2]}
              </Text>
              <View style={styles.horizontalFlexContainer_two}>
                <View style={styles.inputText}>
                  <TextInput
                    keyboardType={'number-pad'}
                    placeholder={
                      stringResource.formHeaders.manual_sub_placeholder[2]
                    }
                    onChangeText={name => this.onMealValueChange(name)}
                    ref={input => {
                      this.meal = input;
                    }}
                  />
                </View>
                {/* operator */}
                <View style={styles.operator}>
                  <Text>X</Text>
                </View>
                {/* multiplier */}
                <View style={styles.inputLabelAndOrComputation}>
                  <Text>5</Text>
                </View>
                {/* operator */}
                <View style={styles.operator}>
                  <Text>=</Text>
                </View>
                {/* computation */}
                <View style={styles.inputLabelAndOrComputation}>
                  <Text>{this.state.MealAmount}</Text>
                </View>
              </View>
            </View>
            {/* Deduction section */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.manual_sub_headers[3]}
              </Text>
              <View style={styles.inputFullText}>
                <TextInput
                  keyboardType={'numeric'}
                  placeholder={
                    stringResource.formHeaders.manual_sub_placeholder[3]
                  }
                  onChangeText={name => this.onDeductionValueChange(name)}
                  ref={input => {
                    this.deduction = input;
                  }}
                />
              </View>
            </View>
            {/* Claim/others section */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.manual_sub_headers[4]}
              </Text>
              <View style={styles.inputFullText}>
                <TextInput
                  keyboardType={'numeric'}
                  placeholder={
                    stringResource.formHeaders.manual_sub_placeholder[4]
                  }
                  onChangeText={name => this.onClaimValueChange(name)}
                  ref={input => {
                    this.claim = input;
                  }}
                />
              </View>
            </View>
            {/* button - calculate payslip */}
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.onCalculatePaylip()}>
                <Text style={styles.btnText}>
                  {stringResource.formHeaders.manual_buttons[0]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.button}
              onPress={() => this.onClearPaylip()}>
              <Text style={styles.btnText}>Clear all Payslips</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ManualPayslipScreen;
