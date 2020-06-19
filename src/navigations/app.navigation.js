import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Text, Platform, Image} from 'react-native';
// nested nav
import DrawerNav from './drawer.navigation';
import {DrawerActions} from '@react-navigation/native';
// screen
import PayslipScreen from '../screens/payslip.screen';
import PayslipContScreen from '../screens/payslip.cont.screen';
// setting screens
import AppInfoScreen from '../screens/appinfo.screen';
import HowItWorkScreen from '../screens/howitwork.screen';
import ContactUsScreen from '../screens/contactus.screen';
// Icons
import {Icon} from 'react-native-elements';
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
          if (route.state === undefined || route.state.index === 0) {
            return homeOptions(navigation, route.state);
          } else {
            return defaultOptions(navigation, route.state);
          }
        }}
      />
      <Stack.Screen
        name="AddPayslip"
        component={PayslipScreen}
        options={{
          headerBackTitle: 'Home',
        }}
      />
      <Stack.Screen
        name="AddPayslipCont"
        component={PayslipContScreen}
        options={{
          title: '',
        }}
      />
      {/* Settings related screens */}
      <Stack.Screen
        name="AppInfo"
        component={AppInfoScreen}
        options={{
          headerBackTitle: 'Settings',
          title: 'Application Info'
        }}
      />
      <Stack.Screen
        name="How it Work?"
        component={HowItWorkScreen}
        options={{
          headerBackTitle: 'Settings'
        }}
      />
      <Stack.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          headerBackTitle: 'Settings'
        }}
      />
    </Stack.Navigator>
  );
}

const homeOptions = (navigation, routeState) => ({
  headerTitle: () => (
    <View style={[styles.headerTitleAlignment, {flexDirection: 'row'}]}>
      <Image
        style={Platform.OS == 'ios' ? styles.ImgIOS : styles.Img}
        source={TextLogo}
      />
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
  ),
});

const defaultOptions = (navigation, routeState) => ({
  headerTitle: routeState.routeNames[routeState.index],
  headerLeft: () => (
    <TouchableOpacity
      style={
        Platform.OS == 'ios'
          ? [styles.headerComponent, styles.headerDefaultAlignmentIOS]
          : [styles.headerComponent, styles.headerDefaultAlignment]
      }
      onPress={() => navigation.navigate('Home')}>
      <Icon
        type="ionicon"
        name={Platform.OS == 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
        size={25}
        color={Platform.OS == 'ios' ? 'blue' : 'black'}
      />
      {Platform.OS == 'ios' ? (
        <Text style={styles.headerDefaultTextAlignmenyIOS}>Home</Text>
      ) : null}
    </TouchableOpacity>
  ),
  headerRight: () => <View style={styles.headerIconComponent} />,
});

export default AppStack;
