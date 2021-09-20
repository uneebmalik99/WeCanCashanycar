import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Invoice from '../Screens/Invoice';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';

import Settings from '../Screens/Settings';
import  Auctions from '../Screens/Auctions';
import  AuctionDetails from '../Screens/AuctionsDetails';
import  InvoiceDetails from '../Screens/InvoiceDetails';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const StackAuctions = createStackNavigator();
const StackInvoice =createStackNavigator();


// const AppDrawer = createDrawerNavigator();
// const AppDrawerScreen = () => (
//   <AppDrawer.Navigator>
//     <AppDrawer.Screen name="Settings" component={Settings} />
//   </AppDrawer.Navigator>
// );



const TabScreen =()=>{
  return(
  <Tab.Navigator>
  <Tab.Screen name='Auctions' component={Auctions} />
  <Tab.Screen name='Invoice' component={Invoice} />
  <Tab.Screen name='Settings' component={Settings} />
 </Tab.Navigator>
  );
}
// const MainTabs = () => {
//   return (
   
 
//   );
// }

// const StackAuctionsScreen =() =>{
//   return(
//   <StackAuctions.Navigator>

// <StackAuctions.Screen name='AuctionDetails' component={AuctionDetails} />

//   </StackAuctions.Navigator>
//   );
// }
// const StackInvoiceScreen =() =>{
//   return(
// <StackInvoice.Screen name='InvoiceDetails' component={InvoiceDetails} />

// }
 
//const StackAuctions

const AppDrawer = createDrawerNavigator();
const MainTabs = () => {
  return(
    <NavigationContainer>
  <AppDrawer.Navigator>
    <AppDrawer.Screen name="TabScreen" component={TabScreen} />
  </AppDrawer.Navigator>
</NavigationContainer>
 
  );
}

export default MainTabs
// export default () =>{
//   return (
//   <NavigationContainer>
//   <AppDrawer.Navigator>
//     <AppDrawer.Screen name="TabScreen" component={TabScreen} />
//   </AppDrawer.Navigator>
// </NavigationContainer>
//   );
// }