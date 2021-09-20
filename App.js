import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Route/AppNavigator.js';
import messaging from '@react-native-firebase/messaging';
import { Image,View,Button,TouchableOpacity,Text,Modal, ImageBackground, BackHandler, Linking, Platform } from 'react-native';
import {fcmServies} from './src/FirebaseController/FCMSERVIES';
import {localNotificationServies} from './src/FirebaseController/LocalNotificationServies';
import VersionCheck from 'react-native-version-check';
import { deviceWidth,deviceHeight } from './src/AppConstants/AppConstance.js';





const App = () => {
  const [Update, setUpdate] = useState(false);

  const[url ,seturl]=useState('https://play.google.com/store/apps/details?id=com.carauctionuae');
  const checkUpdateNeeded = async () => {
    try
    {
      const latestVersion = await VersionCheck.getLatestVersion();
      const currentVersion = VersionCheck.getCurrentVersion()
    let updateNeeded = await VersionCheck.needUpdate();
    console.log(updateNeeded.latestVersion+'--'+updateNeeded.isNeeded+'--'+updateNeeded.currentVersion)
  
    if (updateNeeded.isNeeded) {
      setUpdate(true)
      
    }else{
      console.log('no update need');
      setUpdate(false)
      
    }
  }
    catch(error ){
      alert(error)
  
      
    }
  }


    useEffect(() => {
if(Platform.OS == 'ios'){

}else{
      checkUpdateNeeded();
}
    //  fcmServies.register(onOpenNotification)
    // localNotificationServies.configure(onOpenNotification)

    //  function onOpenNotification(notify){
    //      alert(notify.body)
    //  }
    // onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
  
  
    //     if(!notification?.data){
    //         return
    //     }
    //     notification.userInteraction =true;
    //     onOpenNotification(Platform.Os === 'ios' ? notification.data.item : notification.data);
  
    //     if(Platform.OS === 'ios'){
  
    //       notification.finish(PushNotificationIOS.FetchResult.NoData)
    //     }
        
    //   let v = notification.message;
    //   if(v !== undefined)
    //   {
    //     // process the notification
    //   alert(notification.message)
    //   }else{
      
    //   }
        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      
    // messaging().onNotification(remoteMessage => {
    //         console.log(
    //           'Notification caused app to open from background state:',
    //           remoteMessage.notification,
    //         );
    //         alert(remoteMessage.notification)
    //         //navigation.navigate(remoteMessage.data.type);
    //       });
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        let v = remoteMessage.notification.body.toString();
        alert(v)
        //navigation.navigate(remoteMessage.data.type);
      });
  
      // Check whether an initial notification is available
    messaging().getInitialNotification().then(remoteMessage => {
          if (remoteMessage) {
              let v = remoteMessage.notification.body.toString();
            alert(v)

            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification.body,
            );
           // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
        });
      
    }, []);
 return (

  <>
 {Update === true ? 
  <Modal
          transparent={true}
          visible={Update}
          onRequestClose={() => {
            console.log('close modal');
          }}>

<View style={{width:deviceWidth,
              height:deviceHeight,
              flex:1,
                            backgroundColor: '#0004',

              justifyContent:'center',
              }}>


<View style={{width:'85%',height:'85%',flexDirection:'column',justifyContent:'center', paddingVertical:10 ,paddingHorizontal:10, alignSelf:'center',borderRadius:10}}>

<View style={{width:'100%',height:'90%',justifyContent:'center', flexDirection:'column'}} > 
<Image source={require('./src/Assets/Images/updat.png')} style={{width:'100%',height:'70%', resizeMode:'contain'}}/>

<View style={{backgroundColor:'white', marginTop:-15, justifyContent:'center',alignSelf:'center',  width:'100%', height:'10%'}} >
<TouchableOpacity 
  onPress={() => { BackHandler.exitApp();
          Linking.openURL(url);}}
style={{width:'55%',height:'60%', backgroundColor:'#31c396',alignSelf:'center',justifyContent:'center', borderRadius:25}}>
<Text style={{alignSelf:'center',textAlign:'center', color:'white',fontSize:16}}> UPGRADE</Text>
</TouchableOpacity>
</View>
<View style={{width:'100%',height:'5%',backgroundColor:'white'}}></View>
</View>


</View>











   
</View>
   
   

      
        </Modal>
: <NavigationContainer>
   <AppNavigator />
  </NavigationContainer> }
 
  </>
 );
}

export default App;




















// //   export default App;