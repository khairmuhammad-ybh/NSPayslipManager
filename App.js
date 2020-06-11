import React, { Component } from 'react'
// redux/redux-persist
import { store, persistor } from './src/redux/store';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// Navigation
import MainNav from './src/navigations/main.navigation';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNav/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;