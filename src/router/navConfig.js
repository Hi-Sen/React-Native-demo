

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const StackNavigatorConfig = {
    initialRouteName: 'Tabbar',
    initialRouteParams: {initPara: '初始页面参数'},
    navigationOptions: {
        title: '',
        headerStyle: {height: 48, backgroundColor: '#8DD1F9'},
        headerTitleStyle: {
            textAlign: 'center',
            flex:1,
            color:'#fff'
        },
    },
    // paths: 'page/main',
    mode: 'card',
    headerMode: 'screen',
    cardStyle: {backgroundColor: "#ffffff"},
    transitionConfig: (() => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })),
    onTransitionStart: (() => {
        console.log('页面跳转动画开始');
    }),
    onTransitionEnd: (() => {
        console.log('页面跳转动画结束');
    }),
};

export default StackNavigatorConfig;

// initialRouteName - 导航器组件中初始显示页面的路由名称，如果不设置，则默认第一个路由页面为初始显示页面
// initialRouteParams - 给初始路由的参数，在初始显示的页面中可以通过 this.props.navigation.state.params 来获取
// navigationOptions - 路由页面的配置选项，它会被 RouteConfigs 参数中的 navigationOptions 的对应属性覆盖。
// paths - 路由中设置的路径的覆盖映射配置
// mode - 页面跳转方式，有 card 和 modal 两种，默认为 card ：
// card - 原生系统默认的的跳转
// modal - 只针对iOS平台，模态跳转
// headerMode - 页面跳转时，头部的动画模式，有 float 、 screen 、 none 三种：
// float - 渐变，类似iOS的原生效果
// screen - 标题与屏幕一起淡入淡出
// none - 没有动画
// cardStyle - 为各个页面设置统一的样式，比如背景色，字体大小等
// transitionConfig - 配置页面跳转的动画，覆盖默认的动画效果
// onTransitionStart - 页面跳转动画即将开始时调用
// onTransitionEnd - 页面跳转动画一旦完成会马上调用