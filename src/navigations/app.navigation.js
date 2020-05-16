import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Text} from 'react-native';

// screens
import HomeScreen from '../screens/home.screen';
import CompareScreen from '../screens/compare.screen';
import AboutScreen from '../screens/about.screen';

// Icons
import {Icon} from 'react-native-elements';

// styles
import styles from '../styles/nav.header.style';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator headerMode={'screen'}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation, route}) => ({
          headerTitleStyle: {alignSelf: 'center'},
          title: 'NsPayslipComparer v1.0',
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
                onPress={() => navigation.navigate('Compare')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="Compare" component={CompareScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;
