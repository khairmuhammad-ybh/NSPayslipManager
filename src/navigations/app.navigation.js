import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Text, Platform, Image} from 'react-native';
// nested nav
import DrawerNav from './drawer.navigation';
import { DrawerActions } from '@react-navigation/native';
// screen
import PayslipScreen from '../screens/payslip.screen';
import PayslipContScreen from '../screens/payslip.cont.screen';
// Icons
import { Icon } from 'react-native-elements';
// styles
import styles from '../styles/nav.header.style';
// resources
import stringResource from '../resources/string.resource';
// image resource
import TextLogo from '../assets/TextLogo.png';

const Stack = createStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Drawer"
                component={DrawerNav}
                options={({navigation, route}) => {
                    if(route.state === undefined || route.state.index === 0) {
                        return homeOptions(navigation, route.state);
                    } else {
                        return defaultOptions(navigation, route.state);
                    }
                }}
            />
            <Stack.Screen name="AddPayslip" component={PayslipScreen} options={{
                headerBackTitle: 'Home'
            }}/>
            <Stack.Screen name="AddPayslipCont" component={PayslipContScreen} 
                options={{
                    title: ''
                }}/>
        </Stack.Navigator>
    )
}

const homeOptions = (navigation, routeState) => ({
    headerTitle: () => (
        <View style={[styles.headerTitleAlignment, {flexDirection: 'row'}]}>
            {/* <Text style={styles.headerTitle}>
                {stringResource.applicationInfo.applicationName}
                <Text style={styles.headerTitleVersion}>v{stringResource.applicationInfo.version}</Text>
            </Text> */}
            <Image style={Platform.OS == 'ios' ? styles.ImgIOS : styles.Img} source={TextLogo} />
            {/* <Text style={Platform.OS == 'ios' ? styles.headerTitleVersionIOS : styles.headerTitleVersion}>v{stringResource.applicationInfo.version}</Text> */}
        </View>
    ),
    headerLeft: () => (
        <View style={styles.headerIconComponent}>
            <Icon
                type="ionicon"
                name={Platform.OS == 'ios' ? 'ios-menu' : 'md-menu'}
                size={25}
                color="black"
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
        </View>
    ),
    headerRight: () => (
        <View style={styles.headerIconComponent}>
            <Icon
                type="antdesign"
                name={'addfile'}
                size={25}
                color="black"
                onPress={() => navigation.navigate('AddPayslip')}
            />
        </View>
    )
})

const defaultOptions = (navigation, routeState) => ({
    headerTitle: () => (
        <View style={styles.headerTitleAlignment}>
            <Text style={styles.headerTitle}>
                {routeState.routeNames[routeState.index]}
            </Text>
        </View>
    ),
    headerLeft: () => (
        <TouchableOpacity 
            style={
                Platform.OS == 'ios' ? 
                    [styles.headerComponent, styles.headerDefaultAlignmentIOS] 
                    : [styles.headerComponent, styles.headerDefaultAlignment]
                }
            onPress={() => navigation.navigate('Home')}
            >
            <Icon
                type="ionicon"
                name={Platform.OS == 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                size={25}
                color={Platform.OS == 'ios' ? "blue" : "black"}
            />
            {Platform.OS == 'ios' ? 
                <Text style={styles.headerDefaultTextAlignmenyIOS}>Home</Text>
                :
                null 
            }
            
    </TouchableOpacity>
    ),
    headerRight: () => (
        <View style={styles.headerIconComponent}>
            
        </View>
    )
})

export default AppStack;