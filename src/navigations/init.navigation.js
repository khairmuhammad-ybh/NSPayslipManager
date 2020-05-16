import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import WelcomeScreen from '../screens/welcome.screen';

// redux
import {store} from '../redux/store';

const Stack = createStackNavigator();

function InitStack() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerMode: 'none',
          animationTypeForReplace: store.getState().NsPayslipComparer
            .firstLaunch
            ? 'pop'
            : 'push',
        }}
      />
    </Stack.Navigator>
  );
}

export default InitStack;
