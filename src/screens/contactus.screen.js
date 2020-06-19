import React, {Component} from 'react';
import {View, Text} from 'react-native';
// styles
import styles from '../styles/setting.styles';
import {Icon} from 'react-native-elements';
// resources
import stringResource from '../resources/string.resource';
// services
import * as emailService from '../services/email.service';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ContactUsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Send Feedback */}
        <TouchableOpacity
          style={styles.flexContainer}
          onPress={() => emailService.sendFeedBack()}>
          <View style={styles.iconContainer}>
            <Icon type="material" name={'feedback'} size={40} color="black" />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.contactUs.options[0]}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Ask Question */}
        <TouchableOpacity
          style={styles.flexContainer}
          onPress={() => emailService.askQuestion()}>
          <View style={styles.iconContainer}>
            <Icon
              type="material"
              name={'question-answer'}
              size={40}
              color="black"
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.contactUs.options[1]}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Report Error */}
        <TouchableOpacity
          style={styles.flexCustomHeight}
          onPress={() => emailService.reportError()}>
          <View style={styles.iconContainer}>
            <Icon
              type="material"
              name={'report-problem'}
              size={50}
              color="black"
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.labelFont}>
              {stringResource.contactUs.options[2]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ContactUsScreen;
