import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import FilePickerManager from 'react-native-file-picker';
// ocr
import RNTesseractOcr from 'react-native-tesseract-ocr';

// styles
import commonStyles from '../styles/common.style';

class OcrCompareScreen extends PureComponent {
  chooseImage = () => {
    ImagePicker.showImagePicker(response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('user cancel image picker');
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error);
      } else {
        const source = {uri: response.path};
        console.log('other: ', source);

        this.ocrImage(response.path);
      }
    });
  };

  chooseFile = () => {
    FilePickerManager.showFilePicker(null, response => {
      console.log('Response : ', response);

      if (response.didCancel) {
        console.log('user cancel file picker');
      } else if (response.error) {
        console.log('FilePickerManager error: ', response.error);
      } else {
        const source = {uri: response.path};
        console.log('other: ', source);

        this.ocrImage(response.path);
      }
    });
  };

  ocrImage = imagePath => {
    const tessOptions = {
      whitelist: null,
      blacklist: null,
    };

    RNTesseractOcr.recognize(imagePath, 'LANG_ENGLISH', tessOptions)
      .then(result => {
        console.log('OCR Result: ', result);
      })
      .catch(err => {
        console.log('OCR Error: ', err);
      });
  };

  render() {
    return (
      <View style={commonStyles.container}>
        {/* <TouchableOpacity onPress={() => this.chooseImage()}>
          <Text>Choose image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.chooseFile()}>
          <Text>Choose file</Text>
        </TouchableOpacity> */}
        <Text>Pending future development</Text>
      </View>
    );
  }
}

export default OcrCompareScreen;
