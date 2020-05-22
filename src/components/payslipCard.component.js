import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// styles
import styles from '../styles/component.style';

class PayslipCard extends Component {
  render() {
    let {onPress, payslip} = this.props;

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => onPress(payslip)}>
        <View style={styles.cardContent}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={styles.labelContainer}>
              {/* label */}
              <Text style={styles.cardDetailsText}>Month: </Text>
              <Text style={styles.cardDetailsText}>Basic Salary: </Text>
              <Text style={styles.cardDetailsText}>Other Allowance: </Text>
              <Text style={styles.cardDetailsText}>Gross Allowance: </Text>
              <Text style={styles.cardDetailsText}>Total Deduction: </Text>
              <Text style={styles.cardDetailsText}>Claim/Others: </Text>
              <Text style={styles.cardDetailsText}>Net Salary: </Text>
            </View>
            <View
              style={styles.valueContainer}>
              {/* value */}
              <Text>{payslip.month}</Text>
              <Text>${payslip.basicSalary}</Text>
              <Text>${payslip.otherAllowance}</Text>
              <Text>${payslip.grossSalary}</Text>
              <Text>${payslip.deduction}</Text>
              <Text>${payslip.claimAndOthers}</Text>
              <Text>${payslip.netSalary}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default PayslipCard;
