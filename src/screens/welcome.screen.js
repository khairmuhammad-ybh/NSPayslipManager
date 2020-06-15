import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActionSheetIOS,
  Alert,
} from 'react-native';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/welcome.style';
// components
import {Picker} from '@react-native-community/picker';
import * as pickers from '../components/picker.component';
// resources
import stringResource from '../resources/string.resource';
// redux
import {persistor} from '../redux/store';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divSelected: 'Procom/Alpha', //Procom/Alpha
      troopSelected: 'Alpha', // Alpha
      rankNameSelected: 'SC2', // SC2
      rankPaySelected: '600', // 600
      name: '',
      vocationSelected: 'SLP', // SLP
    };
  }

  onDivValueChange(value) {
    this.setState({
      divSelected: value,
    });
  }

  onDivValueChangeIOS() {
    let divItems = pickers.pickerDivisionIOS();
    divItems.push('Cancel');

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: divItems,
        cancelButtonIndex: divItems.length - 1,
      },
      buttonIndex => {
        if (buttonIndex === divItems.length - 1) {
          // cancel
        } else {
          this.setState({
            divSelected: `${
              stringResource.pickersContents.pickerDivContent.prefix
            }/${
              stringResource.pickersContents.pickerDivContent.units[buttonIndex]
            }`,
          });
        }
      },
    );
  }

  onTroopValueChange(value) {
    this.setState({
      troopSelected: value,
    });
  }

  onTroopValueChangeIOS() {
    let troopItems = pickers.pickerTroopIOS();
    troopItems.push('Cancel');

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: troopItems,
        cancelButtonIndex: troopItems.length - 1,
      },
      buttonIndex => {
        if (buttonIndex === troopItems.length - 1) {
          // cancel
        } else {
          this.setState({
            troopSelected:
              stringResource.pickersContents.pickerDivContent.troops[
                buttonIndex
              ],
          });
        }
      },
    );
  }

  onVocationValueChange(value) {
    this.setState({
      vocationSelected: value,
    });
  }

  onVocationValueChangeIOS() {
    let vocationItems = pickers.pickerVocationIOS();
    vocationItems.push('Cancel');

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: vocationItems,
        cancelButtonIndex: vocationItems.length - 1,
      },
      buttonIndex => {
        if (buttonIndex === vocationItems.length - 1) {
          // cancel
        } else {
          this.setState({
            vocationSelected:
              stringResource.pickersContents.pickerVocationContent.vocations[
                buttonIndex
              ],
          });
        }
      },
    );
  }

  onRankValueChange(rankValue, rankIndex) {
    this.setState({
      rankPaySelected: rankValue,
      rankNameSelected:
        stringResource.pickersContents.pickerRankContent.ranks[rankIndex],
    });
  }

  onRankValueChangeIOS() {
    let rankItems = pickers.pickerRankIOS();
    rankItems.push('Cancel');

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: rankItems,
        cancelButtonIndex: rankItems.length - 1,
      },
      buttonIndex => {
        if (buttonIndex === rankItems.length - 1) {
          // cancel
        } else {
          this.setState({
            rankPaySelected: stringResource.pickersContents.pickerRankContent.allowance[
              buttonIndex
            ].toString(),
            rankNameSelected:
              stringResource.pickersContents.pickerRankContent.ranks[
                buttonIndex
              ],
          });
        }
      },
    );
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
      vocation: this.state.vocationSelected,
    };

    // console.log(user);
    if (this.state.name === '') {
      Alert.alert('Invalid Fields', 'Please enter your name');
    } else {
      this.props.navigation.navigate('WelcomeCont', user);
    }
  };

  render() {
    let divItems = pickers.pickerDivision();
    let troopItems = pickers.pickerTroop();
    let vocationItems = pickers.pickerVocation();
    let rankItems = pickers.pickerRank();

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={-100}
        style={styles.keyboard}>
        {/* Main container */}
        <View style={commonStyles.container}>
          {/* Top header */}
          <View style={styles.topContainer}>
            <Text style={styles.title}>
              {stringResource.formHeaders.welcome_mainHeaders[0]}
            </Text>
          </View>
          {/* Middle content */}
          <View style={styles.middleContainer}>
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
            <View style={styles.horizontalFlexContainer}>
              {/* Content container - division/unit */}
              <View style={styles.horizontalFlexSubContainer_one}>
                <Text style={styles.inputHeader}>
                  {stringResource.formHeaders.welcome_sub_headers[1]}
                </Text>
                {Platform.OS == 'ios' ? (
                  <TouchableOpacity
                    style={styles.picker}
                    onPress={() => this.onDivValueChangeIOS()}>
                    <Text>
                      {this.state.divSelected
                        ? `${this.state.divSelected}`
                        : null}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Picker
                    mode={'dropdown'}
                    style={styles.picker}
                    selectedValue={this.state.divSelected}
                    onValueChange={this.onDivValueChange.bind(this)}>
                    {divItems}
                  </Picker>
                )}
              </View>
              {/* Content container - troop */}
              <View style={styles.horizontalFlexSubContainer_two}>
                <Text style={styles.inputHeader}>
                  {stringResource.formHeaders.welcome_sub_headers[2]}
                </Text>
                {Platform.OS == 'ios' ? (
                  <TouchableOpacity
                    style={styles.picker}
                    onPress={() => this.onTroopValueChangeIOS()}>
                    <Text>{this.state.troopSelected}</Text>
                  </TouchableOpacity>
                ) : (
                  <Picker
                    mode={'dropdown'}
                    style={styles.picker}
                    selectedValue={this.state.troopSelected}
                    onValueChange={this.onTroopValueChange.bind(this)}>
                    {troopItems}
                  </Picker>
                )}
              </View>
            </View>
            {/* Vocation */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.welcome_sub_headers[3]}
              </Text>
              {Platform.OS == 'ios' ? (
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => this.onVocationValueChangeIOS()}>
                  <Text>{this.state.vocationSelected}</Text>
                </TouchableOpacity>
              ) : (
                <Picker
                  mode={'dropdown'}
                  style={styles.dropdown}
                  selectedValue={this.state.vocationSelected}
                  onValueChange={this.onVocationValueChange.bind(this)}>
                  {vocationItems}
                </Picker>
              )}
            </View>
            {/* Rank */}
            <View>
              <Text style={styles.inputHeader}>
                {stringResource.formHeaders.welcome_sub_headers[4]}
              </Text>
              {Platform.OS == 'ios' ? (
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => this.onRankValueChangeIOS()}>
                  <Text>{this.state.rankNameSelected}</Text>
                </TouchableOpacity>
              ) : (
                <Picker
                  mode={'dropdown'}
                  style={styles.dropdown}
                  selectedValue={this.state.rankPaySelected}
                  onValueChange={(rankValue, rankIndex) =>
                    this.onRankValueChange(rankValue, rankIndex)
                  }>
                  {rankItems}
                </Picker>
              )}
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
