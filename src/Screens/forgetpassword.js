import React from 'react';
import { ScrollView,Image, View,Button,TouchableOpacity,Text, ImageBackground } from 'react-native';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import Elavation from '../styles/Elavation';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';


const forgetpassword =  ({ navigation  }) => {
  
  return(

<ScrollView>
<ImageBackground  style={{width:"100%",height:deviceHeight}}
                 source={require('../Assets/Images/car-1.png')}


>
<View 
style={{marginTop:10, justifyContent:'center', width:deviceWidth, alignItems:'center', flexDirection:'column', }}>


<Image 
style={{width:'45%',height:'45%', marginBottom:60}}

resizeMode='contain'
                 source={require('../Assets/icons/logofinal.jpeg')}


 />

<TouchableOpacity
style={{  justifyContent:'center', paddingHorizontal:20, marginTop:10 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#FF8C00' }}
onPress={()=> {navigation.navigate('SignIn')}}
>
<Text style={{ fontWeight:'bold',  alignSelf:'center', color:'black'}}>Sign In</Text>


</TouchableOpacity>


<TouchableOpacity
style={{  justifyContent:'center', paddingHorizontal:20, marginTop:10 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#FF8C00' }}
onPress={()=> {navigation.navigate('SignUp')}}
>
<Text style={{ fontWeight:'bold',  alignSelf:'center', color:'black'}}>Sign Up</Text>


</TouchableOpacity>
</View>




</ImageBackground>

</ScrollView>





);
};

export default forgetpassword;
