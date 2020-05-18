import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import ExpectedScreen from '../screens/expected.screen';
import CompareScreen from '../screens/compare.screen';

const Tab = createBottomTabNavigator();

function BottomStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Expected"
        component={ExpectedScreen}
        // options={({navigation, route}) => ({
        //   headerTitleStyle: {alignSelf: 'center'},
        //   headerTitle: () => (
        //     <TouchableOpacity
        //       onPress={() => {
        //         onRetrieveProfile();
        //       }}>
        //       <Text>NSPayslipComparer</Text>
        //     </TouchableOpacity>
        //   ),
        //   headerLeft: () => (
        //     <View style={styles.headerComponent}>
        //       <TouchableOpacity onPress={() => navigation.navigate('About')}>
        //         <Text>About</Text>
        //       </TouchableOpacity>
        //     </View>
        //   ),
        //   headerRight: () => (
        //     <View style={styles.headerIconComponent}>
        //       <Icon
        //         type="antdesign"
        //         name={'addfile'}
        //         size={25}
        //         color="black"
        //         onPress={() => navigation.navigate('OcrCompare')}
        //       />
        //     </View>
        //   ),
        // })}
      />
      <Tab.Screen name="Compare" component={CompareScreen} />
    </Tab.Navigator>
  );
}

export default BottomStack;
