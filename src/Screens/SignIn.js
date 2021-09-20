import React,{ useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground } from 'react-native';
import Appcolors from '../AppColors/Appcolors';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import Elavation from '../styles/Elavation';
import AppUrlcollection from '../AppUrl/AppUrlcollection'
import loader from '../utils/loader';
import AsyncStorage from '@react-native-community/async-storage';
import DialogLoder from '../utils/DialogLoder';
import messaging from '@react-native-firebase/messaging';
import Emailverficationscreens from './Emailverficationscreens';

import DeviceInfo from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';
import NetInfo from "@react-native-community/netinfo";
import { getUniqueId, getManufacturer } from 'react-native-device-info';

const SignIn =  ({ navigation  }) => {
  const [loading, setloading] = useState(false);
  const [User_id, setUser_id] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [fcmtoken, setfcmtoken] = useState('')
// const [password,setpassword] =setState("null")

const [object, setobject] = useState([]);

const Check =async (r) =>{
  console.log('Checking permsiion function call');
  const enabled = await messaging().hasPermission();
  console.log('Checking permsiion function call enabled',enabled)
  if(enabled){
    getToken(r)

  }else{
    this.requestPermissions();

  }


}
const getToken =async (r) =>{

    let fcmToken=await messaging().getToken();

    if(fcmToken){


     // _storeData()

      AppConstance.USER_TOKEN = fcmToken;
      let fcm = fcmToken
      console.warn('Token:: '+  AppConstance.USER_TOKEN)
      _storeData(r,fcm)

     // eOsYKYRZRPOGqiQrr0jng9:APA91bF7gRLZTy_BR3b4o03PslIbl6Pnjz-oS9u8nYhP8Dp-ihvPlx7rVYbPfJWpYmOUaVzbCxqt_Q_cv0_EQHK3R6fTaPlW6-FMWISL0_AdRps1UW0phPpB6bQECVUN5wwt0AGHOBw4
  }

  
  
}


const _storeData = async (r,fcm) => {

try{

let data =r;

let i = data.id;
i=i.toString();
  setUser_id({i})
  AppConstance.USER_INFO.USER_ID = i;
  AppConstance.IS_USER_LOGIN ='1';
  AppConstance.USER_INFO.USER_NAME = data.name
  AppConstance.USER_INFO.USER_EMAIL = email;
  AppConstance.USER_INFO.USER_ZIP_CODE = password;

await AsyncStorage.setItem('USER_ID', i);            
await AsyncStorage.setItem('IS_USER_LOGIN', '1');
await AsyncStorage.setItem('pass', password);
await AsyncStorage.setItem('fcmtoken', fcm.toString());
await AsyncStorage.setItem('startLimit', data.startLimit.toString());
await AsyncStorage.setItem('endLimit', data.endLimit.toString());
await AsyncStorage.setItem('profile_pic', data.profile_pic);
await AsyncStorage.setItem('email', email);
await AsyncStorage.setItem('pass', password);
await AsyncStorage.setItem('phone', data.phone.toString());
await AsyncStorage.setItem('name', data.name.toString());
await AsyncStorage.setItem('dob', data.DOB.toString());
await AsyncStorage.setItem('eid', data.EIDnumber.toString());


showSnackbarMessage()

setloading(false)



navigation.navigate('AppDrawerScreen')



}
catch(err){
  console.warn('error at saving siginin'+err);
}
  // try {
  //   await AsyncStorage.setItem(

  //    'IS_USER_LOGIN', '1'

    
  //   );
  //   // _storeData2()
  // } catch (error) {
  //   // Error saving data
  // }
};


const showSnackbarMessage =()=> {
  setTimeout(() => {
      Snackbar.show({
          backgroundColor: Appcolors.toolbarColor,
          title: "Login Successfully",
          duration: Snackbar.LENGTH_SHORT,
      });
  }, 100);

}

const signin = async () =>{

  var url = AppUrlcollection.LOGIN;
  var value = new FormData();
  // value.append('username', 'info@impulsiontechnologies.com');
  // value.append('password', '20190021');
  value.append('email', email);
  value.append('password',password);
  
  console.log('Login_key_vale ',value)



  let res = await fetch(
    url,
    {
      method: 'POST',
      body: value,
      headers: {
        'Accept': 'application/json',

        'Content-Type': 'multipart/form-data ',
      },
    }
  );
  let responseJson = await res;
  console.warn(responseJson)
  setloading(false)




}
  const F_signIn =  () =>{

setloading(true)
    if (email.length === 0) {
      setloading(false)

      alert('username can not be blank');
       
    
      } else if (password.length === 0) {
        setloading(false)

          alert("password can not be blank"); 
    
      } else {
          NetInfo.fetch().then(state => {
              if (state.isConnected == true) {
                console.warn("working1")
                  // this.setState({ isLoading: true });


                  //signin()

                  var url = AppUrlcollection.LOGIN;
  var value = new FormData();
  // value.append('username', 'info@impulsiontechnologies.com');
  // value.append('password', '20190021');
  value.append('email', email);
  value.append('password',password);
  
  console.log('Login_key_vale ',value)
                  fetch(url, {
                      method: 'POST',
                      headers: {
                        
                        // 'Accept': 'application/json',
                        //   'Content-Type': 'multipart/form-data',
                          // 'Client-Service': AppConst.CLIENT_SERVICE,
                          // 'Auth-Key': AppConst.AUTH_KEY
                      },
                      body: value,
                  })
                      .then((response) => response.json())
                      .then((responseJson) => {

                        console.log(responseJson);
                        if(responseJson.status === true){
                          if(responseJson.data.approved === 1){

                            setobject(responseJson.data)
                            Check(responseJson.data)


                           
                   
                                
                                                    
                          }


                        }else{
                          if(responseJson.data === 'You are not approved yet, please contact admin.')   {   
                            setloading(false)
        
                             alert(responseJson.data)

                          }else{
                            setloading(false)

                            alert('Incorrect Email or Password')

                            
                          }
                        }

//                         if(responseJson == "nanana"){
//                           setloading(false)
//                           alert('No Record found')
 
//                         }
//                         else{
//                           setloading(false)


                        

//                         _storeData(responseJson.data)


                        
//             navigation.navigate('AppDrawerScreen')
    
// //                           console.warn(error)
//                         }
                      });
           
                    }
              else {
                setloading(false)

                       alert("Internet not found")
              }
    
          });
    
    
      }
    // callingLoginApi
    let deviceId = DeviceInfo.getDeviceId();
    console.warn(deviceId)

    DeviceInfo.getAndroidId().then(androidId => {
        // alert(androidId)
      });

}
  
  return(<View >


<ScrollView>
{/* <ImageBackground  style={{width:"100%",height:deviceHeight}}
                 source={require('../Assets/Images/car-1.png')}
> */}
<View 
style={{marginTop:130, justifyContent:'center', width:deviceWidth, alignItems:'center', flexDirection:'column', }}>
                <DialogLoder loading={loading} />


<Image  
             style={{width:60,height:60 , justifyContent:"center"}}
             source={require('../Assets/Images/account.png')}
           />
<TextInput
style={{marginTop:30,  paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Email'
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
  setEmail(text)
}}
// onChangeText={(text) => setemail(text )}
>
</TextInput>
<TextInput
style={{ paddingHorizontal:20, marginTop:10, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Password'
secureTextEntry={true}
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
  setPassword(text)
}}



// onChangeText={(text) => setpassword( {text} )}
>
</TextInput>
<View
style={{ paddingHorizontal:20, marginTop:10, borderRadius:20,width: deviceWidth * 0.8, height: 30, color: '#323232', }}
>
<TouchableOpacity
onPress={()=> navigation.navigate('Emailverficationscreens')}

>
<Text style={{alignSelf:'flex-end', color:'orange'}}>Forget password</Text>

</TouchableOpacity>

</View>
{/* <TouchableOpacity
style={{  justifyContent:'flex-end', paddingHorizontal:15, marginTop:5 ,   borderRadius:20,width: deviceWidth * 0.8,  color: '#323232', }}
onPress={callingAuctionApi}
>
<Text style={{  fontWeight:'bold',  alignSelf:'flex-end', color:'orange'}}>Forgot Password</Text>


</TouchableOpacity> */}



<TouchableOpacity
style={{  justifyContent:'center', paddingHorizontal:20, marginTop:20 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#FF8C00' }}
onPress={F_signIn}
>
<Text style={{ fontWeight:'bold',  alignSelf:'center', color:'black'}}>Sign In</Text>


</TouchableOpacity>
</View>





</ScrollView>


            
</View>);
};

export default SignIn;