import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// styles
import styles from '../styles/component.style';
// redux
import { store } from '../redux/store';

class PayslipCard extends Component {
  render() {
    let {onPress, payslip} = this.props;
    

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => onPress(payslip)}>
        <View style={styles.cardContent}>
            <View style={styles.flexContainerRow}>
                <View
                    style={styles.labelContainer}>
                    {/* label */}
                    <Text style={[styles.cardDetailsText, styles.cardOfTheMonth]}>{payslip.month} </Text>
                    <Text style={styles.cardDetailsText}>Rank: {store.getState().Profile.rank} </Text>
                    <Text style={styles.cardDetailsText}>Meal: </Text>
                    <Text style={styles.cardDetailsText}>Claim/Others: </Text>
                    <Text style={styles.cardDetailsText}>Net Salary: </Text>
                </View>
                <View
                    style={styles.valueContainerMid}>
                    {/* value */}
                    <Text></Text>
                    <Text style={styles.cardDetailsText}>Expected</Text>
                    <Text>${payslip.rank.expected}</Text>
                    <Text>${payslip.mealAllowance.expected}</Text>
                    <Text>${payslip.claimAndOthers.expected}</Text>
                    <Text>${payslip.netSalary.expected}</Text>
                </View>
                <View
                    style={styles.valueContainerEnd}>
                    {/* value */}
                    <Text></Text>
                    <Text style={styles.cardDetailsText}>Actual</Text>
                    <Text 
                        style={parseFloat(payslip.rank.actual) > parseFloat(payslip.rank.expected) ? 
                            {color: 'green'} : 
                            parseFloat(payslip.rank.actual) == parseFloat(payslip.rank.expected) ? 
                            {color: 'black'} : 
                            {color: 'red'}}>
                        ${payslip.rank.actual}
                    </Text>
                    <Text style={parseFloat(payslip.mealAllowance.actual) > parseFloat(payslip.mealAllowance.expected) ? {color: 'green'} : {color: 'red'}}>${payslip.mealAllowance.actual}</Text>
                    <Text 
                        style={parseFloat(payslip.claimAndOthers.actual) > parseFloat(payslip.claimAndOthers.expected) ? 
                            {color: 'green'} : 
                            parseFloat(payslip.claimAndOthers.actual) == parseFloat(payslip.claimAndOthers.expected) ? 
                            {color: 'black'} :
                            {color: 'red'}}>
                        ${payslip.claimAndOthers.actual}
                    </Text>
                    <Text style={parseFloat(payslip.netSalary.actual) > parseFloat(payslip.netSalary.expected) ? {color: 'green'} : {color: 'red'}}>${payslip.netSalary.actual}</Text>
                </View>
            </View>
            <View style={styles.flexContainerRow}>
                <View style={styles.innerFlexRow1}>
                    <Text style={styles.cardDetailsText}>Extra/Less:</Text>
                </View>
                <View style={styles.innerFlexRow2}>
                    <Text 
                        style={parseFloat(payslip.extraOrLoss) > 0 ? 
                            {color: 'green'} : 
                            parseFloat(payslip.extraOrLoss) == 0 ? 
                            {color: 'black'} : 
                            {color: 'red'}}>
                        ${payslip.extraOrLoss}
                    </Text>
                </View>
            </View>
        </View>
          
      </TouchableOpacity>
    );
  }
}
export default PayslipCard;
