import React from 'react';
import { ScrollView,Image, View,Button,TouchableOpacity,Text, ImageBackground } from 'react-native';
import Appcolors from '../AppColors/Appcolors';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import Elavation from '../styles/Elavation';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/dist/Entypo';



const termsandConditions =  ({ navigation  }) => {


  
  return(
<SafeAreaView  style={{ backgroundColor:'#268ef5',}}> 

                           <View
     style={{ height:50,width:deviceWidth,flexDirection:'row',paddingHorizontal:6, backgroundColor:'#268ef5',}}
   >  
<View style={{justifyContent:'center',width:'11%', }}>
  
  <TouchableOpacity style={{ height:'100%',justifyContent:'center', 
}}
 
onPress={() => navigation.toggleDrawer()}
>
<Entypo name='menu' size={30} color='white'/>

      {/* <Image source={ require('../Assets/icons/list1.png')} 
 style={{ width: 24, height:24, alignSelf: 'center' }} resizeMode='contain'
/> */}
  </TouchableOpacity>
  </View>
  <View style={{width:'78%',height:'100%',justifyContent:'center', }}>

  <Text style={{alignSelf:'center', textAlign:"center",color:'white' , fontSize:16}} >Terms and Conditions</Text>

  </View>
  <View style={{justifyContent:'center',width:'11%',}}>
</View>

                </View>

                <View style={{width:deviceWidth,backgroundColor:'white', height:deviceHeight}}>

  <Text style={{alignSelf:'center'}}>termsandConditions</Text>
  </View>
</SafeAreaView>




);
};

export default termsandConditions;


// import Appcontants, { deviceHeight, deviceWidth } from '../AppConstants/Appconstant';


// const Welcome =  ({ navigation  }) => {

  
//   return(
//   <View style={{ width:"100%" ,  height:deviceHeight, flexDirection:'column',  flex:1}}>
// <ImageBackground 
// style={{width:"100%" ,eight:deviceHeight}}
// source={ require('../Assets/Images/car-1.png')} 
// >
//     <TouchableOpacity onPress={()=> {navigation.navigate('SignIn')}}>
// <Text>Sign In</Text>

//     </TouchableOpacity>

//     <TouchableOpacity onPress={()=> {navigation.navigate('SignUp')}}>
// <Text>Sign Up</Text>

//     </TouchableOpacity>
// </ImageBackground>
// </View>);
// };

// export default Welcome;