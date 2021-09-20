import * as React from 'react';
import {  Button, } from 'react-native';

import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import { View, Text, BlurView,TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from '../Screens/SplashScreen';
import SignUp from '../Screens/SignUp';


import Emailverficationscreens from '../Screens/Emailverficationscreens';
import forgetpassword from '../Screens/forgetpassword';
import forgettokenverfication from '../Screens/forgettokenverfication';

import ongoingDetails from '../Screens/ongoingDetails';

import WonbidsDetails from '../Screens/WonbidsDetails';
import termsandConditions from '../Screens/termsandConditions';
import Mybids from '../Screens/Mybids';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import SignIn from '../Screens/SignIn';
import Welcome from '../Screens/Welcome'
import Settings from '../Screens/Settings'
import Auctions from '../Screens/Auctions';
import Invoice from '../Screens/Invoice';
import invoice1 from '../Screens/invoice1';
import invoice2 from '../Screens/invoice2';

import Entypo from 'react-native-vector-icons/dist/Entypo';


import ongoing from '../Screens/ongoing';
import Wonbids from '../Screens/Wonbids';
import AuctionDetails from '../Screens/AuctionsDetails';
import InvoiceDetails from '../Screens/InvoiceDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import InvoiceDetails2 from '../Screens/InvoiceDetails2';
import AppConstance from '../AppConstants/AppConstance';

import { color, log } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = AnimatedTabBarNavigator();
const StackAuctions = createStackNavigator();
const StackInvoice =createStackNavigator();
const StackBids =createStackNavigator();

const TopTab = createMaterialTopTabNavigator();


const StackBid =({navigation}) =>{
  return(
  <StackBids.Navigator >
<StackBids.Screen name='My Bids' component={TabStack} options={{

headerStyle: {
            backgroundColor: '#268ef5',
     
          },
          headerTitleAlign:"center",
          headerTitleStyle: {
            color:'white' ,
          },
      headerLeft: () => (
    <TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
  alignContent:'flex-start',alignSelf:'flex-start', }}
 
 onPress={() => navigation.openDrawer()}
 >
     <Entypo name='menu' size={30} color='white'/>

      {/* <Image source={ require('../Assets/icons/list1.png')} 
 style={{ width: 24, height:24,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
/> */}
  </TouchableOpacity>
            )}} />
<StackBids.Screen name='ongoingDetails' component={ongoingDetails} />
<StackBids.Screen name='WonbidsDetails' component={WonbidsDetails} />

  </StackBids.Navigator>
  );
}


const Stackinvoice =({navigation}) =>{
  return(
  <StackBids.Navigator >
<StackBids.Screen name='invoice1' component={invoice1} 
options={{

  title:'My Invoice',

headerStyle: {
            backgroundColor: '#268ef5',
     
          },
          headerTitleAlign:"center",
          headerTitleStyle: {
            color:'white' ,
          },
      headerLeft: () => (
    <TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
  alignContent:'flex-start',alignSelf:'flex-start', }}
 
 onPress={() => navigation.openDrawer()}
 >
    <Entypo name='menu' size={30} color='white'/>

      {/* <Image source={ require('../Assets/icons/list1.png')} 
 style={{ width: 24, height:24,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
/> */}
  </TouchableOpacity>
            )}} 

            />

 <StackBids.Screen name='invoice2' component={invoice2} options={{

title:'My Invoice',

headerStyle: {
          backgroundColor: '#268ef5',
   
        },
        headerTitleAlign:"center",
        headerTitleStyle: {
          color:'white' ,
        },
        
 }}/>

{/* <Stackinvoice.Screen name='ongoingDetails' component={ongoingDetails} />
<Stackinvoice.Screen name='WonbidsDetails' component={WonbidsDetails} /> */}

  </StackBids.Navigator>
  );
}


function TabStack() {
  return (
    <TopTab.Navigator
      initialRouteName="Mybids"
      options={{
        headerShown:true,

      }}
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#633689',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}
      >
      <Tab.Screen
        name="ongoing"
        component={ongoing}
        options={{
           headerShown:true,
          tabBarLabel: 'Ongoingbids',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="home"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }}  />
      <Tab.Screen
        name="Wonbids"
        component={Wonbids}
        options={{
          tabBarLabel: 'Wonbids',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="settings"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }} />
    </TopTab.Navigator>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log out" onPress={() => {AppConstance.IS_USER_LOGIN='0';
AsyncStorage.setItem('IS_USER_LOGIN', '0');
 AsyncStorage.setItem('pass', '');
 AsyncStorage.setItem('fcmtoken', '');
 AsyncStorage.setItem('startLimit', '');
 AsyncStorage.setItem('endLimit', '');
 AsyncStorage.setItem('profile_pic', '');
 AsyncStorage.setItem('email', '');
 AsyncStorage.setItem('phone', '');
 AsyncStorage.setItem('name', '');

 props.navigation.closeDrawer();





props.navigation.navigate('Welcome');}} />
    </DrawerContentScrollView>
  );
}

const StackAuctionsScreen =() =>{
  return(
  <StackAuctions.Navigator>
<StackAuctions.Screen name='Auctions' component={Auctions}
options={{
  headerShown:false,
}} 
 />
<StackAuctions.Screen name='AuctionDetails' component={AuctionDetails} options={{
  title: 'Offer Details',
  headerTitleAlign:"center",

}}/>
  </StackAuctions.Navigator>
  );
}

const StackongoingScreen =() =>{
  return(
  <StackAuctions.Navigator>
<StackAuctions.Screen name='Ongoing' component={ongoing}
options={{
  headerShown:false,
}} 
 />
<StackAuctions.Screen name='ongoingDetails' component={ongoingDetails} options={{
  title: 'On Going Details',
  headerTitleAlign:"center",

}}/>
  </StackAuctions.Navigator>
  );
}

const StackwonbidScreen =() =>{
  return(
  <StackAuctions.Navigator>
<StackAuctions.Screen name='Wonbids' component={Wonbids}
options={{
  headerShown:false,
}} 
 />
<StackAuctions.Screen name='WonbidsDetails' component={WonbidsDetails} options={{
  title: 'WonbidsDetails',
  headerTitleAlign:"center",

}}/>
  </StackAuctions.Navigator>
  );
}



const StackInvoiceScreen =() =>{
  return(
    <StackInvoice.Navigator>
<StackInvoice.Screen name='Invoice' component={Invoice}
options={{
  headerShown:false,
}} 
 

/>
<StackInvoice.Screen name='InvoiceDetails' component={InvoiceDetails}
options={{
  title:'Invoice Details',
  headerStyle: {
            backgroundColor: '#268ef5',
     
          },
          headerTitleAlign:"center",
          headerTitleStyle: {
            color:'white' ,
          },
}}
// options={{
//   headerShown:false,
// }} 
  />

<StackInvoice.Screen name='InvoiceDetails2' component={InvoiceDetails2}
options={{
  title:'Invoice Details',

  headerStyle: {
            backgroundColor: '#268ef5',
     
          },
          headerTitleAlign:"center",
         
          headerTitleStyle: {
            color:'white' ,
          },
}}
// options={{
//   headerShown:false,
// }} 
  />

  </StackInvoice.Navigator>
  );
}

const TabScreen =()=>{
  return(
  <Tab.Navigator
  
   options={{  headerShown:false, headerTitleAlign:"center", headerLeft: null ,    }} 
    tabBarOptions={{
      activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222",
      keyboardHidesTabBar: true,

    style: {
      position: 'absolute',
      backgroundColor:'red',
   alignSelf:'center',
   marginTop:-20
     // height:80,


      
    },
    }}
    //  tabBarOptions={{
     

  //   activeTintColor: 'black',
    

  //   keyboardHidesTabBar: true,
  //   style: {
  //     height:55,
  //     position: 'absolute',
  //   },
  // }}
  >
  <Tab.Screen name='Auctions' component={StackAuctionsScreen}
   options={{
 headerShown:false,
  
//           tabBarLabel: 'Auctions',
//           tabBarOptions: {
//   labelStyle: {
//     fontWeight:'bold'
//   },
// },
          // tabBarIcon: ({ color }) => (
          //   <Image
          //   source={require('../Assets/icons/sedan-car-front.png')}

          //   />
          // ),
tabBarIcon: ({ focused, color, size }) => (
  
            <Icon
                name="car-sport-sharp"
                size={size ? size : 20}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
//             // <Image
//             // source={require('../Assets/icons/sedancarfront0.png')}

//             // />
//         )
)
        }}  />
  <Tab.Screen name='Invoice' component={StackInvoiceScreen} 
   options={{
    headerShown:false,
          tabBarLabel: 'Purchases',
          tabBarOptions: {
  labelStyle: {
    fontWeight:'bold'
  },
},
tabBarIcon: ({ focused, color, size }) => (
  
  <Icon
      name="receipt"
      size={size ? size : 20}
      color={focused ? color : "#222222"}
      focused={focused}
      color={color}
  />

)
}}  />
  <Tab.Screen name='Settings' component={Settings}
  
  options={{
    
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
  
  <Icon
      name="person"
      size={size ? size : 20}
      color={focused ? color : "#222222"}
      focused={focused}
      color={color}
  />

)
}}  />
 </Tab.Navigator>
  );
}

// const TabScreen =()=>{
//   return(
//   <Tab.Navigator
  
//    options={{  headerShown:false, headerTitleAlign:"center", headerLeft: null 
     
     
//     }} 
//    tabBarOptions={{
     
//     activeTintColor: 'black',
    

//     keyboardHidesTabBar: true,
//     style: {
//       height:75,
//       position: 'absolute',
//       backgroundColor:'red',
//       alignSelf:'center'
//     },
//   }}>
//   <Tab.Screen name='Auctions' component={StackAuctionsScreen}
//    options={{
//  headerShown:false,
//     tabBarOptions: { activeTintColor:'red'},
  
//           tabBarLabel: 'Auctions',
//           tabBarOptions: {
//   labelStyle: {
//     fontWeight:'bold'
//   },
// },
//           tabBarIcon: ({ color }) => (
//             <Image
//             source={require('../Assets/icons/sedan-car-front.png')}

//             />
//           ),
//         }}  />
//   <Tab.Screen name='Invoice' component={StackInvoiceScreen} 
//    options={{
//     headerShown:false,
//           tabBarLabel: 'Purchases',
//           tabBarOptions: {
//   labelStyle: {
//     fontWeight:'bold'
//   },
// },
//           tabBarIcon: ({ color }) => (
//             <Image
//             source={require('../Assets/icons/invoice.png')}

//             />
//           ),
//         }}
  
//          />
//   <Tab.Screen name='Settings' component={Settings}
  
//   options={{
    
//           tabBarLabel: 'Profile',
          
// //           labelStyle: {
// //     fontWeight: "bold"
// // },
//           tabBarIcon: ({ color }) => (
//             <Image
//             source={require('../Assets/icons/user.png')}

//             />
//           ),
//         }}
  
//    />
//  </Tab.Navigator>
//   );
// }


const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => {
  return(
  <AppDrawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} 
  />}     >

    <AppDrawer.Screen name="Offers" component={TabScreen}  />
    <AppDrawer.Screen name="Mybids" component={StackBid}  options={{

title:'My Bids',
    }} />
    <AppDrawer.Screen name="invoice1" component={Stackinvoice}  options={{

title:'My Invoice',
    }} />

    <AppDrawer.Screen name="Terms and Conditions" component={termsandConditions} />

  </AppDrawer.Navigator>
);
}

const AppNavigator = () => {
 return (
   <Stack.Navigator 
   initialRouteName="SplashScreen" 
   >
        
        <Stack.Screen  name='SplashScreen'  component={SplashScreen} options={{headerShown :false}} />
        <Stack.Screen name='Welcome' component={Welcome} options={{headerTitleAlign:"center"} } options={{headerTitleAlign:"center", headerLeft: null }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerTitleAlign:"center"}} />
        <Stack.Screen name='Emailverficationscreens' component={Emailverficationscreens} options={{ title:'Forget Password', headerTitleAlign:"center"}} />
        <Stack.Screen name='forgetpassword' component={forgetpassword} options={{ headerTitleAlign:"center"}} />
        <Stack.Screen name='forgettokenverfication' component={forgettokenverfication} options={{title:'Change Password', headerTitleAlign:"center"}} />

        <Stack.Screen name='SignIn' component={SignIn} options={{headerTitleAlign:"center"}}/>
        <Stack.Screen name='My bids' component={Mybids} options={{headerTitleAlign:"center"}}/>

     <Stack.Screen name='AppDrawerScreen' component={AppDrawerScreen} options={{ headerShown:false, headerTitleAlign:"center", headerLeft: null}} />

   </Stack.Navigator>
 
 );
}

export default AppNavigator;
