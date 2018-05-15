import React, { Component } from 'react';
import {
  StyleSheet,Text,View,Image,Dimensions,FlatList,TouchableOpacity
} from 'react-native';

// 导入swiper
import Swiper from 'react-native-swiper';
// 引入axios
import axios from '../http'

// 获取当前屏幕的宽高
var {height, width} = Dimensions.get('window');

export default class srcollView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bannerList: [
                require('../image/banner/1.jpg'),
                require('../image/banner/4.jpg'),
                require('../image/banner/1.jpg'),
                require('../image/banner/4.jpg'),
            ],
            iconImg: [
                {'src': require('../image/icon/1.png'),'name': '张三'} ,
                {'src': require('../image/icon/2.png'),'name': '李四'} ,
                {'src': require('../image/icon/3.png'),'name': '王五'} ,
                {'src': require('../image/icon/4.png'),'name': '赵六'} ,
                {'src': require('../image/icon/5.png'),'name': '扬七'} ,
                {'src': require('../image/icon/6.png'),'name': '蔡八'} ,
                {'src': require('../image/icon/7.png'),'name': '牧九'} ,
                {'src': require('../image/icon/8.png'),'name': '老十'} ,
               
            ]
        }
    };

    componentWillMount () {
        // 获取banner
        let data = {
            "TenantId": 1,
            "Position": 10
        }
        axios.post('/api/cms/banner/getBanners', data)
           .then(res => {
               console.log(res);
               this.setState({
                //    bannerList: res.data.Data
                })
           }), err => {
               console.log(`${err}`)
           }
    }

    render(){
        return (
            <View>
                <Swiper 
                    style={styles.swiper}            //样式
        　　　　　　  height={150}                    //组件高度
        　　　　　　  loop={true}                     //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
        　　　　　　  autoplay={false}                //自动轮播autoplayTimeout={4}                //每隔4秒切换
        　　　　　　  horizontal={true}               //水平方向，为false可设置为竖直方向
        　　　　　　  paginationStyle={{bottom: 0}}   //小圆点的位置：距离底部10px
        　　　　　　  showsButtons={false}            //为false时不显示控制按钮
        　　　　　　  showsPagination={true}          //为false不显示下方圆点
                >
                {/* 动态  静态 看是否有返回值 来渲染本地banner或者网络banner*/}
                { 
                    this.state.bannerList.length != 4 ? this.state.bannerList.map( (item,n) => {
                        return <Image source= {{uri : item.Picture}}  style={styles.img} key={n}></Image>
                    }) : this.state.bannerList.map( (item,n) => {
                        return <Image source= {item}  style={styles.img} key={n}></Image>
                    }) 
                }
                </Swiper>
                 {/* 8 个 图标  两行*/}
                 <View style={styles.borderSty}>
                    
                    <View style={styles.fourImg}>
                        {
                            this.state.iconImg.map( (item,n)=> {
                                return <TouchableOpacity 
                                            onPress={() => {this._onPressGo(item.name)}}
                                            activeOpacity = {0.8}
                                            style={{height:40,width:width/4.0,
                                            alignItems:'center',marginBottom:10}}
                                            key={n}
                                        >
                                        <Image style={styles.imgHeight} source= {item.src} ></Image>
                                        </TouchableOpacity>
                            })
                        }
                    </View>
                 </View>
            </View>
        );
    }
    // icon点击事件
    _onPressGo (name) {
        this.props.navigate ('Page4',{name});
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    img:{
        flex: 1,
        width:width,
        resizeMode: 'cover'
    },
    borderSty:{
        borderBottomColor:'#eee',
        borderBottomWidth:2,
    },
    fourImg: {
        flexWrap:'wrap',
        width:width,
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
    },
    imgHeight: {
        flex:1,
        height:50,
        resizeMode :'contain',
    }
})
