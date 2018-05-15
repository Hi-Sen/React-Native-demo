

import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';
import {StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";

import RouteConfigs from './routeConfig'
import StackNavigatorConfig from './navConfig'

const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default class MainComponent extends Component {
    render() {
        return (
            <Navigator/>
        )
    };
}

AppRegistry.registerComponent('reactNative', () => MainComponent );