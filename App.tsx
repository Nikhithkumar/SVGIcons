/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainNavigations from './src/navigations/MainNavigations';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <SafeAreaView style={styles.main}>
      <MainNavigations />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
