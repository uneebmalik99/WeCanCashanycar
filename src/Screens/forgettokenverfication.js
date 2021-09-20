import React,{useState} from 'react';
import { ScrollView,Image, View,Button,TouchableOpacity,Text,TextInput, ImageBackground } from 'react-native';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import Elavation from '../styles/Elavation';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import DialogLoder from '../utils/DialogLoder';



const forgettokenverfication =  ({ navigation  }) => {

const [code, setcode] = useState('')
const [password, setpassword] = useState('')
const [passwordconfirmation, setpasswordconfirmation] = useState('')
const [loading, setloading] = useState(false)

const checkemail = () =>{

if(code !== ''){
  if(password !== ''){
    if(passwordconfirmation !== ''){
      if(passwordconfirmation === password){
        setloading(true)
        var vv= 'http://68.183.179.25/api/resetPasswordToken?'+'remember_token='+code+'&password='+password+'&password_confirmation='+passwordconfirmation;
      console.warn('working1')
       
       fetch(vv, {
          method: 'POST',
          headers: {
           Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
            
        })
          .then((response) =>  response.json())
          .then((responseJson) => {
      if(responseJson.status === true){
        alert('Password Changed successfully.')
        setloading(false)
         navigation.navigate('SignIn')
      
      
      }
      
     else if(responseJson.status === false){
        alert(responseJson.response)
        console.warn(responseJson);
        setloading(false)
      
      }
      console.log(responseJson.data);
        
          })
          .catch((error) => {
            setloading(false)
            alert(error)
            console.warn(error)
          });
      }else{
        alert('Please Match your password')
      }
    }else{
      alert('Please enter Confirm Password')
    }
  }else{
    alert('Please enter password')
  }
  
  }else{
    alert('Please enter Code')
  }
} 


  return(

<ScrollView>
{/* <ImageBackground  style={{width:"100%",height:deviceHeight}}
                 source={require('../Assets/Images/car-1.png')}


> */}
                <DialogLoder loading={loading} />

<View 
style={{marginTop:10, justifyContent:'center', width:deviceWidth, alignItems:'center', flexDirection:'column', }}>

                <DialogLoder loading={loading} />

<Text style={{color:'grey', marginTop:10,marginBottom:10}}>Please Enter Code that you received in email.</Text>

<TextInput
style={{ paddingHorizontal:20, marginTop:10, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Please enter code Here'
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
  setcode(text)
}}
>
</TextInput>



<TextInput
style={{ paddingHorizontal:20, marginTop:10, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Password'
placeholderTextColor='orange'
color='orange'
secureTextEntry={true}

onChangeText={(text) => {
  setpassword(text)
}}
>
</TextInput>


<TextInput
style={{ paddingHorizontal:20, marginTop:10, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Confirm Password'
placeholderTextColor='orange'
color='orange'
secureTextEntry={true}

onChangeText={(text) => {
  setpasswordconfirmation(text)
}}
>
</TextInput>


<TouchableOpacity
style={{  justifyContent:'center', paddingHorizontal:20, marginTop:10 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#FF8C00' }}
onPress={()=> checkemail()}
>
<Text style={{ fontWeight:'bold',  alignSelf:'center', color:'black'}}>Next</Text>


</TouchableOpacity>
</View>





</ScrollView>





);
};

export default forgettokenverfication;
