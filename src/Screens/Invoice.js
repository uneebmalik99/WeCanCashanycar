/* eslint-disable prettier/prettier */
import React,{Component,useState,useEffect} from 'react';
import {Image,FlatList, View,Button,TouchableOpacity,Text,BackHandler, SafeAreaView } from 'react-native';
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
import Entypo from 'react-native-vector-icons/dist/Entypo';



class Invoice extends Component {

  constructor({navigation }) {
      super(navigation)
      this.state = {
        Loading: false,
        isDisplayView: 0,
        User_id:'',
        tabIndex: 0,
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

componentDidMount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

  this._getdata();

  const unsubscribe =  this.props.navigation.addListener('focus', () => {
   // setCount(0);
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

   this._getdata();
  });
   // this.setState({loading:true})
   // this._getdata();
   // this.callingAuctionApi()

//     Pusher.logToConsole = true;

//     let PusherClient = new Pusher('testappkey',{
//         //cluster: 'mt1',
//         wsHost: '68.183.179.25',
//         wsPort: '6001',
//         wssHost: '68.183.179.25',
//         wssPort: '6001',
//         enabledTransports: ['ws','wss'],
//         forceTLS: false,
//         disableStats: true,
//     });

//     let echo = new Echo({
//         broadcaster: 'pusher',
//         client: PusherClient
//     });
    





//     echo.channel('testing-channel').listen('testEvent', (e) => {
//       console.log(e)

//      let auctionID= e.data.auctionID.toString();
//      console.warn(auctionID);

//      let latestbid = e.data.latestBid.toString();

//      this.setState({latestbid})



// const elementIndex = this.state.vehicleList.findIndex(element => element.id == auctionID)
// let newarray = [...this.state.vehicleList]
// newarray[elementIndex]={...newarray[elementIndex],highestBid:latestbid}
// this.setState({vehicleList:newarray,})
      

//     });


//     // let echo1 = new Echo({
//     //     broadcaster: 'pusher',
//     //     client: PusherClient
//     // });
    

//     echo.channel('newAuctionChannel').listen('newauctionEvent', (e) => {
//       console.log('New car added::::::::1::::::'+e.data.EndDate)
//       console.log('data is ::::::::2:'+e.data.EndDate.toString());
// //  let t = e.data.EndDate.toString();
// // const End = moment(item.EndDate);
// //   End.format('YYYY-MM-DD hh:mm:ss');
// // var enddate =moment(item.EndDate).format('YYYY-MM-DD hh:mm:ss')

  
//   let newarray1 = [...this.state.vehicleList]
//   newarray1.push(e.data)
//   this.setState({vehicleList:newarray1})
//   //this.setState({tabIndex: this.state.vehicleList.length})
//   this.showSnackbarMessage();

//     });

}

 callingAuctionApi = (value) =>{
        var vv= 'http://68.183.179.25/api/purchased?'+ 'userID='+value;
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
              console.warn('Load purcashed data :: ', responseJson)
      console.warn('2');
            // setItems([responseJson])
            this.setState({loading:false})

            if(responseJson.length < 1){

              this.setState({loading:false})

            }else{
              this.setState({vehicleList:responseJson.data})
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
componentWillMount(){

  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
}
handleBackPress = () => {
  
  BackHandler.exitApp();
  return true;

}

apinextscreendata=(v,p,img)=>{

    // let userid = this.state.User_Id;
    // console.warn('user' + userid);
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
        console.warn('okkkkkkkk'+responseJson.data[0]);
        let d = responseJson.data[0];
       this.props.navigation.navigate('InvoiceDetails',{'vehicleObj': d,p,img})

        

      });

}
 renderAuctionlist = ({item}) =>{

 let v =item.auctionID;


    return<TouchableOpacity


                 onPress={() =>this.apinextscreendata(v,item.auctionPriceAndTax,item.image)}

    style={{ backgroundColor:'white' ,paddingHorizontal:3, width:deviceWidth,height:deviceHeight, flexDirection:'column' ,height:105}}>
  
  
    <View
    style={{flexDirection:'row', paddingLeft:40,marginTop:5}}>
    
    <Text style={{fontWeight:'bold'}}>{item.Year} </Text>
      <Text style={{fontWeight:'bold'}}>{item.Make} </Text>
      <Text style={{fontWeight:'bold'}} >{item.Model} </Text>
      <Text style={{fontWeight:'bold'}} > {item.OdoMeterReading}</Text>
  
    </View>
   
    <View
    style={{flexDirection:'row', paddingLeft:30,marginTop:5}}>
    
    {/* {item.images > 0 ? */}
    <Image style={{ borderRadius:10,  width:80,height:55}}
             source={{ uri:'http://68.183.179.25/image/' + item.image }}  /> 
                    {/* <Image style={{ borderRadius:10, width:80,height:55 }}  source={require('../Assets/icons/logo3.jpeg')} />} */}


      <View style={{marginLeft:10, marginTop:5, flexDirection:'column'}}>

      <Text>Purchase complete</Text>
      <Text>AED {item.auctionPriceAndTax}</Text>








      </View>
  
    </View>
   

  
   </TouchableOpacity>
  

}

loadMoreData = () => {
    //   console.log('APO CALLING :: ', AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID + '&page=' + page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)

    //page += 1;
  return(<View>
  
</View>




  )
}



render() {

    // this.unsubscribe;

    return (
<SafeAreaView  style={{ backgroundColor:'#268ef5',}}> 
                 <DialogLoder loading={this.state.loading} />


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

  <Text style={{alignSelf:'center', textAlign:"center",color:'white' , fontSize:16}} >My Purchases</Text>

  </View>
  <View style={{justifyContent:'center',width:'11%',}}>
</View>

                </View>


                 {/* {this.state.vehicleList.length < 1 ?
    <View style={{width:deviceWidth,height:'100%',textAlign:'center', alignSelf:'center',alignContent:'center',alignItems:'center', justifyContent:'center'}}><Text>No On going bids</Text></View> : null} */}
                <View style={{width:deviceWidth,backgroundColor:'white', height:deviceHeight}}>

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
        height: 5,
        backgroundColor: Appcolors.Headercolor}} />}

                 />


</View>

    </SafeAreaView>)
  
  
  }
}




export default Invoice;



// const Invoice = ({ navigation }) => {

//  const [user_id, setuser_id] = useState('');
//  const [list, setlist] = useState([]);



// // const callingPurchasedApi = (v) =>{
// //   var vv= 'http://68.183.179.25/api/purchased?'+ 'userID='+v;
// //   // vv= 'http://68.183.179.25/api/purchased?userID=4'
// //  fetch(vv, {
// //     method: 'GET',
// //     headers: {
// //      Accept: 'application/json',
// //       // 'Content-Type': 'application/json',
// //     },
    
// //   })
// //     .then((response) => response.json())
// //     .then((responseJson) => {
// //         //   this.setState({ vehicleList: responseJson.data.vehicle_details })
// //         console.warn('Load purchased data :: ', responseJson)
// //       // setItems([responseJson])

// //       setlist(responseJson.data)
// //       console.log('-------'+list);
     


// //      alert(list.length);

// //     //  console.warn( this.state.vehicleList.length);

// //     }
  
// //   );

// // }

 
// // const _getdata = async()=>{
// //   try {
// //     const value = await AsyncStorage.getItem('USER_ID')   
// //     if (value !== null) {
// //       // We have data!!
// //       setuser_id(value);
// //       console.warn('idis'+value);
// //       callingPurchasedApi(value)
// //     }
// //   } catch (error) {
// //     console.warn('error at saving'+error);


// //     // Error retrieving data
// //   }
 
// // }


// const renderpurchasedlist=({item})=>{

// let id = item.auctionID; 
//   return(
//     <View
    
//     style={{ backgroundColor:'#dcdcdc' ,paddingHorizontal:3, width:deviceWidth,height:deviceHeight}}
//     >
    
    
    
//     <TouchableOpacity 
    
//     onPress={()=>  navigation.navigate('InvoiceDetails',{'Id': id})}
//     style={{width:deviceWidth, height:100,backgroundColor:'white', paddingVertical:10,flexDirection:'column'}}
//     >
    
//     <View
//     style={{marginLeft:'7%', flexDirection:'row'}}
//     >
//     <Text style={{fontWeight:'bold'}}>2015 </Text>
//     <Text style={{fontWeight:'bold'}}>Nissan </Text>
//     <Text style={{fontWeight:'bold'}} >Juke </Text>
//     <Text style={{fontWeight:'bold'}} >139,768 km </Text>
//     <Text style={{fontWeight:'bold'}}>GCC </Text>
//     </View>
    
    
//     <View
//     style={{marginLeft:'7%',marginVertical:6,marginHorizontal:10,flexDirection:'row'}}
//     >
//     <Image  style={{borderRadius:10, width:80,height:55}}
//               source={require('../Assets/Images/car-1.png')}
    
//     />
    
//     <View
//     style={{marginLeft:'4%', marginTop:2,flexDirection:'column'}}
//     >
    
//     <View
//     style={{ flexDirection:'row'}}
//     >
//     <Text style={{fontSize:12}}>Purchases complete</Text>
    
    
//     </View>
    
//     <View
//     style={{flexDirection:'row'}}
//     >
//     <Text style={{fontSize:12}}>AED {item.auctionPrice}</Text>
    
    
//     </View>
    
//     </View>
    
    
    
    
//     </View>
    
    
//     </TouchableOpacity>
    
    
    
    
    
    
    
    
    
    
    
    
//     </View>
    
//     )

// }


// useEffect(() => {


//   _getdata()

//   // }, 30000);
  
// }, [])
    
//     return (<View>
//       {/* <DialogLoder loading={loading} /> */}

// <View
//      style={{ height:50, justifyContent:'center', paddingHorizontal:20,backgroundColor:'#268ef5',paddingVertical:5,}}
//    >  

// <TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
//   alignContent:'flex-start',alignSelf:'flex-start', }}
 
//  onPress={() => this.props.navigation.toggleDrawer()}
//  >
//       <Image source={ require('../Assets/icons/list1.png')} 
//  style={{ width: 24, height:24,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
// />
//   </TouchableOpacity>
// <Text style={{justifyContent:'center',textAlign:"center",color:'white' , fontSize:16}} >Purchases</Text>

//                 </View>
















// <FlatList
//                         contentContainerStyle={{ paddingBottom: 50}}
//                         contentInsetAdjustmentBehavior="automatic"
//                      data={list}
//                     renderItem={renderpurchasedlist}
//                     keyExtractor={(item,id) => id.toString()}

//                     ItemSeparatorComponent={() => <View style={{  width: deviceWidth,
//         height: 0.5,
//         backgroundColor: Appcolors.Headercolor}} />}

//                  />



//                 </View>
     
//     );
//   };

