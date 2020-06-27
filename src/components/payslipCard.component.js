import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
// styles
import styles from '../styles/component.style';
// redux
import {store} from '../redux/store';
import * as Actions from '../redux/actions';
// others
import Swipeout from 'react-native-swipeout';
// service
import * as servicePayslip from '../services/payslip.service';

class PayslipCard extends Component {
  constructor() {
    super();
    this.state = {
      rowId: '',
      activeRow: null,
    };
  }

  swipeBtns = [
    {
      text: 'Delete',
      type: 'delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        // delete playslip and template payslip in db
        servicePayslip
          .removeSingleComparedPayslip(
            store.getState().Payslip.payslips[this.state.activeRow],
          )
          .then(() => {
            // succes removed from db
            this.deleteNode(this.state.activeRow);
          })
          .catch(err => {
            Alert.alert(
              'Alert',
              'Something went wrong while deleting payslip, crash report will be send automatically for fix',
              [
                {
                  text: 'OK',
                },
              ],
            );
          });
      },
    },
  ];

  onSwipeOpen(rowId, direction) {
    if (typeof direction !== 'undefined') {
      this.setState({activeRow: rowId});
    }
  }

  removeItem = (items, i) => {
    return items.slice(0, i).concat(items.slice(i + 1, items.length));
  };

  deleteNode = rowIndex => {
    let dataArr = store.getState().Payslip.payslips;
    let filteredData = this.removeItem(dataArr, rowIndex);
    store.dispatch(Actions.populate_payslips(filteredData));
  };

  render() {
    let {onPress, payslip, index} = this.props;

    return (
      <Swipeout
        right={this.swipeBtns}
        close={this.state.activeRow !== index}
        rowID={index}
        sectionId={1}
        autoClose={true}
        onOpen={(secId, rowId, direction) => this.onSwipeOpen(rowId, direction)}
        backgroundColor={'transparent'}>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => onPress(payslip)}>
          <View style={styles.cardContent}>
            <View style={styles.flexContainerRow}>
              <View style={styles.labelContainer}>
                {/* label */}
                <Text style={[styles.cardDetailsText, styles.cardOfTheMonth]}>
                  {payslip.date.month} {payslip.date.year}{' '}
                </Text>
                <Text style={styles.cardDetailsText}>
                  Rank: {payslip.rank.rankName}{' '}
                </Text>
                <Text style={styles.cardDetailsText}>Meal: </Text>
                <Text style={styles.cardDetailsText}>Claim: </Text>
                <Text style={styles.cardDetailsText}>Net Salary: </Text>
              </View>
              <View style={styles.valueContainerMid}>
                {/* value */}
                <Text />
                <Text style={styles.cardDetailsText}>Expected</Text>
                <Text>${payslip.rank.expected}</Text>
                <Text>${payslip.mealAllowance.expected}</Text>
                <Text>${payslip.claimAndOthers.expected}</Text>
                <Text>${payslip.netSalary.expected}</Text>
              </View>
              <View style={styles.valueContainerEnd}>
                {/* value */}
                <Text />
                <Text style={styles.cardDetailsText}>Actual</Text>
                <Text
                  style={
                    parseFloat(payslip.rank.actual) >
                    parseFloat(payslip.rank.expected)
                      ? {color: 'green'}
                      : parseFloat(payslip.rank.actual) ==
                        parseFloat(payslip.rank.expected)
                      ? {color: 'black'}
                      : {color: 'red'}
                  }>
                  ${payslip.rank.actual}
                </Text>
                <Text
                  style={
                    parseFloat(payslip.mealAllowance.actual) >
                    parseFloat(payslip.mealAllowance.expected)
                      ? {color: 'green'}
                      : parseFloat(payslip.mealAllowance.actual) ==
                        parseFloat(payslip.mealAllowance.expected)
                      ? {color: 'black'}
                      : {color: 'red'}
                  }>
                  ${payslip.mealAllowance.actual}
                </Text>
                <Text
                  style={
                    parseFloat(payslip.claimAndOthers.actual) >
                    parseFloat(payslip.claimAndOthers.expected)
                      ? {color: 'green'}
                      : parseFloat(payslip.claimAndOthers.actual) ==
                        parseFloat(payslip.claimAndOthers.expected)
                      ? {color: 'black'}
                      : {color: 'red'}
                  }>
                  ${payslip.claimAndOthers.actual}
                </Text>
                <Text
                  style={
                    parseFloat(payslip.netSalary.actual) >
                    parseFloat(payslip.netSalary.expected)
                      ? {color: 'green'}
                      : parseFloat(payslip.netSalary.actual) ==
                        parseFloat(payslip.netSalary.expected)
                      ? {color: 'black'}
                      : {color: 'red'}
                  }>
                  ${payslip.netSalary.actual}
                </Text>
              </View>
            </View>
            <View style={styles.flexContainerRow}>
              <View style={styles.innerFlexRow1}>
                <Text style={styles.cardDetailsText}>Extra/Less:</Text>
              </View>
              <View style={styles.innerFlexRow2}>
                <Text
                  style={
                    parseFloat(payslip.extraOrLoss) > 0
                      ? {color: 'green'}
                      : parseFloat(payslip.extraOrLoss) == 0
                      ? {color: 'black'}
                      : {color: 'red'}
                  }>
                  ${payslip.extraOrLoss}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}
export default PayslipCard;
