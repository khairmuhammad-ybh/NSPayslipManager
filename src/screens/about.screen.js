import React, {Component} from 'react';
import {View, Image, Text, Linking} from 'react-native';
// Image resources
import fullLogo from '../assets/FullLogo_H.png';
import howItWork_basic from '../assets/how_it_work_one.png';
import howItWork_net from '../assets/how_it_work_two.png';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/about.style';
// resources
import stringResource from '../resources/string.resource';

class AboutScreen extends Component {
  render() {
    return (
      <View style={[commonStyles.container, styles.aboutMainContainer]}>
        {/* Header */}
        <View style={styles.topContainer}>
          <Image style={styles.Img} source={fullLogo} />
        </View>
        {/* Middle container */}
        <View style={styles.middleContainer}>
          <View>
            <Text style={styles.title}>
              {stringResource.aboutContent.disclaimer.title}
            </Text>
            <Text style={styles.content}>
              {stringResource.aboutContent.disclaimer.content}
            </Text>
          </View>
          {/* how it works */}
          <View>
            <Text style={styles.title}>How to calculate</Text>
            <Image style={styles.Img} source={howItWork_basic} />
            <Image style={styles.Img} source={howItWork_net} />
          </View>
        </View>
        {/* Footer container */}
        <View style={styles.footerContainer}>
          <View>
            {/* developed by */}
            <Text style={styles.footerTitle}>
              Developed by:{' '}
              <Text
                style={styles.footerLink}
                onPress={() =>
                  Linking.openURL('https://github.com/khairmuhammad-ybh')
                }>
                {stringResource.applicationInfo.developer}
              </Text>
            </Text>
            {/* project on github */}
            <Text style={styles.footerTitle}>
              Project on Github:{' '}
              <Text
                style={styles.footerLink}
                onPress={() =>
                  Linking.openURL(
                    'https://github.com/khairmuhammad-ybh/NSPayslipManager',
                  )
                }>
                {stringResource.applicationInfo.github}
              </Text>
            </Text>
            {/* Version number */}
            <Text style={styles.footerTitle}>
              Version:
              <Text style={styles.footerNormalText}>
                {stringResource.applicationInfo.version}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AboutScreen;
