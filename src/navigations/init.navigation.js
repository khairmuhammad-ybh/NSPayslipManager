import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import WelcomeScreen from '../screens/welcome.screen';
import WelcomeContScreen from '../screens/welcome.cont.screen';

// redux
import { store } from '../redux/store';

const Stack = createStackNavigator();

function InitStack() {
    return (
        <Stack.Navigator headerMode={'screen'}>
            <Stack.Screen
                name='Welcome'
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                    animationTypeForReplace: store.getState().NSPayslipManager.firstLaunch 
                    ? 'pop'
                    : 'push',
                }}
            />
            <Stack.Screen
                name='WelcomeCont'
                component={WelcomeContScreen}
                options={{
                    title: '',
                    animationTypeForReplace: store.getState().NSPayslipManager.firstLaunch 
                    ? 'pop'
                    : 'push',
                }}
            />
        </Stack.Navigator>
    );
}

export default InitStack;