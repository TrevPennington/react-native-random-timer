/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

// import Timer from "./components/Timer"
import RandomTimer from "./components/RandomTimer"

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>RandomTimer</Text>
       <RandomTimer style={styles.timer} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    
  },
  title: {
    textAlign: `center`,
  },
  timer: {
    
  }
});

export default App;
