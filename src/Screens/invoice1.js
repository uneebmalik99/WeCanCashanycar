/* eslint-disable prettier/prettier */
import React,{Component,useState,useEffect} from 'react';
import {Image,FlatList, View,Button,TouchableOpacity,Text,BackHandler } from 'react-native';
import AppConstance from '../AppConstants/AppConstance';
import Appcontants, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import AppUrlcollection from '../AppUrl/AppUrlcollection'
import AsyncStorage from '@react-native-community/async-storage';
import DialogLoder from '../utils/DialogLoder';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import Snackbar from 'react-native-snackbar';
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';
import Appcolors from '../AppColors/Appcolors';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';

let invoice ;

class invoice1 extends Component {


  constructor({navigation }) {
      super(navigation)
      this.state = {
        Loading: false,
        isDisplayView: 0,
        User_id:'',
        tabIndex: 0,
        statuscheck:'',
        lengthofoffers:'',
        Timer:'',
        selectFilterName: '',
        isModalVisible: false,
        locationList: [],
        highestbid:'',
        markers:[],
        vehicleList: [],
        vehicleList2:[],
        currenttime:'',
        searchTxt: '',
        isStopCallingAPI: false,
        isFilterOrSerachEnable: false,}

  }


  

_getdata = async()=>{
    try {
      const value = await AsyncStorage.getItem('USER_ID')   
      if (value !== null) {
       this.setState({User_id:value});
        this.callingAuctionApi(value)
        console.warn('idis'+value);
      }
    } catch (error) {
      console.warn('error at saving'+error);

  
      // Error retrieving data
    }
   
}

showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: Appcolors.toolbarColor,
        title: 'New Auction Added',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 100);
};

componentDidMount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

    
  const unsubscribe = this.props.navigation.addListener('focus', () => {
   // setCount(0);
   let v = AppConstance.USER_INFO.USER_ID;

   this.callingAuctionApi(v)
  });
    this.setState({loading:true})
   // this._getdata();
   let v = AppConstance.USER_INFO.USER_ID;
   this.callingAuctionApi(v)


}

 callingAuctionApi = (value) =>{
        var vv= 'http://68.183.179.25/api/getInvoice?'+ 'userID='+value;
       fetch(vv, {
          method: 'GET',
          headers: {
           Accept: 'application/json',
            // 'Content-Type': 'application/json',
          },
                
        })
          .then((response) => response.json())
          .then((responseJson) => {
              //   this.setState({ vehicleList: responseJson.data.vehicle_details })
              console.warn('Load more data :: ', responseJson)
      console.warn('2');

            if(responseJson.length < 1){

              this.setState({loading:false})

            }else{
              this.setState({vehicleList:responseJson})
              this.setState({loading:false})

            }
   
          //  console.warn( this.state.vehicleList.length);

          }
        
        );
    
}

 footer= () => {
  return(
  <View >
  
  </View>);
}

remove=(g)=>{
    const filteredData = this.state.vehicleList.filter(item => item.id !== g);
    this.setState({ vehicleList: filteredData }); 
    this.setState({tabIndex: this.state.vehicleList.length})
}

// componentWillMount(){

// this._getdata();
// }
handleBackPress = () => {
  // this.props.navigation.goBack();
  // this.goBack();

  vehicleList='';
//   this.props.navigation("AppDrawerScreen");
    this.props.navigation.navigate('AppDrawerScreen');

}

apinextscreendata=(v)=>{

    // let userid = this.state.User_Id;
    // console.warn('user' + userid);
    let bb = AppConstance.USER_INFO.USER_ID;
    var vv ='http://68.183.179.25/api/getAuction?'+'auctionID=' + v ;
    fetch(vv, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.warn('okkkkkkkk'+responseJson.data);
        this.props.navigation.navigate('ongoingDetails',{'vehicleObj': responseJson.data[0],})

        

      });

}
 renderAuctionlist = ({item}) =>{

  

  if(item.status == 1){
    // this.setState({payuploaded:false})
    // this.setState({statuscheck:'Pending payment'})

    invoice ='Due';

  }else if(item.status == 2) {
    // this.setState({statuscheck:'Outstanding'})
    invoice ='Pending overdue';

    // this.setState({payuploaded:true})
  }else if(item.status == 4){
    // this.setState({statuscheck:'Cancel'})
    invoice ='Cancelled';

    // this.setState({payuploaded:true})

  }else if(item.status == 3){
    // this.setState({statuscheck:'Paid'})
    invoice ='Paid';


    // this.setState({payuploaded:true})

  }

//  let v =item.auctionID;

//   let date = moment().format('YYYY-MM-DD hh:mm:ss');
//   let End = moment(item.EndDate);
//   End = End.format('YYYY-MM-DD hh:mm:ss');
// // var enddate =moment(item.EndDate).format('YYYY-MM-DD hh:mm:ss')
//     var localTime = moment.utc(End).local().format('YYYY-MM-DD hh:mm:ss');
//     let diffr = moment.duration(moment(localTime).diff(moment(date)));
//     let hours = parseInt(diffr.asHours());
//     let minutes = parseInt(diffr.minutes());
//     let seconds = parseInt(diffr.seconds());
//     var d = hours * 60 * 60 + minutes * 60 + seconds;
//       if (d > 0) {
    // Do Something


    return<TouchableOpacity


                onPress={() =>  this.props.navigation.navigate('invoice2',{'vehicleObj': item})}

    style={{ borderWidth:0.2,borderColor:'#ccd1d1', marginTop:3, backgroundColor:'#ebedef', paddingHorizontal:5, flexDirection:'column' , width:deviceWidth,height:105}}>
  
  
    <View
    style={{flexDirection:'row'}}>

   {item.invoice_image !== null ?
    <Image style={{ borderRadius:10,  width:90,height:80}}
             source={{ uri:'http://68.183.179.25/image/' + item.invoice_image }}  /> :
                    <Image style={{ borderRadius:10, width:90,height:80 }}  source={require('../Assets/icons/logo3.jpeg')} />}

    <View
    
    style={{marginStart:10, flexDirection:"column"}}
    >
  
  <View style={{marginTop:6, flexDirection:'row'}}>
  {/* <Image
  style={{width:24,height:24}}
  source={require('../Assets/icons/car.png')}
  
  /> */}
  <Text 
  style={{marginStart:5 ,fontSize:15, fontWeight:'bold'}}> {item.Make}</Text>
  
  <Text
  style={{marginStart:3, fontSize:15,fontWeight:'bold'}}
  > {item.Model}</Text>
  
  <Text
  style={{marginStart:3 ,fontSize:14, fontWeight:'bold'}}
  > {item.year}</Text>
  
  </View>
  
  
  <View style={{marginLeft:4, flexDirection:'row'}}>

  </View>
  
  
  
    </View>
  
    </View>
  
  
  
  <View
    style={{width:deviceWidth, paddingHorizontal:4, justifyContent:'space-between', flexDirection:'row'}}>
  <View style={{ flexDirection:'row'}}>
  {/* <Image
  style={{ height:13,width:13 ,marginTop:4}}
  source={require('../Assets/icons/timer.png')}
  
  /> */}


  </View>
    <Text style={{backgroundColor:'#268ef5' ,fontSize:12, paddingHorizontal:10, paddingVertical:1, color:'white'}}>{invoice}</Text>
 
 {/* <Text style={{backgroundColor:'#268ef5' ,fontSize:12, paddingHorizontal:10, paddingVertical:1, color:'white'}}>Approved</Text>
   */}
    </View>
  
  
  
   </TouchableOpacity>
  
//   }
//   else{
//   }
}

loadMoreData = () => {

    //page += 1;
  return(<View>
  
</View>




  )
}

render() {

    // this.unsubscribe;

    return (
    <View style={{width:deviceWidth,height:deviceHeight }}>
                 <DialogLoder loading={this.state.loading} />


                 {/* {this.state.vehicleList.length < 1 ?
    <View style={{width:deviceWidth,height:'100%',textAlign:'center', alignSelf:'center',alignContent:'center',alignItems:'center', justifyContent:'center'}}><Text>No On going bids</Text></View> : null} */}


      <FlatList
                        contentContainerStyle={{ paddingBottom: 50}}
                        contentInsetAdjustmentBehavior="automatic"
                     data={this.state.vehicleList}
                    renderItem={this.renderAuctionlist}
                    keyExtractor={(item,id) => id.toString()}
                    extraData={this.state}
                    ListFooterComponent={this.footer}
                    onEndReached={this.loadMoreData}

                    ItemSeparatorComponent={() => <View style={{  width: deviceWidth,
        height: 0.5,
        backgroundColor: Appcolors.Headercolor}} />}

                 />

<View style={{height:130}}>


</View>


    </View>)
  
  
  }
}




export default invoice1;