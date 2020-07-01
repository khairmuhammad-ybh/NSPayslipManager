import React, {Component} from 'react';
import {View, Image, Text, Linking} from 'react-native';
// Image resources
import fullLogo from '../assets/FullLogo_Stack.png';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/appinfo.style';
// resources
import stringResource from '../resources/string.resource';

class AppInfoScreen extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <Image source={fullLogo} />
        <View style={styles.applicationInfo}>
          <Text style={styles.header}>
            Developed by:
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(stringResource.applicationInfo.links.developer)
              }>
              {stringResource.applicationInfo.developer}
            </Text>
          </Text>

          <Text style={styles.header}>
            Project on Github:
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(stringResource.applicationInfo.links.github)
              }>
              {stringResource.applicationInfo.github}
            </Text>
          </Text>

          <Text style={styles.header}>
            Version:
            <Text style={styles.normal}>
              {stringResource.applicationInfo.version}
            </Text>
          </Text>

          {/* <Text
            style={styles.indLink}
            onPress={() =>
              Linking.openURL(stringResource.applicationInfo.links.license)
            }>
            LICENSE
          </Text> */}
        </View>
      </View>
    );
  }
}

export default AppInfoScreen;
