import React, {Component} from 'react';

// redux
import {store, persistor} from '../redux/store';
import {connect} from 'react-redux';

// navigator
import {NavigationContainer} from '@react-navigation/native';
// navigators
import AppNav from '../navigations/app.navigation';
import InitNav from '../navigations/init.navigation';

class LoadingScreen extends Component {
  componentDidMount() {
    // persistor.purge();
  }

  render() {
    isFirst = store.getState().NsPayslipComparer.firstLaunch;

    return (
      <NavigationContainer>
        {isFirst ? <InitNav /> : <AppNav />}
      </NavigationContainer>
    );
  }
}

const stp = store => {
  let {NsPayslipComparer} = store;

  return {
    NsPayslipComparer: NsPayslipComparer,
  };
};

export default connect(stp)(LoadingScreen);
