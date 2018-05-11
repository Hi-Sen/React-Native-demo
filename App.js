// import React, { Component } from 'react';
// import { 
//     Text, View, StyleSheet, Image
// } from 'react-native';

// //引入tabbar支持包  
// import TabNavigator from 'react-native-tab-navigator';  

// import Page1 from './demoPage/page';
// import Page2 from './demoPage/page2';
// import Page3 from './demoPage/page3';

// export default class HelloWorldApp extends Component {
//     constructor (props) {
//         super (props);
//         this.state = {
//             selectedTab: 'home'
//         }
//     }
//     render () {
//         return (
//             <View  style={{
//                 flex: 1,   
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//             }}>
//                 <TabNavigator>  
//                     <TabNavigator.Item  
//                         selected={this.state.selectedTab === 'home'}  
//                         title="首页"  
//                         renderIcon={() => <Image style={styles.icon} source={require('./image/tab_btn_home.png')} />}  
//                         renderSelectedIcon={() => <Image style={styles.icon} source={require('./image/index.png')} />}  
//                         onPress={() => this.setState({ selectedTab: 'home' })}>  
//                         <Page1/>
//                     </TabNavigator.Item>
//                     <TabNavigator.Item  
//                         selected={this.state.selectedTab === 'resCode'}  
//                         title="消息"  
//                         renderIcon={() => <Image style={styles.icon} source={require('./image/tab_btn_classification.png')} />}  
//                         renderSelectedIcon={() => <Image style={styles.icon} source={require('./image/tab_btn_classification_hl.png')} />}  
//                         badgeText="5"  
//                         onPress={() => this.setState({ selectedTab: 'resCode' })}>  
//                         <Page3/>
//                     </TabNavigator.Item>    
//                     <TabNavigator.Item  
//                         selected={this.state.selectedTab === 'profile'}  
//                         title="我的"  
//                         renderIcon={() => <Image style={styles.icon} source={require('./image/tab_btn_user.png')} />}  
//                         renderSelectedIcon={() => <Image style={styles.icon} source={require('./image/tab_btn_user_hl.png')} />}  
//                         onPress={() => this.setState({ selectedTab: 'profile' })}>  
//                         <Page2/>
//                     </TabNavigator.Item>  
//                 </TabNavigator> 

//             </View>
//         );
//     }
// } 

// const styles = StyleSheet.create ({
//     icon: {
//         width:20,
//         height:20
//     }
// })