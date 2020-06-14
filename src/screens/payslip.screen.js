import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS,
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/payslip.style';
// component
import { Picker } from '@react-native-community/picker';
// resources
import stringResource from '../resources/string.resource';
import * as pickers from '../components/picker.component';

class PayslipScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankPaySelected: 0,
            monthSelected: stringResource.pickersContents.pickerMonthContent[new Date().getMonth()],
            yearSelected: new Date().getFullYear().toString(),
            deductionAmount: 0,
            claimAmount: 0,
            mealAmount: 0,
        };
    }

    onRankValueChange(rankValue) {
        this.setState({
            rankPaySelected: rankValue,
        });
    }

    onMonthValueChange(value) {
        this.setState({
            monthSelected: value,
        });
    }

    onMonthValueChangeIOS() {
        let monthItems = pickers.pickerMonthIOS()

        monthItems.push("Cancel")

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: monthItems,
                cancelButtonIndex: monthItems.length - 1
            },
            buttonIndex => {
                if (buttonIndex === monthItems.length - 1) {
                    // cancel
                } else {
                    this.setState({
                        monthSelected: stringResource.pickersContents.pickerMonthContent[buttonIndex],
                    });
                }

            }
        )
    }

    onYearValueChange(value) {
        this.setState({
            yearSelected: value,
        });
    }

    onYearValueChangeIOS() {
        let curYear = new Date().getFullYear()
        let prevYear = new Date().getFullYear() - 1
        let nxYear = new Date().getFullYear() + 1
        let years = [prevYear.toString(), curYear.toString(), nxYear.toString()]
        let yearItems = years.map(
            (s) => {
                return s;
            },
        );

        yearItems.push("Cancel")

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: yearItems,
                cancelButtonIndex: yearItems.length - 1
            },
            buttonIndex => {
                if (buttonIndex === yearItems.length - 1) {
                    // cancel
                } else {
                    this.setState({
                        yearSelected: years[buttonIndex],
                    });
                }

            }
        )
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
            mealAmount: value,
        });
    }

    onCalculatePaylip = () => {

        if (this.state.rankPaySelected == 0 || this.state.mealAmount == 0 ||
            this.state.deductionAmount == 0 || this.state.claimAmount == 0) {
            Alert.alert("Incomplete fields", "Please fill up all fields before continue")
        } else {
            let data = {
                rank: this.state.rankPaySelected,
                date: {
                    month: this.state.monthSelected,
                    year: this.state.yearSelected
                },
                mealAllowance: this.state.mealAmount,
                deductionAmount: this.state.deductionAmount,
                claimAmount: this.state.claimAmount,
            };
            this.props.navigation.navigate('AddPayslipCont', data)
        }


    };

    render() {

        let monthItems = pickers.pickerMonth();
        let yearItems = pickers.pickerYear();

        return (
            <KeyboardAwareScrollView contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
                <View style={commonStyles.container}>
                    {/* Top header */}
                    <View style={styles.topContainer}>
                        <View>
                            <Text style={styles.title}>
                                {stringResource.formHeaders.payslip_mainHeader[0]}
                            </Text>
                        </View>
                    </View>
                    {/* Middle content */}
                    <View style={styles.middleContainer}>
                        <View style={styles.horizontalFlexContainer}>
                            {/* Month selection */}
                            <View style={styles.horizontalFlexSubContainer_one}>
                                <Text style={styles.inputHeader}>
                                    {stringResource.formHeaders.payslip_subHeaders[0]}
                                </Text>
                                {Platform.OS == 'ios' ?
                                    <TouchableOpacity style={styles.dropdown} onPress={() => this.onMonthValueChangeIOS()}>
                                        <Text style={Platform.OS == 'ios' ? styles.textStyleIOS : null}>
                                            {this.state.monthSelected}
                                        </Text>
                                    </TouchableOpacity> :
                                    <Picker
                                        mode={'dropdown'}
                                        style={styles.picker}
                                        selectedValue={this.state.monthSelected}
                                        onValueChange={this.onMonthValueChange.bind(this)}>
                                        {monthItems}
                                    </Picker>
                                }
                            </View>

                            <View style={styles.horizontalFlexSubContainer_two}>
                                <Text style={styles.inputHeader}>
                                    {stringResource.formHeaders.payslip_subHeaders[1]}
                                </Text>
                                {Platform.OS == 'ios' ?
                                    <TouchableOpacity style={styles.dropdown} onPress={() => this.onYearValueChangeIOS()}>
                                        <Text style={Platform.OS == 'ios' ? styles.textStyleIOS : null}>
                                            {this.state.yearSelected}
                                        </Text>
                                    </TouchableOpacity> :
                                    <Picker
                                        mode={'dropdown'}
                                        style={styles.picker}
                                        selectedValue={this.state.yearSelected}
                                        onValueChange={this.onYearValueChange.bind(this)}>
                                        {yearItems}
                                    </Picker>
                                }
                            </View>
                        </View>
                        {/* Total rank pay */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[2]}
                            </Text>
                            <View style={Platform.OS == 'ios' ? styles.inputFullTextIOS : styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'number-pad'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[2]}
                                    onChangeText={rankValue => this.onRankValueChange(rankValue)}
                                    ref={input => { this.rank = input; }}
                                    onSubmitEditing={() => {this.meal.focus()}}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>
                        {/* Meal allowance section */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[3]}
                            </Text>
                            <View style={Platform.OS == 'ios' ? styles.inputFullTextIOS : styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'numeric'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[3]}
                                    onChangeText={name => this.onMealValueChange(name)}
                                    ref={input => { this.meal = input; }}
                                    onSubmitEditing={() => {this.deduction.focus()}}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>
                        {/* Deduction section */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[4]}
                            </Text>
                            <View style={Platform.OS == 'ios' ? styles.inputFullTextIOS : styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'numeric'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[4]}
                                    onChangeText={name => this.onDeductionValueChange(name)}
                                    ref={input => { this.deduction = input; }}
                                    onSubmitEditing={() => {this.claim.focus()}}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>
                        {/* Claim/others section */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[5]}
                            </Text>
                            <View style={Platform.OS == 'ios' ? styles.inputFullTextIOS : styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'numeric'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[5]}
                                    onChangeText={name => this.onClaimValueChange(name)}
                                    ref={input => { this.claim = input; }}
                                />
                            </View>
                        </View>
                        {/* button - calculate payslip */}
                        <View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.onCalculatePaylip()}>
                                <Text style={styles.btnText}>
                                    {stringResource.formHeaders.payslip_buttons[0]}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default PayslipScreen;