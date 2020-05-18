import React, {Component} from 'react';
import {View, Image, Text, Linking} from 'react-native';

import fullLogo from '../assets/FullLogo_H.png';

// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/about.style';

// string resources
import stringResource from '../resources/string.resource';

// resource images
import howItWork_basic from '../assets/how_it_work_one.png';
import howItWork_net from '../assets/how_it_work_two.png';

class AboutScreen extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.imageLogo} source={fullLogo} />
        </View>
        {/* disclaimer */}
        <View style={styles.contentContainer}>
          <View style={styles.contentSubContainer}>
            <Text style={styles.headerFontStyles}>
              {stringResource.aboutContent.disclaimer.title}
            </Text>
            <Text style={styles.contentFontStyles}>
              {stringResource.aboutContent.disclaimer.content}
            </Text>
          </View>
          {/* how it works */}
          <View style={styles.contentSubContainer}>
            <Text style={styles.headerFontStyles}>How to calculate</Text>
            <Image
              style={styles.contentHowItWorkImg}
              source={howItWork_basic}
            />
            <Image style={styles.contentHowItWorkImg} source={howItWork_net} />
          </View>
          {/* application info */}
          <View style={styles.contentSubContainer}>
            <Text style={[styles.contentFontStyles, {fontWeight: 'bold'}]}>
              Developed by:{' '}
              <Text
                style={styles.hyperlink}
                onPress={() =>
                  Linking.openURL('https://github.com/khairmuhammad-ybh')
                }>
                {stringResource.aboutContent.applicationInfo.developer}
              </Text>
            </Text>
            <Text style={[styles.contentFontStyles, {fontWeight: 'bold'}]}>
              Project on Github:{' '}
              <Text
                style={styles.hyperlink}
                onPress={() =>
                  Linking.openURL(
                    'https://github.com/khairmuhammad-ybh/NSPayslipComparer',
                  )
                }>
                {stringResource.aboutContent.applicationInfo.github}
              </Text>
            </Text>
            <Text style={[styles.contentFontStyles, {fontWeight: 'bold'}]}>
              Version:
              <Text style={{fontWeight: 'normal'}}>
                {stringResource.aboutContent.applicationInfo.version}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default AboutScreen;
