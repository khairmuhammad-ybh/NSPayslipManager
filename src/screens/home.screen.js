import React, {Component} from 'react';
import {View, Text, FlatList, RefreshControl, Alert} from 'react-native';
// styles
import commonStyles from '../styles/common.style';
import componentStyles from '../styles/component.style';
// service
import * as servicePayslip from '../services/payslip.service';
// redux
import {store} from '../redux/store';
import {connect} from 'react-redux';
// components
import PayslipCard from '../components/payslipcard.component';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
    };
    this.getData();
  }

  getData() {
    servicePayslip
      .retrieveComparedPayslips()
      .then(resp => {
        // success data fetch and store inside redux
        // console.log(resp)
        this.setState({
          refreshing: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onRefresh = () => {
    this.getData();
  };

  onPress = payslip => {
    // console.log(payslip._id)
  };

  render() {
    return (
      <FlatList
        style={componentStyles.cardContentContainer}
        data={store.getState().Payslip.payslips}
        renderItem={({item, index}) => (
          <PayslipCard onPress={this.onPress} payslip={item} index={index} />
        )}
        keyExtractor={item => item._id.toString()}
        extraData={this.props.payslips}
        refreshControl={
          <RefreshControl
            // refresh control for pull to refresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
    );
  }
}

const stp = store => {
  let {Payslip} = store;

  return {
    payslips: Payslip.payslips,
  };
};

export default connect(stp)(HomeScreen);
