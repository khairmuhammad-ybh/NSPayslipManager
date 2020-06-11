import React, { Component } from 'react';
import { 
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS
} from 'react-native';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/payslip.style';
// component
import { Picker } from '@react-native-community/picker';
// resources
import stringResource from '../resources/string.resource';
// service
import * as servicePayslip from '../services/payslip.service';

class PayslipScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankPaySelected: '600',
            monthSelected: 'Jan',
            deductionAmount: 0,
            claimAmount: 0,
            MealAmount: 0,
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
        let monthItems = stringResource.pickersContents.pickerMonthContent.map(
            (s) => {
                return s;
            },
        );
    
        monthItems.push("Cancel")
    
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options : monthItems,
                cancelButtonIndex: monthItems.length - 1
            },
            buttonIndex => {
                this.setState({
                monthSelected: stringResource.pickersContents.pickerMonthContent[buttonIndex],
                });
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
            MealAmount: value,
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
        this.props.navigation.navigate('AddPayslipCont', data)
        // servicePayslip.calculatePayslip(data).then(resp => {
        //         console.log('calculated');
        //         this.props.navigation.goBack();
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };

    onClearPaylip = () => {
        servicePayslip.clearAllPayslip().then(() => {
                // success remove
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
                                {stringResource.formHeaders.payslip_mainHeader[0]}
                            </Text>
                        </View>
                    </View>
                    {/* Middle content */}
                    <View style={styles.middleContainer}>
                        {/* Month selection */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[0]}
                            </Text>
                            {Platform.OS == 'ios' ? 
                                <TouchableOpacity style={styles.inputFullText}  onPress={() => this.onMonthValueChangeIOS()}>
                                <Text  style={Platform.OS == 'ios' ? styles.textStyleIOS : null}>
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
                        {/* Total rank pay */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[1]}
                            </Text>
                            <View style={styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'number-pad'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[1]}
                                    onChangeText={rankValue => this.onRankValueChange(rankValue)}
                                    ref={input => {this.rank = input;}}
                                />
                            </View>
                        </View>
                        {/* Meal allowance section */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[2]}
                            </Text>
                            <View style={styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'numeric'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[2]}
                                    onChangeText={name => this.onMealValueChange(name)}
                                    ref={input => {this.meal = input;}}
                                />
                            </View>
                        </View>
                        {/* Deduction section */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[3]}
                            </Text>
                            <View style={styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'numeric'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[3]}
                                    onChangeText={name => this.onDeductionValueChange(name)}
                                    ref={input => {this.deduction = input;}}
                                />
                            </View>
                        </View>
                        {/* Claim/others section */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.payslip_subHeaders[4]}
                            </Text>
                            <View style={styles.inputFullText}>
                                <TextInput
                                    style={Platform.OS == 'ios' ? styles.textStyleIOS : null}
                                    keyboardType={'numeric'}
                                    placeholder={stringResource.formHeaders.payslip_subPlaceholder[4]}
                                    onChangeText={name => this.onClaimValueChange(name)}
                                    ref={input => {this.claim = input;}}
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
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.onClearPaylip()}>
                                <Text style={styles.btnText}>
                                    Clear Payslips
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default PayslipScreen;