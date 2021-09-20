/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';


//Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.warn('Index Message handled in the background!', remoteMessage);
//     alert(remoteMessage.notification.body)
//   });
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => firebaseBackgroundMessage);
