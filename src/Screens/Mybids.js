import React,{useState,useEffect} from 'react';
import {Image, TextInput,View,Button,TouchableOpacity,Text, } from 'react-native';
import DialogLoder from '../utils/DialogLoder';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import AsyncStorage from '@react-native-community/async-storage';

const Mybids = ({ navigation }) => {  
  const [loading, setloading] = useState(false);
  const [names, setnames] = useState();
  const [emails, setemails] = useState('');
  const [start, setstartlimit] = useState('');
  const [end, setend] = useState('');
  const [phone, setphone] = useState('');
  const [profilepic, setprofilepic] = useState('');
  AsyncStorage.getItem('name').
  then((value) => {
    //console.warn("kkkkkk"+value);
    setnames(value)
 
  })
  AsyncStorage.getItem('email').
  then((value) => {
    //console.warn("kkkkkk"+value);
    setemails(value)
  })
  AsyncStorage.getItem('startLimit').
  then((value) => {
    //console.warn("kkkkkk"+value);
    setstartlimit(value)
  })
  AsyncStorage.getItem('endLimit').
  then((value) => {
    //console.warn("kkkkkk"+value);
    setend(value)
  })
  AsyncStorage.getItem('phone').
  then((value) => {
    //console.warn("kkkkkk"+value);
    setphone(value)
  })
  
const _getdata = async () => {

try {
  setloading(true)

        const value = await AsyncStorage.getItem('name');
        if (value !== null) {

console.warn('ok1');          setnames(value)
          try {
            const value2 = await AsyncStorage.getItem('startLimit');
            const value3 = await AsyncStorage.getItem('endLimit');
            const value4 = await AsyncStorage.getItem('email')
            const value5 = await AsyncStorage.getItem('phone')
            if (value2 !== null && value3 !== null) {
              setstartlimit(value2)
              setend(value3)
              if(value4 !== null){
                setemails(value4)
                setphone(value5)
                console.warn('ok');          
              }
            }
      }catch{
        setloading(false)

      }
    }
  }
    catch (error) {
      setloading(false)
      this._getdata();
        console.warn('error at saving' + err);
        // Error retrieving data
      }
    }
  
  

    useEffect(() => {  


  

  });
    return (<View>
      {/* <DialogLoder loading={loading} /> */}

<View
     style={{ height:50, justifyContent:'center', paddingHorizontal:20,backgroundColor:'#268ef5',paddingVertical:5,}}
   >  

<TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
  alignContent:'flex-start',alignSelf:'flex-start', }}
 
 onPress={() => navigation.toggleDrawer()}
 >
      <Image source={ require('../Assets/icons/list1.png')} 
 style={{ width: 24, height:24,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
/>
  </TouchableOpacity>
<Text style={{justifyContent:'center',textAlign:"center",color:'white' , fontSize:16}} >Profile</Text>

                </View>


<View
style={{justifyContent:'center', width:deviceWidth,flexDirection:'column'}}
>
 <Image 
    source={require('../Assets/Images/account.png')}  
    style={{width: 70,alignSelf:'center', height: 70,marginTop:40, borderRadius: 400/ 2}} 
/>
<Text style={{color:'orange', alignSelf:'center',marginBottom:10, marginTop:5,fontSize:15}} >{names}</Text>
<TextInput
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
</TextInput>

</View>














</View>


    );
  };
 
export default Mybids;