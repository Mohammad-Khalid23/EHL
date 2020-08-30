import React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;