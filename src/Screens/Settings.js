import React,{useState,useEffect,Component} from 'react';
import {Image, TextInput,View,Button,ImageBackground,TouchableOpacity,SafeAreaView,Text,BackHandler } from 'react-native';
import DialogLoder from '../utils/DialogLoder';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import AsyncStorage from '@react-native-community/async-storage';
import Appcolors from '../AppColors/Appcolors';
import Elavation from '../styles/Elavation';
import Entypo from 'react-native-vector-icons/dist/Entypo';



class Settings extends Component {
  constructor(navigation) {
    super(navigation);


    this.state = {
 
      loading:false,
      Names:'',
      emails:'',
      start:'',
      end:'',
      DOB:'',
      Eid:'',
      phone:'',
      profilepic:'',
     
    };
 
  }
  
_getdata = async () => {


  let s=  await AsyncStorage.getItem('startLimit');
  this.setState({start:s});
  let e=  await AsyncStorage.getItem('endLimit');
  this.setState({end:e})
  let mail=  await AsyncStorage.getItem('email');
  this.setState({emails:mail})
  let pho=  await AsyncStorage.getItem('phone');
  this.setState({phone:pho})
  let name=  await AsyncStorage.getItem('name');
  this.setState({Names:name})
  console.warn(name+this.state.Names);
  let p= await AsyncStorage.getItem('profile_pic');
  this.setState({profilepic:p})
  let dob= await AsyncStorage.getItem('dob');
  this.setState({DOB:dob})
  let eid= await AsyncStorage.getItem('eid');
  this.setState({Eid:eid})
}



componentDidMount() {
  const unsubscribe =  this.props.navigation.addListener('focus', () => {
    // setCount(0);
    console.warn('iii');
   });
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
console.warn('baxk');
  this._getdata()

}   


handleBackPress = () => {
  // this.props.navigation.goBack();
  // this.props.navigation("AppDrawerScreen");
  BackHandler.exitApp();
  return true;

}
render() {
  let image = this.state.profilepic;
  return (<SafeAreaView  style={{ backgroundColor:'#268ef5',}}> 

      <DialogLoder loading={this.state.loading} />

{/* <View
     style={{ height:50, justifyContent:'center', paddingHorizontal:20,backgroundColor:'#268ef5',paddingVertical:5,}}
   >  

<TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
  alignContent:'flex-start',alignSelf:'flex-start', }}
 
 onPress={() => this.props.navigation.toggleDrawer()}
 >
      <Image source={ require('../Assets/icons/list1.png')} 
 style={{ width: 24, height:24,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
/>
  </TouchableOpacity>
<Text style={{justifyContent:'center',textAlign:"center",color:'white' , fontSize:16}} >Profile</Text>

                </View> */}


                <View
     style={{ height:50,width:deviceWidth,flexDirection:'row',paddingHorizontal:6, backgroundColor:'#268ef5',}}
   >  
<View style={{justifyContent:'center',width:'11%', }}>
  
  <TouchableOpacity style={{ height:'100%',justifyContent:'center', 
}}
 
onPress={() => this.props.navigation.toggleDrawer()}
>
<Entypo name='menu' size={30} color='white'/>

      {/* <Image source={ require('../Assets/icons/list1.png')} 
 style={{ width: 24, height:24, alignSelf: 'center' }} resizeMode='contain'
/> */}
  </TouchableOpacity>
  </View>
  <View style={{width:'78%',height:'100%',justifyContent:'center', }}>

  <Text style={{alignSelf:'center', textAlign:"center",color:'white' , fontSize:16}} >Profile</Text>

  </View>
  <View style={{justifyContent:'center',width:'11%',}}>
</View>

                </View>
{/* <ImageBackground

style={{width:"100%",height:deviceHeight}}
                 source={require('../Assets/Images/prifilebg.jpg')}
> */}



{/* <Elavation
                     
                     elevation={3}
                     style={{   backgroundColor:'#0006',marginBottom: 3, paddingTop: 8, paddingBottom: 8, borderRadius: 15, marginTop: 102 }}
                 >

                 <Text>gjgjggug</Text>
                 </Elavation> */}


<View
style={{justifyContent:'center',backgroundColor:'white', width:deviceWidth,flexDirection:'column'}}
>

{this.state.profilepic !== '' ?
    <Image style={{width: 100,alignSelf:'center', height: 100,marginTop:40,borderWidth:1,borderColor:'white', borderRadius: 400/ 2}}
             source={{ uri:'http://68.183.179.25/image/'+image}}  />: 
             
             
                    <Image style={{ width: 70,alignSelf:'center', height: 70,marginTop:40, borderRadius: 400/ 2 }}  source={require('../Assets/Images/account.png')} />}

 {/* <Image 
    source={require('../Assets/Images/account.png')}  
    style={{width: 70,alignSelf:'center', height: 70,marginTop:40, borderRadius: 400/ 2}} 
/> */}
<Text style={{color:'orange', alignSelf:'center',marginBottom:10, marginTop:10,fontSize:17}}>{this.state.Names}</Text>


<View
style={{alignSelf:'center',marginTop:10, paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, color: '#323232',backgroundColor:'#0005'}}>

<TextInput
style={{ fontSize:14,alignSelf:'center',marginBottom:5, paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232', }}
value={'Email: '+this.state.emails}
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
}}

>
</TextInput>

<TextInput
style={{ fontSize:14,alignSelf:'center', paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232', }}
value={'Phone:'+this.state.phone}
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
}}

>


</TextInput>
<TextInput
style={{ fontSize:14,alignSelf:'center', paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232', }}
value={'Date of birth:'+this.state.DOB}
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
}}

>


</TextInput>

<Text style={{fontSize:15,textAlign:'center',marginTop:5,paddingVertical:3, color:'orange'}}>Auction Bid Range</Text>
<View style={{flexDirection:'row',marginBottom:10, marginTop:10, justifyContent:'center',alignContent:'center',alignSelf:'center'}}>
<Text style={{fontSize:14,borderRadius:20,borderWidth:0.4,borderColor:'white', paddingHorizontal:10,paddingVertical:5, textAlign:'center', color:'orange'}}>{this.state.start} AED</Text>
<Text style={{fontSize:14,borderRadius:20,borderWidth:0.4,borderColor:'white', marginLeft:10,paddingHorizontal:10,paddingVertical:5,textAlign:'center', color:'orange'}}>{this.state.end} AED</Text>
</View>


</View>

{/* <TextInput
style={{ fontSize:14,alignSelf:'center',marginBottom:10, paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
value={emails}
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
}}

>
</TextInput>

<TextInput
style={{ fontSize:14,alignSelf:'center', paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
value={names}
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
}}

>
</TextInput> */}

</View>


</SafeAreaView>);
  };
}
 
export default Settings;