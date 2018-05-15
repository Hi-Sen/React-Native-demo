import React, { Component } from 'react';
import { 
    StyleSheet,Text,View,Image,FlatList,Dimensions,ScrollView,PixelRatio  
} from 'react-native';

// 引入axios
import axios from '../http'

// 渲染html标签
import HTMLView from 'react-native-htmlview'

// 获取当前屏幕的宽高
var {height, width} = Dimensions.get('window');

export default class shopDetail extends Component {
    // 配置页面导航
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle:navigation.state.params.Name,
            headerTitleStyle: {
                textAlign: 'center',
                flex:1,
                color:'#fff'
            },
            headerRight: <View></View>
        }
    }
    constructor (props) {
        super(props)
        this.state = {
            ID: this.props.navigation.state.params.ID,
            uri: '',
            name: '',
            size: '',
            htmlContent: '',
            price: '',
            shortDescription: ''
        }
    }
    componentWillMount () {
        axios.post('/api/shop/prdouct/getPrdouctByID',{ID:this.state.ID}).then ( res => {
            console.log(res)
            this.setState ({
                uri: res.data.Data.Picture,
                name: res.data.Data.Name,
                size: res.data.Data.Size,
                htmlContent: res.data.Data.FullDescription,
                price: res.data.Data.PointPrice,
                shortDescription:res.data.Data.ShortDescription
            })
        }), err => {
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
                    style={{ width: width* PixelRatio.get(), height: imageHeight* PixelRatio.get() ,backgroundColor:'red',resizeMode:'stretch'}}
                    source={{ uri: src }} />
            );
        }
    }
    render () {
        return (
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                    <Image source = {{uri: this.state.uri}} style={styles.imgSty}></Image>
                    <View  style={styles.par}>
                        <Text>品名：{this.state.name}</Text>
                        <Text style={styles.prc}>￥： {this.state.price}</Text>
                        <Text>规格：{this.state.size}</Text>
                        <Text>适用人群：{this.state.shortDescription}</Text>
                        <Text onPress={()=>{this._goIndex()}}>测试跳转首页</Text> 
                    </View>

                    <Text style={styles.shopD}>商品详情</Text>

                    {/* 商品详情 */}
                    <HTMLView
                        style={styles.html}
                        value={this.state.htmlContent}
                        renderNode={this.renderNode}
                        stylesheet={this.props.stylesheet}
                    />
                </ScrollView>
            </View>  
        )
    }
    // 品名回首页
    _goIndex () {
        this.props.navigation.goBack ()
    }
}

const styles = StyleSheet.create ({
    imgSty: {
        height:200,
        resizeMode: 'contain',
    },
    shopD: {
        fontWeight:'bold',
        fontSize:15,
        marginTop:10,
        alignSelf:'center'
    },
    prc: {
        position:'absolute',
        alignSelf:'flex-end',
        color:'red'
    },
    par: {
        justifyContent:'flex-start',
        flexDirection:'column',
        marginLeft:15,
        marginRight:15
    },
    html: {
        width:width,
        borderTopWidth:2,
        borderTopColor:'#eee',
        marginTop:15
    }
})