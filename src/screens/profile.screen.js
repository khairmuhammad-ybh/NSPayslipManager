import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS,
    Alert
} from 'react-native';
// styles
import commonStyles from '../styles/common.style';
import styles from '../styles/profile.style';
// resources
import stringResource from '../resources/string.resource';
// redux
import { store } from '../redux/store';
// components
import { Picker } from '@react-native-community/picker';
// service
import * as serviceProfile from '../services/profile.service';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedName: store.getState().Profile.name,
            rankPaySelected: stringResource.pickersContents.pickerRankContent.allowance[
                stringResource.pickersContents.pickerRankContent.ranks.indexOf(store.getState().Profile.rank)
            ].toString(),
            rankNameSelected: store.getState().Profile.rank,
            vocationSelected: store.getState().Profile.vocation
        }
    }

    onNameChange(value) {
        this.setState({
            updatedName: value
        })
    }

    onRankValueChangeIOS() {
        let rankItems = stringResource.pickersContents.pickerRankContent.ranks.map(
            (s, i) => {
                return (
                s
                );
            },
        );
        rankItems.push("Cancel")
    
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options : rankItems,
                cancelButtonIndex: rankItems.length - 1
            },
            buttonIndex => {
                this.setState({
                    rankPaySelected: stringResource.pickersContents.pickerRankContent.allowance[buttonIndex].toString(),
                    rankNameSelected:
                        stringResource.pickersContents.pickerRankContent.ranks[buttonIndex],
                });
            }
        )
    }

    onVocationValueChange(value) {
        this.setState({
            vocationSelected: value
        })
    }

    onVocationValueChangeIOS() {
        let vocationItems = stringResource.pickersContents.pickerVocationContent.vocations.map(
            (s) => {
                return s;
            },
        );
        vocationItems.push("Cancel")
        
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options : vocationItems,
                cancelButtonIndex: vocationItems.length - 1
            },
            buttonIndex => {
                this.setState({
                    vocationSelected: stringResource.pickersContents.pickerVocationContent.vocations[buttonIndex],
                });
            }
        )
    }
    
    onUpdateProfile = () => {

        if(this.state.updatedName === store.getState().Profile.name && 
            this.state.rankNameSelected === store.getState().Profile.rank &&
            this.state.vocationSelected === store.getState().Profile.vocation) {
                Alert.alert('Alert', 
                    `No changes made to your profile, you will be redirect to 'Home'`,
                    [
                        {
                            text: 'OK', onPress: () => this.props.navigation.goBack()
                        }
                    ]
                )
        }else {
            let data = {
                name: this.state.updatedName ,
                rank: {
                    rankName: this.state.rankNameSelected,
                    rankPay: this.state.rankPaySelected
                },
                vocation: this.state.vocationSelected
            }
    
            serviceProfile.updateProfile(data).then(resp => {
                // console.log(resp);
                this.props.navigation.goBack()
            })
            .catch(err => {
                console.log(err);
            })
        }  
    }

    render() {

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

        // dropdown picker - vocation selection
        let vocationItems = stringResource.pickersContents.pickerVocationContent.vocations.map(
            (s, i) => {
                return <Picker.Item key={i} value={`${s}`} label={`${s}`} />;
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
                            {stringResource.formHeaders.profile_mainHeaders[0]}
                        </Text>
                    </View>
                    {/* Middle content */}
                    <View
                        style={styles.middleContainer}>
                        {/* Input name */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.profile_sub_headers[0]}
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder={store.getState().Profile.name}
                                onChangeText={name => this.onNameChange(name)}
                            />
                        </View>
                        {/* Rank */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.profile_sub_headers[1]}
                            </Text>
                            {Platform.OS == 'ios' ?
                                <TouchableOpacity style={styles.dropdown} onPress={() => this.onRankValueChangeIOS()}>
                                    <Text>
                                        {this.state.rankNameSelected}
                                    </Text>
                                </TouchableOpacity> :
                                <Picker
                                    mode={'dropdown'}
                                    style={styles.dropdown}
                                    selectedValue={this.state.rankPaySelected}
                                    onValueChange={(rankValue, rankIndex) =>
                                        this.onRankValueChange(rankValue, rankIndex)
                                    }>
                                    {rankItems}
                                </Picker>
                            }
                        </View>
                        {/* Vocation */}
                        <View>
                            <Text style={styles.inputHeader}>
                                {stringResource.formHeaders.profile_sub_headers[2]}
                            </Text>
                            {Platform.OS == 'ios' ? 
                                <TouchableOpacity style={styles.dropdown} onPress={() => this.onVocationValueChangeIOS()}>
                                    <Text>
                                    {this.state.vocationSelected}
                                    </Text>
                                </TouchableOpacity> : 
                                <Picker
                                    mode={'dropdown'}
                                    style={styles.dropdown}
                                    selectedValue={this.state.vocationSelected}
                                    onValueChange={this.onVocationValueChange.bind(this)}>
                                    {vocationItems}
                                </Picker>
                            }
                        </View>
                        {/* Register profile button */}
                        {/* button - continue */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onUpdateProfile()}>
                            <Text style={styles.btnText}>
                                {stringResource.formHeaders.profile_buttons[0]}
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onRetrievePayslips()}>
                    <Text style={styles.btnText}>
                      {stringResource.formHeaders.welcome_buttons[0]}
                    </Text>
                  </TouchableOpacity> */}
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

export default ProfileScreen;