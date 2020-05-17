import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import ImagePicker from 'react-native-image-picker';

// styles
import commonStyles from '../styles/common.style';

class CompareScreen extends PureComponent {
  chooseImage = () => {
    ImagePicker.showImagePicker(response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('user cancel image picker');
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error);
      } else {
        const source = {uri: response.uri};
        console.log('other: ', source);
      }
    });
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <TouchableOpacity onPress={() => this.chooseImage()}>
          <Text>Choose image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CompareScreen;
