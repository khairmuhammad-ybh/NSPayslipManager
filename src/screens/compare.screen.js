import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// styles
import commonStyles from '../styles/common.style';

class CompareScreen extends PureComponent {
  render() {
    return (
      <View style={commonStyles.container}>
        <Text>CompareScreen</Text>
      </View>
    );
  }
}

export default CompareScreen;
