import React, { Component } from 'react';
import {
  StyleSheet,Text,View,Image,FlatList,TouchableOpacity
} from 'react-native';

// 引入axios
import axios from '../http'
import ScrollViewContent from '../homeView/srcollView'
import ShopDetail from '../demoPage/shopDetail'

export default class shopList extends Component {
    constructor (props) {
        super(props);
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
        return (
            <View style={{flex:1}}>
                <FlatList
                    //引入头部组件，包含banner  和  八个图标 
                    ListHeaderComponent={<ScrollViewContent navigate={this.props.navigate}/>}
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
                                onPress={() => {this._goDetail(item.ID,item.Name)}}
                                activeOpacity = {0.8}
                                key={item.ID}
                        >
                        <View style={styles.shopSty} key={item.Name}>
                            <Image source = {{uri: item.Picture}} style={styles.imgSty}></Image>
                            <View style={styles.viewS}> 
                                <Text>{item.Name}</Text>
                                <Text style={styles.shopT}>{item.ShortDescription} </Text> 
                                <Text style={styles.shopP}>
                                    ￥: {item.PointPrice} 
                                    <Text style={{color:'#999'}}> ( 库存：{item.SoldNum} )</Text> 
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    }
               />
            </View>   
        )
    }
    // 商品详情
    _goDetail (ID,Name) {
        let params = {
            ID: ID,
            Name: Name
        }
        this.props.navigate ('ShopDetail',params);
    }
    // 请求数据
    _getNum () {
        let params = {
            PageIndex: this.state.PageIndex,
            PageSize: 10,
            SortType: 0,
            CategoryID: '',
            Sortkey: 0,
            Name: '',
            TenantId: 1,
            SeasonWeight: 0
        }
        axios.post('/api/shop/prdoucts/getPrdouctsPage',params).then( res => {
            console.log(res)
            if(res.data.Data.length > 0 ){
                this.setState ( () => {
                    return { 
                        refreshing: false,
                        dataSource: this.state.refreshing == false ? 
                                    this.state.dataSource.concat(res.data.Data) :
                                    res.data.Data
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
        height:100
    },
    shopT: {
        color:'#999',
        fontSize:10
    },
    shopP: {
        color:'red',
        marginTop:20
    },
    viewS: {
        flexDirection: 'column',
        marginTop:10
    }
    
})