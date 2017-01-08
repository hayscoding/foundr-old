import React, {Component} from 'react';
import {
  StatusBar
} from 'react-native';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import HomeScreen from './screens/home'
import LoginScreen from './screens/login'

export const Router = createRouter(() => ({
  home: () => HomeScreen,
  login: () => LoginScreen,
}))

export default class App extends Component {
  render() {
    return(
      <NavigationProvider router={Router}>
        <StatusBar barStyle="dark-content" />
        <StackNavigation initialRoute={Router.getRoute('login')} />
      </NavigationProvider>
      )
  }
}