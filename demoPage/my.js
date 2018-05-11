import React, { Component } from 'react';
import { 
    Text, View, FlatList,Image,StyleSheet,Dimensions,TouchableOpacity
} from 'react-native';

// 引入axios
import axios from '../http'

// 获取当前屏幕的宽高
var {height, width} = Dimensions.get('window');

export default class page3 extends Component {
     // 配置页面导航header选项
     static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '我的',
        }
    };
    
    constructor (props) {
        super(props);
        const params = this.props.navigation.state.params
        this.state = {
            name: params ? params.id : '张三丰',
            cellList: [
                {'doThing': '张三要请我吃饭', 'name': '张三'},
                {'doThing': '李四什么鬼', 'name': '李四'},
                {'doThing': '王五，今晚放学别走', 'name': '王五'},
                {'doThing': '赵六跟赵四什么关系', 'name': '赵六'},
                {'doThing': '扬七明天要去打仗', 'name': '扬七'},
                {'doThing': '听说蔡八买房了', 'name': '蔡八'},
                {'doThing': '牧九今晚去打球啊', 'name': '牧九'},
                {'doThing': '老十是老师吗', 'name': '老十'},
            ]
        }
    }
    render () {
        return (
            <View>
               
                <View style={styles.cell}>
                    <FlatList
                        data={this.state.cellList}
                        ListHeaderComponent = {() => {
                            return  <View style={styles.cellSty}>
                                        <Image style={styles.bg} source = {require('../image/my/head.png')}></Image>
                                        <Text style={{marginBottom:20}}>My name is {this.state.name} </Text>
                                    </View>
                        }}
                        renderItem={({item}) => 
                            <TouchableOpacity 
                                onPress={() => {this._onPressGo(item.doThing,item.name)}}
                                activeOpacity = {0.8}
                                key={item.name}
                            >
                                <View style={styles.viewS}>
                                    <Text style={styles.textS}>
                                        {item.doThing}
                                    </Text>
                                    <Text style={styles.sty}> > </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        ) 
    }
    // 跳转
    _onPressGo  (doThing,name) {
        let params = {
            doThing,name
        }
        this.props.navigation.navigate('Page4',params)
    }
}

const styles = StyleSheet.create ({
    bg: {
        height:50,
        resizeMode : 'contain',
        marginTop:20,
        marginBottom:10,
    },
    cellSty: {
        borderBottomColor:'#eee',
        borderBottomWidth:2,
        alignItems:'center',
        backgroundColor:'#eee'
    },
    viewS: {
        height:50,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        justifyContent :'center',
        marginLeft:20,
        marginRight:20
    },
    textS: {
        alignItems:'flex-start',
        justifyContent :'center'
    },
    sty: {
        position:'absolute' ,
        alignSelf:'flex-end'
    }
}) 