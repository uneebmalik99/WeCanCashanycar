import React, {useState} from 'react';
import { View,Picker, Text, Button,TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground } from 'react-native';
import Appcolors from '../AppColors/Appcolors';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import Elavation from '../styles/Elavation';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import AppUrlcollection from '../AppUrl/AppUrlcollection'
import DocumentPicker from 'react-native-document-picker';
import DialogLoder from '../utils/DialogLoder';
import DatePicker from 'react-native-datepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';



const SignUp =  ({ navigation  }) => {
  const [loading, setloading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
    const [Password, setPassword] = useState("");
  const [EIDNumber, setEIDNumber] = useState("");
  const [Dealer, setdealerini] = useState("java");

  const [DOB, setDOB] = useState("Select Date of birth");
  const [EIDFrontImg, setEIDFrontImg] = useState();
  const [EIDBackImg, setEIDBackImg] = useState();
  const [ProfileImage, setProfileImage] = useState('');

  const [singleFile, setSingleFile] = useState(null);


  const [front, setfront] = useState('EID Front Image');
  const [back, setback] = useState('EID Back Image');


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = (date) => {
    let dat=date.toString();
    console.warn("A date has been picked: ", dat);
    let d=moment(dat).format('DD-MM-yy');
    setDOB(d)
    hideDatePicker();
  };

const ChooseImageEFI =() =>{
  const options ={ noData: true
  };
  ImagePicker.launchImageLibrary(options, response =>{
    console.log('response',response);
    if(response.uri){
      let EFI = response.uri; 
      setEIDFrontImg({EFI})


    }
  }) 

}

const ChooseImageEBI =() =>{
  const options ={ noData: true
  };
  ImagePicker.launchImageLibrary(options, response =>{
    console.log('response',response);
    if(response.uri){
      let EBI=response.uri;
      setEIDBackImg({EBI})
      let yv = response.fileName;
      // setback({y})
    }
  }) 

}

const ChooseImageProfile =() =>{
  const options ={ noData: true
  };
  ImagePicker.launchImageLibrary(options, response =>{
    console.log('response',response);
    if(response.uri){
      let profile=response.uri;
      ProfileImage({profile})
      let yv = response.fileName;
      // setback({y})
    }
  }) 

}










const F_signUp =()=>{
  //uploadImage()
  if (ProfileImage.length === 0) {
    setloading(false)
    alert('please Upload Profile Picture');
    } else if (Name.length === 0) {
      setloading(false)
        alert("Name can not be blank");   
    } else if (Email.length === 0) {
      setloading(false)
      alert('Email can not be blank');
      } else if (Mobile.length === 0) {
        setloading(false)
          alert("Mobile can not be blank");   
      } else if (Name.length === 0) {
        setloading(false)
          alert("Name can not be blank");   
      } else if (Dealer.length === 0) {
        setloading(false)
        alert('Please Choose dealer Or Individual');
        } else if (DOB.length === 0) {
          setloading(false)
            alert("Date of birth can not be blank");   
        } 

        else if (Password.length === 0) {
          setloading(false)
          alert('Password can not be blank');
          } else if (EIDNumber.length === 0) {
            setloading(false)
              alert("EID Number can not be blank");   
          } else if (EIDFrontImg.length === 0) {
            setloading(false)
              alert("Please Upload EID Front Picture ");   
          } else if (EIDBackImg.length === 0) {
            setloading(false)
            alert("Please Upload EID Back Picture");   
          } 

          // else if(EIDBackImg.size < 3284100){
          //   alert("Please Upload EID Back Image with Size of Maximum 3.5 MB");   


          // }else if(EIDFrontImg.size < 3284100){
          //   alert("Please Upload EID Front   Image with Size of Maximum 3.5 MB");   


          // }else if(ProfileImage.size < 3284100){
          //   alert("Please Upload Profile  Image with Size of Maximum 3.5 MB");   


          // }
          
    
    else {

      callingAuctionApi()

    }


}







const selectFile0 = async () => {
  // Opening Document Picker to select one file
  try {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [DocumentPicker.types.images],
    });
    // Printing the log realted to the file
    console.warn('res : ' + JSON.stringify(res));
    setProfileImage(res);


  } catch (err) {
    setProfileImage(null);
    // Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      // If user canceled the document selection
      alert('Canceled');
    } else {
      // For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};

const selectFile2 = async () => {
  // Opening Document Picker to select one file
  try {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [DocumentPicker.types.images],
    });
    // Printing the log realted to the file
    console.warn('res : ' + JSON.stringify(res));
    setEIDFrontImg(res);


  } catch (err) {
    setEIDFrontImg(null);
    // Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      // If user canceled the document selection
      alert('Canceled');
    } else {
      // For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};


const selectFile3 = async () => {
  // Opening Document Picker to select one file
  try {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [DocumentPicker.types.images],
      // There can me more options as well
      // DocumentPicker.types.allFiles
      // DocumentPicker.types.images
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });
    // Printing the log realted to the file
    console.warn('res : ' + JSON.stringify(res));
    // Setting the state to show single file attributes
    setEIDBackImg(res);
  } catch (err) {
    setEIDBackImg(null);
    // Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      // If user canceled the document selection
      alert('Canceled');
    } else {
      // For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};



const Compressimg = () =>{

  CompressImage.createCompressedImage(imageUri, appDirectory).then((response) => {
    // response.uri is the URI of the new image that can now be displayed, uploaded...
    // response.path is the path of the new image
    // response.name is the name of the new image with the extension
    // response.size is the size of the new image
  }).catch((err) => {
    // Oops, something went wrong. Check that the filename is correct and
    // inspect err to get more details.
  });

}


const callingAuctionApi = () =>{

  setloading(true)
  var vv= 'http://68.183.179.25/api/register'
console.warn('working1')

 const fileToUpload1 = ProfileImage;
 const fileToUpload2 = EIDFrontImg;
 const fileToUpload3 = EIDBackImg;

    const data = new FormData();
    data.append('name', Name);
    data.append('email', Email);
    data.append('password', Password);
    data.append('EIDnumber', EIDNumber);
   
    data.append('DOB', DOB);
   
    data.append('phone', Mobile);
    data.append('EID_front_pic',  {uri: fileToUpload2.uri,name: fileToUpload2.name,filename :fileToUpload2.filename,type: fileToUpload2.type});
    // body.append('Content-Type', 'image/png');
    data.append('EID_back_pic',  {uri: fileToUpload3.uri,name: fileToUpload3.name,filename :fileToUpload3.filename,type: fileToUpload3.type});
    data.append('profile_pic',  {uri: fileToUpload1.uri,name: fileToUpload1.name,filename :fileToUpload1.filename,type: fileToUpload1.type});
//  value.append('EID_back_pic', EIDBackImg);

 fetch(vv, {
    method: 'POST',
    headers: {
     Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
      

  })
    .then((response) =>  response.json())
    .then((responseJson) => {

     let v =  responseJson.status;
      if(v === true){

        setloading(false)

        console.warn('SiginUPppppppppp :: ', responseJson)
        alert(" Account Successfully Created!. Soon Your account will be approve by Admin.")

      } else if(responseJson.response.email){
     
        setloading(false)
        let b =responseJson.response.email.toString();
        alert(b)

      } else if(responseJson.message !== ''){
        setloading(false)
        let b =responseJson.message.toString();
        alert(b)

      }
       

      console.warn('SiginUPppppppppp :: ', responseJson)

        
    })
    .catch((error) => {
      setloading(false)
      alert('Server error please try again'+ error)

        console.warn(error)
    });

} 
 
const [D, setD] = useState('');
const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
const currentDate = selectedDate || date;

console.warn('current'+currentDate+'--'+selectedDate);
setShow(Platform.OS === 'ios');
setDate(currentDate);
console.warn('date'+date);

setD(currentDate)
//  this.setState({ D: currentDate })

};

const showMode = (currentMode) => {
setShow(true);
setMode(currentMode);
};

const showDatepicker = (d) => {
showMode('date');
console.warn('d'+d)
};


  
  return(

<ScrollView>

                <DialogLoder loading={loading} />

<View 
style={{marginTop:10, justifyContent:'center', width:deviceWidth, alignItems:'center', flexDirection:'column', }}>

{/* <Text>{date}</Text> */}

<TouchableOpacity
onPress={selectFile0}

>

{ProfileImage !== '' ?
    <Image style={{ borderRadius:10,  width:70,height:70,marginBottom:15,borderRadius: 400/ 2 }}
             source={{ uri:ProfileImage.uri }}  /> :
             
             
                    <Image style={{ borderRadius:10,marginBottom:15, width:70,height:70 ,borderRadius: 400/ 2 }}  source={require('../Assets/Images/account.png')} />}

{/* <Image 
    source={require('../Assets/Images/account.png')}  
    style={{width: 70,alignSelf:'center',marginBottom:15, height: 70,marginTop:15, borderRadius: 400/ 2}} 
/> */}
</TouchableOpacity>


<TextInput
style={{ fontSize:14, paddingHorizontal:20, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Name'
placeholderTextColor='orange'
color='orange'

onChangeText={(text) => {
  setName(text)
}}

>
</TextInput>

<TextInput
style={{fontSize:14, paddingHorizontal:20, marginTop:10, borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Email'
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
  setEmail(text)
}}

>
</TextInput>

<TextInput
style={{fontSize:14,paddingHorizontal:20,  marginTop:10,borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Mobile'
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
  setMobile(text)
}}

>
</TextInput>

<View
      style={{ paddingHorizontal:15, marginTop:10 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}

      >
      <Picker
        selectedValue={Dealer}
        style={{ height: 50,width: deviceWidth * 0.8,  color:'orange' , backgroundColor:'#0006' }}
        onValueChange={(itemValue, itemIndex) => setdealerini(itemValue)}
      >
        <Picker.Item label="Dealer" value="Dealer" />
        <Picker.Item label="Individual" value="Individual" />
      </Picker>  
      </View>

<TouchableOpacity
onPress={showDatePicker}
style={{ fontSize:14,backgroundColor:'#0006' , paddingHorizontal:25,marginTop:10 ,   borderRadius:20, width: deviceWidth * 0.8,justifyContent:'center',alignItems:'flex-start',alignContent:'center', height: 50,}}
>
<Text
style={{color:'orange',}}
 >{DOB}</Text>


</TouchableOpacity>


<DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <TextInput
style={{ paddingHorizontal:22, marginTop:10 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='Password'
placeholderTextColor='orange'
color='orange'
secureTextEntry={true}

onChangeText={(text) => {
  setPassword(text)
}}

>
</TextInput>

<TextInput
style={{ paddingHorizontal:22, marginTop:10 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#0006' }}
placeholder='EID Number'
placeholderTextColor='orange'
color='orange'
onChangeText={(text) => {
  setEIDNumber(text)
}}
>
</TextInput>



<View style={{flexDirection:'row'}}>
<TouchableOpacity
style={{  justifyContent:'center', paddingHorizontal:20, marginTop:10 ,   borderRadius:20,width: "40%", height: 50, color: '#323232',backgroundColor:'#0006' }}
onPress={selectFile2}
>
<Text style={{ fontWeight:'bold',  alignSelf:'center', color:'orange'}}>{front}</Text>


</TouchableOpacity>

<TouchableOpacity
style={{  justifyContent:'center', paddingHorizontal:20, marginTop:10 ,   borderRadius:20,width: "40%", height: 50, color: '#323232',backgroundColor:'#0006' }}
onPress={selectFile3}
>
<Text style={{ fontWeight:'bold',  alignSelf:'center', color:'orange'}}>{back}</Text>


</TouchableOpacity>
  
</View>


<TouchableOpacity
style={{  justifyContent:'center', paddingHorizontal:20, marginTop:10 ,   borderRadius:20,width: deviceWidth * 0.8, height: 50, color: '#323232',backgroundColor:'#FF8C00' }}
onPress={F_signUp}
>
<Text style={{ fontWeight:'bold',  alignSelf:'center', color:'black'}}>Sign Up</Text>


</TouchableOpacity>
<View style={{height:30}}></View>
</View>





</ScrollView>





);
};

export default SignUp;