

import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';
import {StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";

import RouteConfigs from './routeConfig'
import StackNavigatorConfig from './navConfig'

/**
 * 构造函数 引入 RouteConfigs 所有组件路由组件  ，StackNavigatorConfig 组件title设置组件
 */ 
const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default class MainComponent extends Component {
    render() {
        return (
            <Navigator/>
        )
    };
}

AppRegistry.registerComponent('reactNative', () => MainComponent );