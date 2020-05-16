import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

// components
import {Picker} from '@react-native-community/picker';

// styles
import styles from '../styles/welcome.style';
import commonStyles from '../styles/common.style';

// resources
import stringResource from '../resources/string.resource';

// database
import * as service from '../services/profile.service';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divSelected: 'key1',
      troopSelected: 'key2',
      rankNameSelected: 'key3',
      rankPaySelected: 'key4',
      name: '',
    };
  }

  onDivValueChange(value) {
    this.setState({
      divSelected: value,
    });
  }

  onTroopValueChange(value) {
    this.setState({
      troopSelected: value,
    });
  }

  onRankValueChange(rankValue, rankIndex) {
    this.setState({
      rankPaySelected: rankValue,
      rankNameSelected: stringResource.pickerRankContent.ranks[rankIndex],
    });
  }

  onNameChange = value => {
    this.setState({
      name: value,
    });
  };

  onRegisterProfile = () => {
    let user = {
      name: this.state.name,
      rank: {
        rankName: this.state.rankNameSelected,
        rankPay: this.state.rankPaySelected,
      },
      divAndUnit: this.state.divSelected,
      troop: this.state.troopSelected,
    };

    // console.log(user);
    service
      .createProfile(user)
      .then(userProfile => {
        console.log('user profile created');
        console.log(userProfile);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onRetrieveProfile = () => {
    service
      .retrieveProfile()
      .then(userProfile => {
        console.log('user profile retrieve');
        console.log(userProfile);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let divItems = stringResource.pickerDivContent.units.map((s, i) => {
      return (
        <Picker.Item
          key={i}
          value={`${stringResource.pickerDivContent.prefix}/${s}`}
          label={`${stringResource.pickerDivContent.prefix}/${s}`}
        />
      );
    });

    let troopItems = stringResource.pickerDivContent.troops.map((s, i) => {
      return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
    });

    let rankItems = stringResource.pickerRankContent.ranks.map((s, i) => {
      return (
        <Picker.Item
          key={i}
          value={`${stringResource.pickerRankContent.allowance[i]}`}
          label={`${s}`}
        />
      );
    });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={-100}
        style={{flex: 1, flexDirection: 'column'}}>
        <View style={commonStyles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {stringResource.welcomeHeader}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentHeader}>
              {stringResource.welcomeContent[0].name}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={stringResource.welcomeContent[0].name}
              onChangeText={name => this.onNameChange(name)}
              ref={input => {
                this.profileName = input;
              }}
            />
          </View>
          <View style={styles.horizontalFlexContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.contentHeader}>
                {stringResource.welcomeContent[1].name}
              </Text>
              <Picker
                mode={'dropdown'}
                style={styles.dropdownInput}
                selectedValue={this.state.divSelected}
                onValueChange={this.onDivValueChange.bind(this)}>
                {divItems}
              </Picker>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentHeader}>
                {stringResource.welcomeContent[2].name}
              </Text>
              <Picker
                mode={'dropdown'}
                style={styles.dropdownInput}
                selectedValue={this.state.troopSelected}
                onValueChange={this.onTroopValueChange.bind(this)}>
                {troopItems}
              </Picker>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentHeader}>
              {stringResource.welcomeContent[3].name}
            </Text>
            <Picker
              mode={'dropdown'}
              style={styles.textInput}
              selectedValue={this.state.rankSelected}
              onValueChange={(rankValue, rankIndex) =>
                this.onRankValueChange(rankValue, rankIndex)
              }>
              {rankItems}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.buttonInput}
            onPress={() => this.onRegisterProfile()}>
            <Text style={styles.btnText}>
              {stringResource.welcomeButtons[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // style={styles.buttonInput}
            onPress={() => this.onRetrieveProfile()}>
            <Text style={styles.btnText}>
              {stringResource.welcomeButtons[0]}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default WelcomeScreen;
