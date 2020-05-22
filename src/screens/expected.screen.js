import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

// styles
import commonStyles from '../styles/common.style';
import componentStyles from '../styles/component.style';

// redux
import {store} from '../redux/store';
import {connect} from 'react-redux';

// component
import PayslipCard from '../components/payslipCard.component';

class ExpectedScreen extends PureComponent {
  onPress = payslip => {
    console.log(payslip._id);
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <FlatList
          style={componentStyles.cardContentContainer}
          data={store.getState().ManualPayslip.payslips}
          renderItem={({item}) => (
            <PayslipCard onPress={this.onPress} payslip={item} />
          )}
          keyExtractor={item => item._id.toString()}
          extraData={this.props.payslips}
        />
      </View>
    );
  }
}

const stp = store => {
  let {ManualPayslip} = store;

  return {
    payslips: ManualPayslip.payslips,
  };
};

export default connect(stp)(ExpectedScreen);
