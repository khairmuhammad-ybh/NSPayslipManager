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
      rankNameSelected: 'SC2',
      rankPaySelected: '600',
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
      rankNameSelected:
        stringResource.pickersContents.pickerRankContent.ranks[rankIndex],
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
    // dropdown picker - division/unit selection
    let divItems = stringResource.pickersContents.pickerDivContent.units.map(
      (s, i) => {
        return (
          <Picker.Item
            key={i}
            value={`${
              stringResource.pickersContents.pickerDivContent.prefix
            }/${s}`}
            label={`${
              stringResource.pickersContents.pickerDivContent.prefix
            }/${s}`}
          />
        );
      },
    );

    // dropdown picker - troop selection
    let troopItems = stringResource.pickersContents.pickerDivContent.troops.map(
      (s, i) => {
        return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
      },
    );

    // dropdown picker - rank selection
    let rankItems = stringResource.pickersContents.pickerRankContent.ranks.map(
      (s, i) => {
        return (
          <Picker.Item
            key={i}
            value={`${
              stringResource.pickersContents.pickerRankContent.allowance[i]
            }`}
            label={`${s}`}
          />
        );
      },
    );

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={-100}
        style={styles.keyboard}>
        {/* Main container */}
        <View style={commonStyles.container}>
          {/* Top header */}
          <View
            style={styles.topContainer}>
            <Text
              style={styles.title}>
              {stringResource.formHeaders.welcome_mainHeader}
            </Text>
          </View>
          {/* Middle content */}
          <View
            style={styles.middleContainer}>
            {/* Input name */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.welcome_sub_headers[0]}
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder={
                  stringResource.formHeaders.welcome_sub_placeholder[0]
                }
                onChangeText={name => this.onNameChange(name)}
                ref={input => {
                  this.profileName = input;
                }}
              />
            </View>
            {/* Horizontal flex container */}
            <View
              style={styles.horizontalFlexContainer}>
              {/* Content container - division/unit */}
              <View style={styles.horizontalFlexSubContainer_one}>
                <Text style={styles.inputHeader}>
                  {stringResource.formHeaders.welcome_sub_headers[1]}
                </Text>
                <Picker
                  mode={'dropdown'}
                  style={styles.picker}
                  selectedValue={this.state.divSelected}
                  onValueChange={this.onDivValueChange.bind(this)}>
                  {divItems}
                </Picker>
              </View>
              {/* Content container - troop */}
              <View style={styles.horizontalFlexSubContainer_two}>
                <Text style={styles.inputHeader}>
                  {stringResource.formHeaders.welcome_sub_headers[2]}
                </Text>
                <Picker
                  mode={'dropdown'}
                  style={styles.picker}
                  selectedValue={this.state.troopSelected}
                  onValueChange={this.onTroopValueChange.bind(this)}>
                  {troopItems}
                </Picker>
              </View>
            </View>
            {/* Rank */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.welcome_sub_headers[3]}
              </Text>
              <Picker
                mode={'dropdown'}
                style={styles.dropdown}
                selectedValue={this.state.rankPaySelected}
                onValueChange={(rankValue, rankIndex) =>
                  this.onRankValueChange(rankValue, rankIndex)
                }>
                {rankItems}
              </Picker>
            </View>
            {/* Register profile button */}
            {/* button - continue */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onRegisterProfile()}>
              <Text style={styles.btnText}>
                {stringResource.formHeaders.welcome_buttons[0]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default WelcomeScreen;
