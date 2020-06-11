import React, { Component } from 'react'
// Navigators
import { NavigationContainer } from '@react-navigation/native';
import AppNav from '../navigations/app.navigation';
import InitNav from '../navigations/init.navigation';
// redux/redux-persist
import { store, persistor } from '../redux/store';
import { connect } from 'react-redux';

class mainNav extends Component {
    
    componentDidMount() {
        // persistor.purge();
      }

    render() {

        isFirst = store.getState().NSPayslipManager.firstLaunch;

        return (
            <NavigationContainer>
                {isFirst ? <InitNav/> : <AppNav/>}
            </NavigationContainer>
        )
    }
}

const stp = store => {
    let { NSPayslipManager } = store;
  
    return {
      NSPayslipManager: NSPayslipManager,
    };
  }

export default connect(stp)(mainNav);