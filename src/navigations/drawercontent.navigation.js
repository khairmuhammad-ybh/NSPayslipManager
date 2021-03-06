import React from 'react';
import {View, Text, StyleSheet, Platform, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
// redux
import {store} from '../redux/store';
import * as Actions from '../redux/actions';
// services
import * as serviceProfile from '../services/profile.service';
import * as servicePayslip from '../services/payslip.service';
import * as serviceRedux from '../services/redux.service';
// Icon
import {Icon} from 'react-native-elements';

// Logout user
onDeleteProfile = props => {
  serviceProfile
    .deleteProfile()
    .then(userProfile => {
      servicePayslip
        .clearAllPayslipTemplate()
        .then(resp => {
          // user profile deleted
          servicePayslip
            .clearAllPayslip()
            .then(resp => {
              // all payslip cleared
              serviceRedux.userSignOut().then(() => {
                // all redux store cleared
              });
            })
            .catch(err => {
              // unable to clear all payslip
              // alert user and redirect to 'Home'
              this.signOutErrorAlert(props);
            });
        })
        .catch(err => {
          // unable to clear all payslip template
          // alert user and redirect to 'Home'
          this.signOutErrorAlert(props);
        });
    })
    .catch(err => {
      // unable to delete user profile
      // alert user and redirect to 'Home'
      this.signOutErrorAlert(props);
    });
};

signOutErrorAlert = props => {
  Alert.alert(
    'Alert',
    'Something wrong with the system, unable to signout, issue will be automatically reported for remedy',
    [
      {
        text: 'OK',
        onPress: () => props.navigation.navigate('Home'),
      },
    ],
  );
};

export function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Text style={styles.title}>
                  Name: {store.getState().Profile.name}
                </Text>
                <Text style={styles.caption}>
                  Rank: {store.getState().Profile.rank}
                </Text>
                <Text style={styles.caption}>
                  Vocation: {store.getState().Profile.vocation}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              onPress={() => props.navigation.navigate('Home')}
              icon={({color, size}) => (
                <Icon
                  type="ionicon"
                  name={Platform.OS == 'ios' ? 'ios-home' : 'md-home'}
                  size={size}
                  color={color}
                />
              )}
            />
            <DrawerItem
              label="Update Profile"
              onPress={() => props.navigation.navigate('Profile')}
              icon={({color, size}) => (
                <Icon
                  type="ionicon"
                  name={Platform.OS == 'ios' ? 'ios-person' : 'md-person'}
                  size={size}
                  color={color}
                />
              )}
            />
            <DrawerItem
              label="Settings"
              onPress={() => props.navigation.navigate('Settings')}
              icon={({color, size}) => (
                <Icon
                  type="ionicon"
                  name={Platform.OS == 'ios' ? 'ios-settings' : 'md-settings'}
                  size={size}
                  color={color}
                />
              )}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
          onPress={() => onDeleteProfile(props)}
          icon={({color, size}) => (
            <Icon
              type="octicon"
              name={'sign-out'}
              size={size}
              color={color}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
  },
  subCaption: {
    fontSize: 12,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
