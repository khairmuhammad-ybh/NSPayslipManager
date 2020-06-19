import React, {Component} from 'react';
import {View, Text, Linking, TouchableOpacity, Alert} from 'react-native';
// styles
import styles from '../styles/setting.styles';
import {Icon} from 'react-native-elements';
// resources
import stringResource from '../resources/string.resource';

class SettingScreen extends Component {
  termsAndPrivacyAlert = () => {
    Alert.alert('Terms And Privacy Policy', '', [
      {
        text: 'Privacy Policy',
        onPress: () =>
          Linking.openURL(stringResource.applicationInfo.links.privacy_policy),
      },
      {
        text: 'Terms & Condition',
        onPress: () =>
          Linking.openURL(
            stringResource.applicationInfo.links.terms_and_condition,
          ),
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  };
  render() {
    return (
      <View style={styles.container}>
        {/* Contact Us */}
        <TouchableOpacity
          style={styles.flexContainer}
          onPress={() => this.props.navigation.navigate('Contact Us')}>
          <View style={styles.iconContainer}>
            <Icon
              type="ionicon"
              name={Platform.OS == 'ios' ? 'ios-contact' : 'md-contacts'}
              size={40}
              color="black"
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.settingScreen.options[0]}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Terms and Privacy Policy */}
        <TouchableOpacity
          style={styles.flexContainer}
          onPress={() => this.termsAndPrivacyAlert()}>
          <View style={styles.iconContainer}>
            <Icon
              type="material-community"
              name={'file-document'}
              size={40}
              color="black"
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.settingScreen.options[1]}
            </Text>
          </View>
        </TouchableOpacity>
        {/* How it work? */}
        <TouchableOpacity
          style={styles.flexCustomHeight}
          onPress={() => this.props.navigation.navigate('How it Work?')}>
          <View style={styles.iconContainer}>
            <Icon type="fontisto" name={'question'} size={40} color="black" />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.settingScreen.options[2]}
            </Text>
          </View>
        </TouchableOpacity>
        {/* App Info */}
        <TouchableOpacity
          style={styles.flexContainer}
          onPress={() => this.props.navigation.navigate('AppInfo')}>
          <View style={styles.iconContainer}>
            <Icon
              type="ionicon"
              name={
                Platform.OS == 'ios'
                  ? 'ios-information-circle-outline'
                  : 'md-information-circle-outline'
              }
              size={40}
              color="black"
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.settingScreen.options[3]}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Rate Us */}
        {/* <TouchableOpacity style={styles.flexContainer}>
          <View style={styles.iconContainer}>
            <Icon
              type="ionicon"
              name={Platform.OS == 'ios' ? 'ios-star' : 'md-star'}
              size={40}
              color="black"
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.settingScreen.options[4]}
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default SettingScreen;
