import React, { Component } from 'react';
import { 
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS
} from 'react-native';
// styles
import commonStyles from '../styles/common.style';
// resources
import stringResources from '../resources/string.resource';

class ProfileScreen extends Component {
    render() {
        return (
            <View style={commonStyles.container}>
                <Text>Profile screen</Text>
            </View>
        )
    }
}

export default ProfileScreen;