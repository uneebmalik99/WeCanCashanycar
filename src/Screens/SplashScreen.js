import React,{useEffect,useState} from 'react';
import { Image,View,Button,TouchableOpacity,Text,Modal, ImageBackground, BackHandler, Linking } from 'react-native';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import NetInfo from "@react-native-community/netinfo";

import Snackbar from 'react-native-snackbar';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AppUrlcollection from '../AppUrl/AppUrlcollection'
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import Appcolors from '../AppColors/Appcolors';
import VersionCheck from 'react-native-version-check';

import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';



let visible = false;


const SplashScreen =  ({ navigation  }) => {



const Check =async () =>{
  console.log('Checking permsiion function call');
  const enabled = await messaging().hasPermission();
  console.log('Checking permsiion function call enabled',enabled)
  if(enabled){
   // getToken()

  }else{
    this.requestPermissions();

  }


}
const getToken =async () =>{

    let fcmToken=await messaging().getToken();

    if(fcmToken){

      AppConstance.USER_TOKEN = fcmToken;
      console.warn('Token:: '+  AppConstance.USER_TOKEN)


     // eOsYKYRZRPOGqiQrr0jng9:APA91bF7gRLZTy_BR3b4o03PslIbl6Pnjz-oS9u8nYhP8Dp-ihvPlx7rVYbPfJWpYmOUaVzbCxqt_Q_cv0_EQHK3R6fTaPlW6-FMWISL0_AdRps1UW0phPpB6bQECVUN5wwt0AGHOBw4
  }

  
  
}

const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
};

const showSnackbarMessage =async () => {
  setTimeout(() => {
    Snackbar.show({
      backgroundColor: Appcolors.toolbarColor,
      title: 'No Internet Available',
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'Retry',
        textColor: 'white',
        onPress: () => { next() },
      },
    });
  }, );
};

const [Update, setUpdate] = useState(false);

  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');
 const[fireBaseToken ,setfireBaseToken] = useState('');
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
    // alert(
    //   'Application Update',
    //   'Some major app updates are available Please Update the app to continue to bidding.',

    //   [
    //     {
    //     text:'Update',
    //     onPress:()=>{
    //       BackHandler.exitApp();
    //       Linking.openURL(url);
    //       // Linking.openURL(https://play.google.com/store/apps/details?id=com.carauctionuae);

    //     },
    //   },
    // ],
    // {cancelable: false},
    // );
  }else{
    console.log('no update need');
  }
}
  catch(error ){

    
  }
}
const next =  ()=>{
  NetInfo.addEventListener(state => {
    'connectionChange'
});

NetInfo.fetch().then(state => {
if (state.isConnected == true) {


 // checkUpdateNeeded();

// Check()
PushNotification.configure({
// (optional) Called when Token is generated (iOS and Android)
// onRegister: function (token) {
//   console.log("TOKEN:", token);
// },

// (required) Called when a remote is received or opened, or local notification is opened
onNotification: function (notification) {
  console.log("NOTIFICATION:", notification);

  console.log("NOTIFICATION:;;", notification.body);

  
let v = notification.message;
if(v !== undefined)
{
  // process the notification
alert(notification.message)
}else{

}
  // (required) Called when a remote is received or opened, or local notification is opened
  // notification.finish(PushNotificationIOS.FetchResult.NoData);
},
// onNotificationOpened: function(){

// },

// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
onAction: function (notification) {
  console.log("ACTION:", notification.action);
  console.log("NOTIFICATION:", notification);

  // process the action
},

// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
// onRegistrationError: function(err) {
//   console.error(err.message, err);
// },

// IOS ONLY (optional): default: all - Permissions to register.
permissions: {
  alert: true,
  badge: true,
  sound: true,
},

// Should the initial notification be popped automatically
// default: true
popInitialNotification: true,


requestPermissions: true,
});

   



AsyncStorage.getItem('IS_USER_LOGIN').
then((value) => {
console.warn(value);
  if (value == '1') {

    navigation.navigate('AppDrawerScreen')          
    }  else {
    navigation.navigate('Welcome')

  }

}).catch((error) => console.log(error))


}
else{
// alert('No Net')
showSnackbarMessage()
}

}
)

}
  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.warn('Message handled in the background!', remoteMessage);
//     alert(remoteMessage.sentTime)
//   });
next();
    // setTimeout(() => {
     


         
    // }, 30000);
    
  }, [])
          
  
  return(
  <View style={{ width:deviceWidth ,justifyContent:'center', height:deviceHeight,backgroundColor:'#e5e6e9', flexDirection:'column',  flex:1}}>

<View  style={{alignItems:'center'}}>
<Image 
style={{width:'75%',height:'75%'}}

resizeMode='contain'
                 source={require('../Assets/icons/logofinal.jpeg')}


 />



 </View>
{/* <Snackbar  visible={false} textMessage="Hello There!" actionHandler={()=>{console.log("snackbar button clicked!")}} actionText="let's go"/>  */}

</View>);


};

export default SplashScreen;

