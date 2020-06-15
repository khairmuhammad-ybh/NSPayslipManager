import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../navigations/drawercontent.navigation';

// screen
import HomeScreen from '../screens/home.screen';
import AboutScreen from '../screens/about.screen';
import ProfileScreen from '../screens/profile.screen';

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerStack;
