import React, { Component } from 'react';
import { 
    StyleSheet,Text,View,Image,FlatList,Dimensions,ScrollView ,PixelRatio
} from 'react-native';

// 引入axios
import axios from '../http'

// 渲染html标签
import HTMLView from 'react-native-htmlview'

// 获取当前屏幕的宽高
var {height, width} = Dimensions.get('window');

export default class newDetail extends Component {
    // 配置页面导航header选项
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle : navigation.state.params.Title,
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
            htmlId: this.props.navigation.state.params.ID,
            htmlContent: '加载中.....'
        }
    }
    componentWillMount () {
        let that = this;
        axios.post('/api/cms/article/getArticle',{ ID: this.state.htmlId }).then( res => {
            console.log(res)
            that.setState ({
                htmlContent: res.data.Data.Content
            })
        }),err=> {
            console.log(`${err}`)
        }
    }
    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const { src, height } = node.attribs;
            const imageHeight = height || 300;
            return (
                <Image
                    key={index}
                    style={{ width: width* PixelRatio.get() , height: imageHeight* PixelRatio.get() ,backgroundColor:'#2f88ff'}}
                    source={{ uri: src }} />
            );
        }
    }
    render () {
        return (
            <View>
                <ScrollView >
                    <HTMLView
                        style={{fontSize:15}}
                        value={this.state.htmlContent}
                        renderNode={this.renderNode}
                        stylesheet={this.props.stylesheet}
                    />
                </ScrollView >
            </View>
        )
    }
}

const styles = StyleSheet.create ({

})