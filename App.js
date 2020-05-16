import React, {Component} from 'react';

// Redux / Redux-persist
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

// screens
import LoadingScreen from './src/screens/loading.screen';

class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LoadingScreen/>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
