/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Image,SafeAreaView, Modal, View,  PermissionsAndroid,
  Button,StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';
import Appcolors from '../AppColors/Appcolors';
import DocumentPicker from 'react-native-document-picker';
import DialogLoder from '../utils/DialogLoder';
import {BackHandler} from 'react-native';
import {TextInput} from 'react-native-paper';
import {color, log} from 'react-native-reanimated';
import AppConstance, { deviceHeight, deviceWidth} from '../AppConstants/AppConstance';
import Pusher from 'pusher-js/react-native';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';



class invoice2 extends Component {
  constructor({ route, navigation }) {
      super()
      const {  vehicleObj } = route.params;
    //   vehicleObj1 = vehicleObj;
    //   invoice = invoicestatus;

    // console.log(vehicleObj1);

    this.state = {
      item:vehicleObj,
        loading:false,
        Invoiceimagebig:false,
        status:'',
        image:'http://68.183.179.25/image/'+vehicleObj.invoice_image,
     
    };
    

  }

 
   checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      this.downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          this.downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: Appcolors.toolbarColor,
        title: 'Payment Proof Uploaded Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 600);
};
componentWillUnmount() {
  BackHandler.removeEventListener(
    'hardwareBackPress',
    this.handleBackButtonClick,
  );
}




handleBackButtonClick() {
  BackHandler.navigation.navigate('Auctions');
  // BackHandler.exitApp();
  return true;
}


paymentProof = (v) => {
  this.setState({loading:true})
  let u= AppConstance.USER_INFO.USER_ID;
  let auctionid=this.state.item.auctionID;
this.setState({loading:true}); 
 var vv= 'http://68.183.179.25/api/saveInvoiceImage';
console.warn('working1')

 const fileToUpload1 = v;
    const data = new FormData();
    data.append('userID', u);   
    data.append('auctionID', auctionid);   
    data.append('payment_proof',  {uri: fileToUpload1.uri,name: fileToUpload1.name,filename :fileToUpload1.filename,type: fileToUpload1.type});

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



      console.warn(responseJson);

      if(responseJson.status === true){
        this.setState({loading:false})
        
        this.showSnackbarMessage();
      }else{
        this.setState({loading:false})
        alert('server error')


      }
     

    })
}

selectFile3 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
       
      });
      console.warn('res : ' + JSON.stringify(res));
      // this.setState({paymentpic:res})
      this.paymentProof(res)

      // Setting the state to show single file attributes
      //setEIDBackImg(res);
    } catch (err) {
     // setEIDBackImg(null);
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
  
componentDidMount() {


let s = this.state.item.status;
    if(s == 1){
      this.setState({status:'Due'})

    }else if(s == 2) {
      this.setState({status:'Pending Overdue'})

    }else if(s == 3){
      this.setState({status:'Paid'})


    }  else if(s == 4 ){
      this.setState({status:'Cancelled'})


    }
// // alert(invoice)
//     // BackHandler.addEventListener(
//     //       'hardwareBackPress',
//     //       this.handleBackButtonClick,
//     //     );
//     if (this.state.item != undefined && this.state.item.images != undefined) {
//       for (let index = 0; index < this.state.item.images.length; index++) {
//         const element = this.state.item.images[index];
//         this.state.images.push('http://68.183.179.25/image/' + element.path);
//       }
//       this.setState({images: this.state.images});
//     }
  
  }

  downloadImage = () => {
    this.setState({loading:true})

    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = this.state.image;    
    // Getting the extention of the file
    let ext = this.getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        this.setState({loading:false})
        alert('Image Downloaded Successfully.');
      });
  };

  getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };


  render() {
    
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.containerMain}>
        <DialogLoder loading={this.state.loading} />

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.Invoiceimagebig}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'black',
              width:deviceWidth,
              height:deviceHeight,
              paddingVertical: 20,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                alignContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({Invoiceimagebig: false})}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../Assets/icons/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height:'100%',justifyContent:'center',  width:deviceWidth, paddingVertical: 10, paddingHorizontal: 5}}>
            <Image
                  style={{width: '90%',alignContent:'center',alignItems:'center',alignSelf:'center', height: '99%' }}
                  source={{uri:'http://68.183.179.25/image/' + this.state.item.invoice_image}} 
                />
            </View>
          </View>
        </Modal>
      

        <ScrollView style={{width:deviceWidth}}>
              <TouchableOpacity
              onPress={() =>this.setState({Invoiceimagebig:true})}
              >
              <Image
              style={{width:"100%",height:deviceHeight*0.34}}
                 source={{uri:'http://68.183.179.25/image/' + this.state.item.invoice_image}} />
                 </TouchableOpacity>


                 <TouchableOpacity
style={{marginTop:10, width:'100%',}}
onPress={()=>{this.checkPermission()}}>
<View
style={{paddingVertical:10, alignItems:'center',borderColor:'#268ef5', marginHorizontal:10,borderWidth:0.5,borderRadius:5}}>
<Text style={{color:'#268ef5' ,fontSize:18}}>Download</Text>

</View>


</TouchableOpacity>
                 <View style={{width:deviceWidth,paddingHorizontal:10,marginTop:10}}>

                     


                 <View style={{flexDirection:'column', borderWidth:0.3,borderRadius:10,marginHorizontal:5, flexDirection:'column',}}>
              
              <View style={{alignItems:'center', }}>


                 <Text style={{fontSize:16, alignItems:'flex-start',}} >Vehicle Details</Text>
                 </View>
<View style={{borderBottomWidth:0.3,  marginHorizontal:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
<Text>Make</Text>
<Text>{this.state.item.Make}</Text>

</View>
<View style={{borderBottomWidth:0.3,  marginHorizontal:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
<Text>Model</Text>

<Text>{this.state.item.Model}</Text>
</View>


<View style={{borderBottomWidth:0.3,  marginHorizontal:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
<Text>Year</Text>

<Text>{this.state.item.Year}</Text>

</View>


<View style={{marginHorizontal:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
<Text>ExactModel</Text>

<Text>{this.state.item.ExactModel}</Text>

</View>


<View style={{marginHorizontal:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
<Text>Status</Text>

<Text>{this.state.status}</Text>

</View>


                 </View>
                 
                 </View>


          </ScrollView>
          <TouchableOpacity style={styles.bottomView}
          onPress={()=> this.selectFile3()}
          >
            <Text style={styles.textStyle}>Upload Payment Proof</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomView: {
      width: '100%',
      height: 50,
      backgroundColor: '#268ef5',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
    },
    textStyle: {
      color: '#fff',
      fontSize: 18,
    },
  });
  

export default invoice2;
