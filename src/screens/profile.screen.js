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
import * as pickers from '../components/picker.component';
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

    onRankValueChange(rankValue, rankIndex) {
        this.setState({
            rankPaySelected: rankValue,
            rankNameSelected:
                stringResource.pickersContents.pickerRankContent.ranks[rankIndex],
        });
    }

    onRankValueChangeIOS() {
        let rankItems = pickers.pickerRankIOS()
        rankItems.push("Cancel")
    
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options : rankItems,
                cancelButtonIndex: rankItems.length - 1
            },
            buttonIndex => {
                if (buttonIndex === rankItems.length - 1) {
                    // cancel
                }else {
                    this.setState({
                        rankPaySelected: stringResource.pickersContents.pickerRankContent.allowance[buttonIndex].toString(),
                        rankNameSelected:
                            stringResource.pickersContents.pickerRankContent.ranks[buttonIndex],
                    });
                }
            }
        )
    }

    onVocationValueChange(value) {
        this.setState({
            vocationSelected: value
        })
    }

    onVocationValueChangeIOS() {
        let vocationItems = pickers.pickerVocationIOS()
        vocationItems.push("Cancel")
        
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options : vocationItems,
                cancelButtonIndex: vocationItems.length - 1
            },
            buttonIndex => {
                if (buttonIndex === vocationItems.length - 1) {
                    // cancel
                }else {
                    this.setState({
                        vocationSelected: stringResource.pickersContents.pickerVocationContent.vocations[buttonIndex],
                    });
                }
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

        let rankItems = pickers.pickerRank()
        let vocationItems = pickers.pickerVocation()

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