import React, { Component } from 'react';
import { 
    Text, View, StyleSheet
} from 'react-native';

export default class page4 extends Component {
    // 配置页面导航header选项
    static navigationOptions = ({navigation}) => {
        console.log(navigation.state.params.name)
        return {
            headerTitle : navigation.state.params.name,
            headerTitleStyle: {
                    textAlign: 'center',
                    flex:1,
                    color:'#fff'
                },
                headerRight: <View></View>
        } 
    };

    constructor (props) {
        super(props)
        this.state = {
            name:  this.props.navigation.state.params.name,
            doThing: this.props.navigation.state.params.doThing,
        }
    }
    
    render () {
        return (
            <View>
                <Text style={{marginTop:50,textAlign:'center'}}> 我是 {this.state.name}</Text>
                <Text style={{marginTop:50,textAlign:'center'}}> {this.state.doThing}</Text>
            </View>
        ) 
    }
    
}