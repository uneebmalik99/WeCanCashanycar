import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Invoice from '../Screens/Invoice';
import Settings from '../Screens/Settings';
import Auctions from '../Screens/Auctions';

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tab.Navigator>
    
     <Tab.Screen name='Auctions' component={Auctions} />
     <Tab.Screen name='Invoice' component={Invoice} />
     <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
 
  );
}


const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator>
    <AppDrawer.Screen name="Settings" component={Settings} />
  </AppDrawer.Navigator>
);
export default AppDrawerScreen;