import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Text} from 'react-native';

// screens
import HomeScreen from '../screens/home.screen';
// import OcrCompareScreen from '../screens/deprecated/ocrcompare.screen';
import ManualPayslipScreen from '../screens/manualpayslip.screen';
import AboutScreen from '../screens/about.screen';

// Icons
import {Icon} from 'react-native-elements';

// styles
import styles from '../styles/nav.header.style';

// database
import * as service from '../services/profile.service';

const Stack = createStackNavigator();

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

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation, route}) => {
          console.log(route.state);
          if (route.state === undefined || route.state.index === 0) {
            return expectedOptions(navigation, route.state);
          } else if (route.state.index === 1) {
            return compareOptions(navigation, route.state);
          }
        }}
      />
      <Stack.Screen name="ManualPayslip" component={ManualPayslipScreen} />
      {/* <Stack.Screen name="OcrCompare" component={OcrCompareScreen} /> */}
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

const expectedOptions = (navigation, routeState) => ({
  headerTitle: () => (
    <TouchableOpacity
      style={{alignSelf: 'center'}}
      onPress={() => onRetrieveProfile()}>
      <Text>NSPayslipComparer v1.0</Text>
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <View style={styles.headerComponent}>
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <Text>About</Text>
      </TouchableOpacity>
    </View>
  ),
  headerRight: () => (
    <View style={styles.headerIconComponent}>
      <Icon
        type="antdesign"
        name={'addfile'}
        size={25}
        color="black"
        onPress={() => navigation.navigate('ManualPayslip')}
      />
    </View>
  ),
});

const compareOptions = (navigation, routeState) => ({
  headerTitle: () => (
    <TouchableOpacity
      style={{alignSelf: 'center'}}
      onPress={() => onRetrieveProfile()}>
      <Text>NSPayslipComparer v1.0</Text>
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <View style={styles.headerComponent}>
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <Text>About</Text>
      </TouchableOpacity>
    </View>
  ),
  headerRight: () => (
    <View style={styles.headerIconComponent}>
      <Icon
        type="antdesign"
        name={'scan1'}
        size={25}
        color="black"
        onPress={() => navigation.navigate('OcrCompare')}
      />
    </View>
  ),
});

export default AppStack;
