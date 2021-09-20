import React,{useState} from 'react';
import { ScrollView,Image, View,Button,TouchableOpacity,Text,TextInput, ImageBackground } from 'react-native';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import Elavation from '../styles/Elavation';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import DialogLoder from '../utils/DialogLoder';



const Emailverficationscreens =  ({ navigation  }) => {

const [email, setemail] = useState('')
const [loading, setloading] = useState(false)

const checkemail = () =>{

if(email !== ''){
  setloading(true)
  var vv= 'http://68.183.179.25/api/resetPassword?'+'email='+email;
console.warn('working1')
 
 fetch(vv, {
    method: 'GET',
    headers: {
     Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
      
  })
    .then((response) =>  response.json())
    .then((responseJson) => {
if(responseJson.data === 'Email sent to you'){
  alert('Email sent to you.')
  setloading(false)
  navigation.navigate('forgettokenverfication')


}else if(responseJson.data === 'No record exist against this email'){
  alert('No Email Existing')
  setloading(false)

}else{
  alert('Server Error')
  setloading(false)

}
console.log(responseJson.data);
  
    })
    .catch((error) => {
      setloading(false)
      alert(error)
      console.warn(error)
    });
  }
} 

const check = ()=>{
  alert('w')
}
  return(

<ScrollView>
<ImageBackground  style={{width:"100%",height:deviceHeight}}
                 source={require('../Assets/Images/img.png')}


>
                <DialogLoder loading={loading} />

<View 
style={{marginTop:10, justifyContent:'center', width:deviceWidth, alignItems:'center', flexDirection:'column', }}>

                <DialogLoder loading={loading} />

<Image 
style={{width:'45%',height:'45%', marginBottom:60}}

resizeMode='contain'
                 source={require('../Assets/icons/logofinal.jpeg')}


 />

<TextInput
style={{ paddingHorizontal:20, marginTop:10, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Please enter your email'
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
  setemail(text)
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




</ImageBackground>

</ScrollView>





);
};

export default Emailverficationscreens;
