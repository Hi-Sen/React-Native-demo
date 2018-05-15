import React, { Component } from 'react';
import { 
    Text, View, FlatList, TouchableOpacity,StatusBar ,Image, StyleSheet,ScrollView
} from 'react-native';  

import ShopList from '../homeView/shopList'

export default class page extends Component {
      
    // 配置页面导航header选项
    static navigationOptions = ({navigation}) => ({
        headerTitle: '首页',
    });
    
    // 初始化
    constructor (props) {
        super(props);
        this.state = {

        }
    }
    render () {
        return (
            <View style={{flex:1}}>
             
                    {/* 顶部背景 */}
                    <StatusBar
                        backgroundColor="#8DD1F9"
                        barStyle="light-content"
                    />
                    {/* 商品列表 */}
                    <View style={{flex:1}}>
                        <ShopList navigate={this.props.navigation.navigate}/>
                    </View>
           
            </View>
        ) 
    }
} 

const styles = StyleSheet.create ({
    ScrollViewContent: {
        height:150,
        paddingBottom:10,
        borderBottomColor:'#eee',
        borderBottomWidth:2
    }
})