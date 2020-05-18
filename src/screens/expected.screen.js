import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// styles
import commonStyles from '../styles/common.style';

class ExpectedScreen extends PureComponent {
  render() {
    return (
      <View style={commonStyles.container}>
        <Text>ExpectedScreen</Text>
      </View>
    );
  }
}

export default ExpectedScreen;
