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
import styles from '../styles/welcome.style';
// resources
import stringResource from '../resources/string.resource';
// service
import * as servicePayslip from '../services/payslip.service';

class PayslipContScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealAmount: ''
        }
    }

    onMealAmountChange(value){
        this.setState({
            mealAmount: value
        })
    }

    onCalculatePayslip(){
        const data = this.props.route.params
        // console.log(`calculate payslip: ${this.state.mealAmount}`)
        // console.log(data)
        // this.props.navigation.navigate('Home')
      
        // recalculate payslip template
        servicePayslip.recalculatePayslipTemplate({mealAllowance: this.state.mealAmount}).then(resp => {
                let expectedPayslip = resp
                // calculate payslip
                servicePayslip.calculatePayslip(data, expectedPayslip).then(resp => {
                        this.props.navigation.navigate('Home')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                    <View
                        style={styles.topContainer}>
                        <Text
                            style={styles.title}>
                            {stringResource.formHeaders.payslip_mainHeader[1]}
                        </Text>
                    </View>
                    {/* Middle content */}
                    <View
                        style={styles.middleContainer}>
                        {/* Input name */}
                        <View>
                            <Text style={styles.inputHeader}>
                            {stringResource.formHeaders.payslip_subHeaders[5]}
                            </Text>
                            <TextInput
                            style={styles.inputText}
                            placeholder={
                                `Total ${stringResource.formHeaders.payslip_subHeaders[5].toLowerCase()}`
                            }
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
                        {/* <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onRetrievePayslips()}>
                            <Text style={styles.btnText}>
                            {stringResource.formHeaders.welcome_buttons[0]}
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

export default PayslipContScreen;