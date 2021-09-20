import { Platform,  AppState } from 'react-native';
import messaging from '@react-native-firebase/messaging';

class FCMSERVIES{

    register = (onNotification,onOpenNotification)=>{
        this.createNotificationListeners(onNotification,onOpenNotification)
    }


createNotificationListeners = (onNotification,onOpenNotification) =>{
        // Register background handler
messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('[FCM Servies] from background', remoteMessage);
    if(remoteMessage){
        const notification=remoteMessage.notification
        onOpenNotification(notification)
    }
  });


//when app open from quit state
messaging().getInitialNotification().then(remoteMessage => {
    console.log('[FCM Servies] get initail notification ', remoteMessage);
    if(remoteMessage){
        const notification=remoteMessage.notification
        onOpenNotification(notification)
    }
  });


this.messageListener =messaging().onMessage(async remoteMessage => {
    console.log('[FCM Servies] new message arrived notification ', remoteMessage);
    if(remoteMessage){
        let notification =null
        if(Platform.OS === 'ios'){
            notification= remoteMessage.data.notification;
        }else{
            notification= remoteMessage.notification
        }
        onNotification(notification)
    }
  });


    }

    unRegister=()=>{
        this.messageListener()
    }
}

export const fcmServies = new FCMSERVIES(); 