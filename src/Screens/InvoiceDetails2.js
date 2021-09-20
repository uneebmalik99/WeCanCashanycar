
import React, {Component} from 'react';
import {Image, Modal, View, Button,StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';
import Appcolors from '../AppColors/Appcolors';
import DialogLoder from '../utils/DialogLoder';
import {BackHandler} from 'react-native';
import {TextInput} from 'react-native-paper';
import {log} from 'react-native-reanimated';
import AppConstance, {
  deviceHeight,
  deviceWidth,
} from '../AppConstants/AppConstance';
import Pusher from 'pusher-js/react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import Echo from 'laravel-echo';
import warnOnce from 'react-native/Libraries/Utilities/warnOnce';

let imagesq = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?girl',
  'https://source.unsplash.com/1024x768/?tree',
];

let inputbidtext = '00';
let vehicleObj1;

// const time = moment().fromNow();

class InvoiceDetails2 extends Component {
  constructor(vehicleObj) {
    super(vehicleObj);

    // vehicleObj = this.props.j.state.params.vehicleObj;
    vehicleObj1 = vehicleObj.route.params.vehicleObj;
    console.log(vehicleObj1);

    this.state = {
      dateToFormat: '1976-04-19T12:59-0500',
      time: 0,
      Timer: 0,
      errortextrange:'',
      Highestbid: 0,
     Textinput:true,
      SliderModel: false,
      is_updated: false,
      rc: vehicleObj1,
      error: false,
      apifirst: [],
      yourbidder:0,
      startlimit:'',
      endlimit:'',
      checknewbit: 0,
      errorrange:false,
      errorresrve:false,
      closed: false,
      inputbid: 0,
      colorbidbtn: 'orange',
      SUserCurrentbid: 0,
      item: vehicleObj1,
      id: vehicleObj1,
      bidvalue: 0,
      complete: false,
      blinking: false,
      yourbidcheck: 0,
      User_token: '',
      loading: false,
      images: [],
      MinimumBid: 0,
      User_Id: '',
      yourcureentBid: 0,
      isBlinking:false,
      bidconfirmation:false,
      bidok:false,
      t24:'',
      cost24after:0,
      saved:false,
    };
    this.setState({User_Id: AppConstance.USER_INFO.User_Id});
    this.setState({item: vehicleObj});
    // this.Timer();
  }

 

  componentWillMount() {
    // const {params} = this.callHome.route.params.vehicleObj;
    // params.callHome();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    //this.Timer();

    //this._getdata();

    if (this.state.item != undefined && this.state.item.images != undefined) {
      for (let index = 0; index < this.state.item.images.length; index++) {
        const element = this.state.item.images[index];
        this.state.images.push('http://68.183.179.25/image/' + element.path);
      }
      this.setState({images: this.state.images});
    }
  }


  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

    
  
  onChangeText = (changebid) => {
    // this.setState({inputtex:changebid})
    // inputbidtext= changebid
    this.setState({bidvalue: changebid.replace(/[^0-9]/g)});
    this.setState({yourbidder: changebid.replace(/[^0-9]/g)});

    
  };

  componentDidMount() {
  
  }

  render() {
    
    return (
      <View>
        <DialogLoder loading={this.state.loading} />
      
        <ScrollView>
          <View style={{marginBottom:50}} >
            <SliderBox
              images={this.state.images}
              sliderBoxHeight={undefined}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              dotStyle={{
                width: 13,
                height: 13,
                borderRadius: 15,
                marginHorizontal: -6,
                padding: 0,
                margin: 0,
              }}
              resizeMethod={'resize'}
              resizeMode={'cover'}
              // autoplay
              circleLoop
              currentImageEmitter={(ind) => {
                console.log(ind);
              }}
              onCurrentImagePressed={(index) => {
                this.setState({SliderModel: true});
                console.log(`image ${index} pressed`);
              }}
            />

   
<Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.SliderModel}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'black',
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
                onPress={() => this.setState({SliderModel: false})}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../Assets/icons/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
              <SliderBox
                images={this.state.images}
                sliderBoxHeight={500}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                dotStyle={{
                  width: 13,
                  height: 13,
                  borderRadius: 15,
                  marginHorizontal: -6,
                  padding: 0,
                  margin: 0,
                }}
                // resizeMethod={'resize'}
                // resizeMode={'cover'}
                // autoplay
                circleLoop
                onCurrentImagePressed={(index) =>
                  console.log(`image ${index} pressed`)
                }
              />
            </View>
          </View>
        </Modal>
      
            <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                backgroundColor:'white'
          
              }}>
         
          <View style={{flexDirection:'column', justifyContent:'center',width:'100%',alignContent:'center',alignItems:'center'}}>
<View style={{flexDirection:'row'}}>
          <Text> {this.state.item.Year}</Text>
          <Text> {this.state.item.Make}</Text>
          <Text> {this.state.item.Model}</Text>


</View>


<View style={{flexDirection:'row'}}>
<Text> {this.state.item.OdoMeterReading}</Text>
          <Text> {this.state.item.Model}</Text>

</View>


          </View>
            </View>

            <View
              style={{
                backgroundColor: '#ebedef',
                width: deviceWidth,
                height: 20,
              }}>



              </View>






              <View
              style={{
                backgroundColor: 'white',
                width: deviceWidth,
                alignContent:'center',
                justifyContent:'center',
                height: 30,
                paddingHorizontal:20,
                borderBottomWidth:0.2,

              }}>

<Text style={{color:'green',fontSize:13}}> You are the highest bidder</Text>

              </View>





              <View
              style={{
                backgroundColor: 'white',
                width: deviceWidth,
                alignContent:'center',
                justifyContent:'center',
                paddingHorizontal:25,
                flexDirection:'column',
                paddingTop:20,
                paddingBottom:20,
                borderBottomWidth:0.2,
                

              }}>

<Text style={{ color:'black',fontSize:12}}>Price</Text>

<Text style={{color:'black',fontWeight:'bold', fontSize:15}}>{this.state.item.highestBid} AED</Text>

              </View>




              
              <View
              style={{
                backgroundColor: 'white',
                width: deviceWidth,
                alignContent:'center',
                justifyContent:'center',
                paddingHorizontal:15,
                flexDirection:'column',
                paddingTop:10,
                paddingBottom:10,

              }}>


<Text style={{color:'black',textAlign:'center', fontSize:12}}>All bid prices include 5% VAT on Auction Service charge.This transaction is an E-Market place Service, WCAC is a disclosed agent</Text>

              </View>





            <View
              style={{
                borderTopColor: '#abb2b9',
                borderTopWidth: 0.3,
                borderBottomColor: '#abb2b9',
                borderBottomWidth: 0.3,

                flexDirection: 'column',
              }}>


              {/* <BlinkView isBlinking={this.state.blinking} visible={} element={Text} >{this.state.Highestbid}</BlinkView> */}
              <View
                style={{
                  marginBottom: 5,
                  paddingVertical:10,
                  paddingHorizontal: 13,
                  backgroundColor:'#DCDCDC',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'black', fontSize: 15}}>Highlights</Text>



                {this.state.Highlightshow === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({Highlightshow:false})}
               >
                <Image
                style={{height:16,width:16}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({Highlightshow:true})}
               >
                <Image
                style={{height:16,width:16}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }
               {/* <TouchableOpacity
                onPress={() =>  this.setState({Highlightshow:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> */}
              </View>

              {this.state.Highlightshow === true ?
    <View style={{flex: 1}}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    paddingVertical: 5,
                    borderBottomColor: '#abb2b9',
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent:'space-between'

                  }}>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>Paint: </Text>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>{this.state.item.Paint}</Text>
                </View>

                <View
                  style={{
                    borderBottomWidth: 0.2,
                    paddingVertical: 5,
                    borderBottomColor: '#abb2b9',
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent:'space-between'

                  }}>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>Fuel Type: </Text>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>{this.state.item.FuelType}</Text>
                </View>

                <View
                  style={{
                    borderBottomWidth: 0.2,
                    paddingVertical: 5,
                    borderBottomColor: '#abb2b9',
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent:'space-between'

                  }}>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>Transmission: </Text>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>
                    {this.state.item.Transmission}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottomWidth: 0.2,
                    paddingVertical: 5,
                    borderBottomColor: '#abb2b9',
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent:'space-between'

                  }}>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>Engine Clinders: </Text>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>
                    {this.state.item.EngineGlinders}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottomWidth: 0.2,
                    paddingVertical: 5,
                    borderBottomColor: '#abb2b9',
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent:'space-between'

                  }}>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>ServiceHistory: </Text>
                  <Text style={{fontSize: 13,fontWeight:'bold'}}>
                    {(this.state.item.ServiceHistory, 50)}
                  </Text>
                </View>
              </View>
            
             :
                   null  }

              
            
            
            </View>








            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  marginTop: 35,
                  marginBottom: 2,
                  paddingVertical:10,
                  paddingHorizontal: 13,
                  backgroundColor:'#DCDCDC',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'black', fontSize: 15}}>Vehicle Info</Text>
              
                {this.state.feature === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({feature:false})}
               >
                <Image
                style={{height:16,width:16}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({feature:true})}
               >
                <Image
                style={{height:16,width:16}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }
                {/* <Image 
                style={{height:13,width:13}}
                source={require('../Assets/icons/down-arrow.png')} /> */}
              </View>
{this.state.feature === true ?
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: '#abb2b9',
                  marginHorizontal: 10,
                  borderRadius: 10,
                }}>


<View  style={{
borderBottomWidth:0.3,
borderBottomColor: '#abb2b9',
flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,


}}>
{/* <View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between',paddingVertical:5}}>
<Text style={{fontWeight:'bold',}}>Vehicle Info</Text>


{this.state.vehicleinfo === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({vehicleinfo:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({vehicleinfo:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }


</View> */}

<View
>
{this.state.feature === true ?
  <View>       
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      borderBottomColor: '#abb2b9',
                      paddingVertical: 5,
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Make: </Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>{this.state.item.Make}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Model: </Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>{this.state.item.Model}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Exact Model: </Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.ExactModel}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Transmission: </Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.Transmission}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Interior Trim</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.InteriorTrim}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Year</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>{this.state.item.Year}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Specifications</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.Specifications}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Engine Clinders</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.EngineGlinders}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,fontWeight:"bold"}}>OdoMeter Reading</Text>
                    <Text style={{fontSize: 13,fontWeight:"bold"}}>
                      {this.state.item.OdoMeterReading}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Paint</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>{this.state.item.Paint}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Accident History</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.AccidentHistory}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>ServiceHistory</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {(this.state.item.ServiceHistory, 50)}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Service Type</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.ServiceType}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Body</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>{this.state.item.Body}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Drive</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>{this.state.item.Drive}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Steering Wheel Location</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.SteeringWheelLocation}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Car Color</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.CarColor}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Fuel Type</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.FuelType}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Car Number</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.CarNumber}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal:0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Engine Size</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.EngineSize}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      Structural/Chassis Damage
                    </Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.Structural_Chassis_Damage}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Chassis Repaired</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.ChassisRepaired}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Chassis Extention</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.ChassisExtention}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      flexDirection: 'row',
                      justifyContent:'space-between'

                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Naviagtion System</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.NaviagtionSystem}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>VIN Plate</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.VINPlate}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Manufacture Year</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.ManufactureYear}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Manufacture Month</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.ManufactureMonth}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Warranty Month</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WarrantyMonth}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:"bold"}}>Warranty Validity</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WarrantyValidity}
                    </Text>
                  </View>

              
                  {/* <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 30,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>SMC Valid Till</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.SMC_ValidTill}
                    </Text>
                  </View> */}

                  

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Number Of Keys</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.NumberOfKeys}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Warranty Validity</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WarrantyValidity}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Roof</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>{this.state.item.Roof}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Rim Type</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.RimType}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Rim Condition</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.RimCondition}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Seal Color</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.SealColor}
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Number Of Seats</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.NumberOfSeats}
                    </Text>
                  </View>









{/* now Car body  */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Car Body</Text>
                    <TouchableOpacity style={{paddingVertical:5, borderRadius:20, paddingHorizontal:10,backgroundColor:'#268ef5'}}
                  onPress={() =>{this.setState({carbodyimage:true})}}
                    >

                      <Text style={{color:'white'}}> View </Text>
                    </TouchableOpacity>
                  
                  
                  
                   
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Door Front Left Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.DoorFrontLeftReplaced}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Door Front Left</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.DoorFrontLeft}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Door Rear Left Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.DoorRearLeftReplaced}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Door Rear Left</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.DoorRearLeft}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Wing Front Left Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WingFrontLeftReplaced}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Wing Front Left</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WingFrontLeft}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Wing Rear Left Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WingRearLeftReplaced}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Wing Rear Left</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WingRearLeft}
                    </Text>
                  </View>









                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Bumper Front Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.BumperFrontReplaced}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Bumper Front</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.BumperFront}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Bumper Rear Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.BumperRearReplaced}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Bumper Rear</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.BumperRear}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Roof Check</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.RoofCheck}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Roof Rack</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.RoofRack}
                    </Text>
                  </View>














                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Door Front Right Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.DoorFrontRightReplaced}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Door Rear Right</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.DoorRearRight}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Wing Front Right Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WingFrontRightReplaced}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Wing Rear Right</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.WingRearRight}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Boot Replaced</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.BootReplaced}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Boot</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.Boot}
                    </Text>
                  </View>

















                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Sign Crumping</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.SignCrumping}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rust</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Rust}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Underneath Chassis Rusty</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Underneath_Chassis_Rusty}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Bonnet Replaced</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.BonnetReplaced}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Bonnet</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Bonnet}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Grille Inspection</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.GrilleInspection}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Sunroof - Moonroof</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Sunroof_Moonroof}
                    </Text>
                  </View>


                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Convertible Top</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.ConvertibleTop}
                    </Text>
                  </View>



{/* now Glass And Outside Mirrors  */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Glass And Outside Mirrors</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Outside Mirror</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.OutsideMirror}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Wind Sheild Glass</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.WindSheildGlass}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Sunroof Glass</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.SunroofGlass}
                    </Text>
                  </View>


                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Wiper Blade</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.WIperBlade}
                    </Text>
                  </View>
















{/* now Check Of Doors  */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,

                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Check Of Doors</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Doors</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Doors}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Tailgate</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Tailgate}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Power LiftGate operation</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.PowerLiftGateOp}
                    </Text>
                  </View>


                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Hood</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Hood}
                    </Text>
                  </View>













{/* now Lights  */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Lights</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front-end Exterior Lights</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.FrontendExteriorLights}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Side Exterior Right</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.SideExteriorRight}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Side Exterior Left</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.SideExteriorLeft}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Back-end Exterior Lights</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.BackendExteriorLights}
                    </Text>
                  </View>


                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Hazard Lights</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.HazardLights}
                    </Text>
                  </View>



























{/* now Audio Entertainment */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Audio Entertainment</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Radio,Casette, CD and Speakers</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Radio_CD}
                    </Text>
                  </View>


                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Board Computer</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.BoardComputer}
                    </Text>
                  </View>














{/* now Heat/Ac */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Heat/AC</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Air Conditioning System</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.AC_System}
                    </Text>
                  </View>


                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Heating System</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.HeatingSystem}
                    </Text>
                  </View>












{/* now Interior Amenities */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:"bold"}}>Interior Amenities</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Warning Signals Active</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.WarningSignalsActive}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Instrument Panel</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.InstrumentPanel}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Dome Map Lights</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.DomeMapLights}
                    </Text>
                  </View>

                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Window Controls</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.WindowControls}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Horn</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Horn}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Center Armrest/console</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.CenterArmrest}
                    </Text>
                  </View>
                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Windsheild Wiper Control</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.WindsheildWiperControl}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Steering Wheel Controls</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.SteeringWheelControls}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Door Locks</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.DoorLocks}
                    </Text>
                  </View>
                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Clock</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Clock}
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Glove Box</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.GloveBox}
                    </Text>
                  </View>


















{/* now Carpet, Trim And Mats */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:"bold"}}>Carpet, Trim And Mats</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Headliner</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.Headliner}
                    </Text>
                  </View>


                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Door Trim And Panels</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.DoorTrimAndPanels}
                    </Text>
                  </View>







{/* now Seats */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Seats</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>

                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Safety Belts</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.SafetyBelts}
                    </Text>
                  </View>



{/* now Test Drive General */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Test Drive General</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Engine Starts Property</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.EngineStartsProperty}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Engine</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.Engine}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Engine Group</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.EngineGroup}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>Engine Noise</Text>
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>
                      {this.state.item.EngineNoise}
                    </Text>
                  </View>

                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Engine Visual Inspection</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.EngineVisualInspection}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>Engine Exhaust</Text>
                    <Text style={{fontSize: 13,color:'green',fontWeight:'bold'}}>
                      {this.state.item.EngineExhaust}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Suspension / Underneath Noise</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Suspension_UnderneathNoise}
                    </Text>
                  </View>
                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Profile System / Memory Seats</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.ProfileSystem_MemorySeats}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Cruise Control</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.CruiseControl}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Fuel Pump Noise</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.FuelPumpNoise}
                    </Text>
                  </View>
                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Transmission Condition</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.TransmissionCondition}
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Struts And Shocks</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.StrutsAndShocks}
                    </Text>
                  </View>










{/* now Test Drive Sensors & Cameras */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Test Drive Sensors & Cameras</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front Camera </Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.FrontCamera}
                    </Text>
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Right Camera</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RightCamera}
                    </Text>
                  </View>






                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Sensors</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RearSensors}
                    </Text>
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Camera</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RearCamera}
                    </Text>
                  </View>







                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front Sensors</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.FrontSensors}
                    </Text>
                  </View>




                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Left Camera</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.LightCamera}
                    </Text>
                  </View>









{/* now Engine */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Engine</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Hoses, Wiring And Fitting (coolant, Fuel, Brake, Steering, Vacuum, A/C),Check For Wear</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Hoses_Wiring}
                    </Text>
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Inspect Supercharger / Turbocharger Air Cooler</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Charger}
                    </Text>
                  </View>






                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Water,Sludge Or Engine Coolant In Oil (check Unserside Of Oil Filler Cap</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Water_Slidge_Oil}
                    </Text>
                  </View>




                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Fluid</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Fluid}
                    </Text>
                  </View>











{/* now Electrical System */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:10,

                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Electrical System</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front Right Door</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.ElectricFRD}
                    </Text>
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Right Door</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.ElectricRRD}
                    </Text>
                  </View>






                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal:0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Battery Expiration Date</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.BatteryExpirationDate}
                    </Text>
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front Left Door</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.ElectricFLD}
                    </Text>
                  </View>








                  
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Left Door</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.ElectricRLD}
                    </Text>
                  </View>




                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Alternator Outdoor</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.AlternatorOutdoor}
                    </Text>
                  </View>

{/* now Transmission */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:10,

                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Transmission, Transaxle, Differential And Transfer Case</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Automatic Transmission Check</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.AutomaticTransmissionCheck}
                    </Text>
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Transfer Case</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.TransferCase}
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Differemtial Drive</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.DifferemtialDrive}
                    </Text>
                  </View>







{/* now tries */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                      backgroundColor:'#DCDCDC',
                      paddingHorizontal:10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Tires And Wheels</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>




                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Tires Match</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.TiresMatch}
                    </Text>
                  </View>





                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Wheels Match</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.WheelsMatch}
                    </Text>
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Wheel Covers And Center Caps</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.WheelCovers_CenterCaps}
                    </Text>
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front Left Tire Condition</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.FronLeftTireCondition}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front Left Tire Production Date</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.FronLeftTireProductionDate}
                    </Text>
                  </View>





                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Left Tire Condition</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RearLeftTireCondition}
                    </Text>
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal:0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Left Tire Production Date</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RearLeftTireProductionDate}
                    </Text>
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Correct Size</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.CorrectSize}
                    </Text>
                  </View>





                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Front Right Tire Condition</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.FrontRightTireCondition}
                    </Text>
                  </View>


                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Right Tire Condition</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RearRightTireCondition}
                    </Text>
                  </View>






                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rear Right Tire Production Date</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RearRightTireProductionDate}
                    </Text>
                  </View>




                  










{/* now brakes */}

<View
                    style={{
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',
                     paddingHorizontal:10,
                      backgroundColor:'#DCDCDC',

                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Brakes</Text>
                    {/* <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text> */}
                  </View>






                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Rotors And Drums</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.RotorsAndDrums}
                    </Text>
                  </View>





                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Brake Pads And Shoes</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.BrakePads_Shoes}
                    </Text>
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Master Cylinder And Booster</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.MasterCylinderAndBooster}
                    </Text>
                  </View>



                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 0,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.vehicletextbox}>Parking Brake</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.ParkingBrake}
                    </Text>
                  </View>






                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 10,
                      marginTop:5,
                      borderBottomColor: '#abb2b9',

                      flexDirection: 'column',
                    }}>
                    <Text style={{fontSize: 14,paddingHorizontal:10,paddingVertical:10, fontWeight:"bold",backgroundColor:'#DCDCDC',}}>Note</Text>
                    <Text style={styles.vehicletextbox}>
                      {this.state.item.Note}
                    </Text>
                  </View>
                  </View>:null

}
</View>


</View>

              </View>
           : null }
           
            </View>

            <Text style={{color:'green',fontSize:15 ,marginBottom:10, paddingHorizontal:24, marginTop:10}}>Note : Only fields written in Green are guaramteed for accuracy</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  vehicletextbox:{
    fontSize:13,
    fontWeight:'bold'
  }
})
export default InvoiceDetails2;