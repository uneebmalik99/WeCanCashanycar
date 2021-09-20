import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform,  AppState } from 'react-native';
import { not } from 'react-native-reanimated';



class LocalNotificationServies {
    configure  =(onOpenNotification)=>{
        // Check()
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function (token) {
    //   console.log("TOKEN:", token);
    // },
    
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);


    //   if(!notification?.data){
    //       return
    //   }
    //   notification.userInteraction =true;
    //   onOpenNotification(Platform.Os === 'ios' ? notification.data.item : notification.data);

    //   if(Platform.OS === 'ios'){

    //     notification.finish(PushNotificationIOS.FetchResult.NoData)
    //   }
      
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
    onNotificationOpened: function(){
    
    },
    
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
    
      
    }
}

export const localNotificationServies = new LocalNotificationServies()