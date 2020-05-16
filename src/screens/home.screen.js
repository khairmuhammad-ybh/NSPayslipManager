import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/welcome.style';

// resources
import stringResource from '../resources/string.resource';

// database
import * as service from '../services/profile.service';

class HomeScreen extends Component {
  onRetrieveProfile = () => {
    service
      .deleteProfile()
      .then(userProfile => {
        console.log('user profile retrieve');
        console.log(userProfile);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>HomeScreen</Text>
        <TouchableOpacity
          // style={styles.buttonInput}
          onPress={() => this.onRetrieveProfile()}>
          <Text style={styles.btnText}>{stringResource.welcomeButtons[0]}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default HomeScreen;
