import React, { Component } from 'react';
import { 
    StyleSheet,Text,View,Image,FlatList,Dimensions,TouchableOpacity
} from 'react-native';

// 引入axios
import axios from '../http';

// 获取当前屏幕的宽高
var {height, width} = Dimensions.get('window');

export default class page extends Component {
    // 配置页面导航header选项
    static navigationOptions = ({navigation}) => ({
        headerTitle: '新闻消息',
    });
    constructor (props) {
        super(props)
        this.state = {
            dataSource: [],
            refreshing: false,
            PageIndex: 1
        }
    }
    componentWillMount () {
        this._getNum();
    }
    
    render () {
        var that = this;
        return (
            <View style={{flex:1,marginTop:20}}>
                <FlatList
                    onRefresh={this._onRefresh}
                    onEndReached={this._onLoadMore}
                    refreshing={this.state.refreshing}
                    data = {this.state.dataSource}
                    onEndReachedThreshold={0.1}
                    getItemLayout={(data, index) => ({
                            length: 120, offset: (120 + 1) * index, index
                        })
                    }
                    renderItem = {({item}) =>
                            <TouchableOpacity 
                                onPress={() => {this._goDetail(item.ID,item.Title)}}
                                activeOpacity = {0.8}
                                key={item.ID}
                            > 
                            <View style={styles.shopSty} key={item.Title}>
                                <Image source = {{uri: item.Picture}} style={styles.imgSty}></Image>
                                <View style={styles.vieSty}> 
                                    <Text style={{height:50}}>{item.Title}</Text>
                                    <Text 
                                        numberOfLines ={2}
                                        style={styles.sum}>{item.Summary} </Text> 
                                    <Text style={styles.upa}> 发布时间：{item.UpdateTime} </Text> 
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
               />
            </View>   
        ) 
    }
    // 查看详情
    _goDetail (ID,Title) {
        this.props.navigation.navigate('NewsDetail',{ID,Title})
    }
    // 请求数据
    _getNum () {
        let params = {
            PageIndex: this.state.PageIndex,
            PageSize: 8,
            SortType: 0,
            Sortkey: 0,
            TenantId: 0,
            CategoryId: '',
            IsRecommend: 0,
            DifferentType: 0,
        }
        axios.post('/api/cms/article/getArticles',params).then( res => {
            console.log(res)
            if(res.data.Data.Data.length > 0 ) {
                this.setState ( () => {
                    return { 
                        refreshing: false,
                            dataSource: this.state.refreshing == false ? 
                                        this.state.dataSource.concat(res.data.Data.Data) :
                                        res.data.Data.Data 
                        }
                })
            }
        }), err => {
            console.log(`${err}`)
        }
    }
    // 上拉加载方法
    _onLoadMore = () => {
        this.setState ({
            PageIndex: this.state.PageIndex+=1
        })
        console.log(this.state.PageIndex)
        this._getNum();
    }
    // 下拉刷新
    _onRefresh = () => {
        this.setState({
            refreshing: true,
            PageIndex: this.state.PageIndex=1
        }, () => {
            this._getNum();
        });
    }
}

const styles = StyleSheet.create ({
    shopSty:{
        height:120,
        flex:1,
        flexDirection: 'row'
    },
    imgSty: {
        width:100,
        height:100,
        marginLeft:10,
        marginRight:10
    },
    sum : {
        color:'#999',
        fontSize:10,
        height:40
    },
    upa: {
        color:'#999',
        fontSize:10,
        height:20
    },
    vieSty: {
        flexDirection: 'column',
        width:width-130
    }
})