/* eslint-disable prettier/prettier */
import React,{Component,useState,useEffect} from 'react';
import {Image,FlatList, View,Button,TouchableOpacity,Text, SafeAreaView,BackHandler } from 'react-native';
import AppConstance from '../AppConstants/AppConstance';
import Appcontants, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import AppUrlcollection from '../AppUrl/AppUrlcollection'
import AsyncStorage from '@react-native-community/async-storage';
import DialogLoder from '../utils/DialogLoder';
import moment from 'moment';
import {CountDown} from 'react-native-customizable-countdown'
import Snackbar from 'react-native-snackbar';
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';
import Appcolors from '../AppColors/Appcolors';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

let color ='orange';
let _isMounted = false;
var tabi = 0;
let sub = 0;
var PusherClient ;
var echo ;


var PusherClient1 ;
var echo1 ;

class Auctions extends Component {

  constructor(navigation ) {
      super(navigation)
      
      this.state = {
        Loading: false,
        User_id:'',
        tabIndex: 0,
        Hours: 0,
        minutes: 0,
        seconds: 0,
        currentBidcolor:'orange',
        Timer:'',
        highestbid:'',
        vehicleList: '',
        currenttime:'',
      }

  }


  

// _getdata = async()=>{
//     try {
//       const value = await AsyncStorage.getItem('USER_ID')   
//       if (value !== null) {
//         // We have data!!
//         console.warn('idis'+value);
//       }
//     } catch (error) {
//       console.warn('error at saving'+error);

  
//       // Error retrieving data
//     }
   
// }

showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: Appcolors.toolbarColor,
        title: 'New Auction Added',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 100);
};

handleBackButtonClick() {
  //this.props.navigation.goBack(null);
  BackHandler.exitApp();
  return true;
}

// componentWillMount(){
//   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

// }
componentWillUnmount() {
  BackHandler.removeEventListener(
    'hardwareBackPress',
    this.handleBackButtonClick,
  );
  console.log('unmounted');
//   clearInterval(this.myInterval)
//   this.setState({minutes:'',
// seconds:''})
}
fun = ()=>{
  
}
componentDidMount() {
  // _isMounted = true;


  this._mounted = true;


const unsubscribe = this.props.navigation.addListener('focus', () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    vehicleList='';
    // alert('hi')
    
   // setCount(0);
  //  this.setState({minutes:0,seconds:0})

let value1 =AppConstance.USER_INFO.USER_ID ;
this.callingAuctionApi(value1)


this.myInterval = setInterval(() => {
  const { seconds, minutes } = this.state

  if (seconds > 0) {
      this.setState(({ seconds }) => ({
          seconds: seconds - 1
      }))
  }
  if(minutes === 2 && seconds === 49){
    alert('hi')
  }
  if (seconds === 0) {
      if (minutes === 0) {
          clearInterval(this.myInterval)
      } else {
          this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59
          }))
      }
  } 
}, 1000)
});
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.setState({loading:true})
    this._getdata()
  //   this.myInterval = setInterval(() => {
  //     const { seconds, minutes } = this.state
  
  //     if (seconds > 0) {
  //         this.setState(({ seconds }) => ({
  //             seconds: seconds - 1
  //         }))
  //     }
  //     // if(minutes === 2 && seconds === 49){
  //     //   alert('hi')
  //     // }
  //     if (seconds === 0) {
  //         if (minutes === 0) {
  //             clearInterval(this.myInterval)
  //         } else {
  //             this.setState(({ minutes }) => ({
  //                 minutes: minutes - 1,
  //                 seconds: 59
  //             }))
  //         }
  //     } 
  // }, 1000)

    Pusher.logToConsole = true;

     PusherClient = new Pusher('testappkey',{
        //cluster: 'mt1',
        wsHost: '68.183.179.25',
        wsPort: '6001',
        wssHost: '68.183.179.25',
        wssPort: '6001',
        enabledTransports: ['ws','wss'],
        forceTLS: false,
        disableStats: true,
    });

  echo = new Echo({
        broadcaster: 'pusher',
        client: PusherClient
    });
    

    // echo.channel('addseconds-channel').listen('addSeconds', (e) => {
    //   console.log(e)
    //   alert(e.data.toString())

    // });



//       echo.channel('testing-channel').listen('testEvent', (e) => {
  echo.channel('testing-channel').listen('testEvent', (e) => {
    console.log('addsec ::---  Auctions sec -----::'+e.data)

   let auctionID= e.data.auctionID.toString();
   console.warn('auctionid is :::'+auctionID);
   let latestbid = e.data.latestBid.toString();
   this.setState({latestbid})


const elementIndex = this.state.vehicleList.findIndex(element => element.id == auctionID)
let newarray = [...this.state.vehicleList]

newarray[elementIndex]={...newarray[elementIndex],highestBid:latestbid }

let v = newarray[elementIndex].currentBid;
if(v === this.state.latestBid){
color='green'
}else{
color='orange'
}

this.setState({vehicleList:newarray,})


  });

    echo.channel('addseconds-channel').listen('addSeconds', (e) => {
      console.log('addsec ::---  Auctions sec -----::'+e.data)

     let auctionID= e.data.auctionID.toString();
     console.warn('auctionid is :::'+auctionID);
     let latestbid = e.data.latestBid.toString();
     this.setState({latestbid})


const elementIndex = this.state.vehicleList.findIndex(element => element.id == auctionID)
let newarray = [...this.state.vehicleList]

newarray[elementIndex]={...newarray[elementIndex],highestBid:latestbid }

if(e.data.negotiated == true){
  let s = e.data.seconds;
  s = Number(s)
  // alert(s)
  if(s == null ){
    s = 0;
  }
  this.myRef.addSeconds(s)
} 

let v = newarray[elementIndex].currentBid;
if(v === this.state.latestBid){
  color='green'
}else{
  color='orange'
}

this.setState({vehicleList:newarray,})


    });


    echo.channel('newAuctionChannel').listen('newauctionEvent', (e) => {

      console.warn('new Auction only ::-------::'+e.data);
      let newarray1 = [...this.state.vehicleList]
      newarray1.push(e.data)
      this.setState({vehicleList:newarray1})
      this.showSnackbarMessage();
      this.setState({tabIndex:this.state.tabIndex+1})
 

    });

}
_getdata = async () => {
 
      this.setState({loading: true});
      try {
        const value = await AsyncStorage.getItem('USER_ID');
        const name = await AsyncStorage.getItem('name');
        AppConstance.USER_INFO.USER_NAME=name;
        if (value !== null) {
          // We have data!!
          this.setState({User_Id: value});
          AppConstance.USER_INFO.USER_ID = value;
          this.callingAuctionApi(value)
  
        } else {
          let ido = AppConstance.USER_INFO.USER_ID;
          this.setState({User_Id: ido});
          this.setState({loading: false});

        }
      } catch (error) {
        this.setState({loading: false});
        this._getdata();
        console.warn('error at saving' + err);
  
        // Error retrieving data
      }
    };

 callingAuctionApi = (v) =>{
   this.setState({loading:true})
        var vv= 'http://68.183.179.25/api/auction?'+'userID='+v;
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
            // setItems([responseJson])
            if(responseJson.data == null){
              this.setState({loading:false})
              this.setState({vehicleList:'0'})
            }else{
              this.setState({vehicleList:responseJson.data})
              
              this.setState({loading:false})
              this.setState({tabIndex: this.state.vehicleList.length})            

            }
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
    this.setState({tabIndex:this.state.vehicleList.length})
}

gotonext =(v)=>{
  let u;
  if(v.id === undefined){
   u= v.auctionID;
  }else{
    u=v.id;
  }

  this.setState({loading:true})
    var vv ='http://68.183.179.25/api/getAuction?'+'auctionID=' +u ;
    fetch(vv, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({loading:false})
        console.warn(responseJson.data[0]);
        
        // if(responseJson.data[0].ReserveCost !== ''){
        //   alert(responseJson.data[0].ReserveCost)
        if(v.negotiated === true){
        //   echo.leaveChannel(`addseconds-channel`);
        // echo.leaveChannel('newAuctionChannel');
        // echo.leaveChannel('testing-channel');

        // PusherClient.disconnect();


         this.props.navigation.navigate('AuctionDetails',{'vehicleObj': responseJson.data[0],'negotiated':true , sellerprice:v.customer_price})

        }else{
          // echo.leaveChannel(`addseconds-channel`);
          // echo.leaveChannel('newAuctionChannel');
          // echo.leaveChannel('testing-channel');
          // PusherClient.disconnect();

        this.props.navigation.navigate('AuctionDetails',{'vehicleObj': responseJson.data[0],'negotiated':false, sellerprice:'0'})
        }
        // }else{
        //   this.gotonext(v)
        // }
     });
    
     
}

 renderAuctionlist = ({item}) =>{

if(item.highestBid === item.currentBid){
  color='green'
}

let currenttime = moment().format('YYYY-MM-DD hh:mm:ss');

    var offset = moment().utcOffset();
    var localTime = moment.utc(item.EndDate).local().format('YYYY-MM-DD hh:mm:ss');
    let diffr = moment.duration(moment(localTime).diff(moment(currenttime)));

    let hours = parseInt(diffr.asHours());
    let minutes = parseInt(diffr.minutes());
    let seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;

    localTime='';

      if (d > 0) {


    return<TouchableOpacity


                  onPress={() =>this.gotonext(item)}
                  // this.props.navigation.navigate('AuctionDetails',{'vehicleObj': item})

    style={{ borderWidth:0.2,borderColor:'#ccd1d1', marginTop:3, backgroundColor:'#ebedef', paddingHorizontal:5, flexDirection:'column' , width:deviceWidth,height:105}}>
  
  
    <View
    style={{flexDirection:'row'}}>

   {item.image != '' ?
    <Image style={{ borderRadius:10,  width:90,height:80}}
             source={{ uri:'http://68.183.179.25/image/' + item.image }}  /> :       
                    <Image style={{ borderRadius:10, width:90,height:80 }}  source={require('../Assets/icons/logo3.jpeg')} />}

    <View
    
    style={{marginStart:10, flexDirection:"column"}}
    >
  
  <View style={{marginTop:6, flexDirection:'row'}}>
  <FontAwesome name='truck' size={16} color='green' style={{alignSelf:'center'}}
  // style={{width:24,height:24}}
  // source={require('../Assets/icons/car.png')}
  
  />
  <Text 
  style={{marginStart:5 ,fontSize:15, fontWeight:'bold'}}>{item.Make}</Text>
  
  <Text
  style={{marginStart:3, fontSize:15,fontWeight:'bold'}}
  >{item.Model}</Text>
  
  <Text
  style={{marginStart:3 ,fontSize:14, fontWeight:'bold'}}
  >{item.year}</Text>
  
  </View>
  
  
  <View style={{marginLeft:4, flexDirection:'row'}}>
  {item.highestBid > 0 ? <Text style={{ fontSize:13 }}
                     >Highest Bid: AED {item.highestBid}</Text> :
                    <Text style={{ fontSize:13 }} >Highest Bid: {item.ReserveCost}</Text>}




  {/* <Text
  
  style={{fontSize:13}}>Highest Bid: {item.highestBid} </Text> */}
  </View>
  
  
    
  <View style={{marginLeft:4, flexDirection:'row'}}>
  {item.currentBid > 0 ? <Text style={{color:color, fontSize:12 }}
                     >Your Current Bid: AED {item.currentBid}</Text> :
                    null}


                    

  {/* <Text
  
  style={{fontSize:13}}>Highest Bid: {item.highestBid} </Text> */}
  </View>

  <View style={{marginLeft:4, flexDirection:'row'}}>
  {item.negotiated === true ? <Text style={{color:'green', fontSize:12 }}
                     >Seller's Price: AED {item.customer_price}</Text> :
                    null}
  

                    

  {/* <Text
  
  style={{fontSize:13}}>Highest Bid: {item.highestBid} </Text> */}
  </View>
  
  
  
    </View>
  
    </View>
  
  
  
  <View
    style={{width:deviceWidth, paddingHorizontal:4, justifyContent:'space-between', flexDirection:'row'}}>
  <View style={{justifyContent:'center', flexDirection:'row'}}>
  <Ionicons name='timer-outline' size={16} color='red' style={{alignSelf:'center',marginTop:2, marginRight:5}}
  // style={{ height:13,width:13 ,marginTop:4}}
  // source={require('../Assets/icons/timer.png')}
  
  />
    <CountDown
      ref = {(ref) => this.myRef=ref}
              initialSeconds = {d}
        onTimeOut = {()=> this.remove(item.id)}
        showSeparator = {true}
        // animateSeparator = {true}   
        separatorStyle={{color:'red',alignSelf:'center', fontSize:12,width:7,}}
        digitFontSize={11}
        labelColor='red'
        secondsDigitFontStyle={{color:'red'}}
        minutesDigitFontStyle={{color:'red'}}
        hoursDigitFontStyle={{color:'red'}}
        width={67}
        backgroundColor={'#ebedef'}
height={24}/>
{/* <CountDown
                
                until={d}
                //  until={100}

                //duration of countdown in seconds
                timetoShow={('H', 'M', 'S')}
                //formate to show
                onFinish={() => {
                  this.remove(item.id);
                  // this.setState({Textinput:false})
                  // this.showSnackbarMessageclosed();
                  // this.setState({closed: true});
                }}
                //on Finish call
                // onPress={() => alert('hello')}
                digitStyle={{backgroundColor: '#0000', }}
                digitTxtStyle={{color: 'red', fontWeight: 'normal'}}
                separatorStyle={{color: 'red'}}
                timeToShow={['H', 'M', 'S']}
                timeLabels
                showSeparator
                //on Press call
                size={9}
              /> */}
            {/* <Moment>{item.EndDate}</Moment> */}
    {/* <Text 
    style={{color:'#C03939',fontSize:13, marginLeft:10}}>04:35:42</Text> */}
  </View>

 
  {item.negotiated === true ?
    <Text style={{backgroundColor:'red' ,alignSelf:'center', fontSize:12, paddingHorizontal:10, paddingVertical:1, color:'white'}}>Negotiation</Text>:
    <Text style={{backgroundColor:'#268ef5' ,alignSelf:'center',  fontSize:12, paddingHorizontal:10, paddingVertical:1, color:'white'}}>Live</Text>
  }
    </View>
  
  
  
   </TouchableOpacity>
  
  }
  else{
    
  }
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

 {/* <View 
                style={{  height:55, justifyContent:'center', paddingHorizontal:20,backgroundColor:'#268ef5',paddingVertical:5,}}
              >  

<TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
             alignContent:'flex-start',alignSelf:'flex-start', }}
            
            onPress={() => this.props.navigation.toggleDrawer()}
            >
                 <Image source={ require('../Assets/icons/list1.png')} 
            style={{ width: 27, height:26,marginRight:15, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
<Text style={{justifyContent:'center',textAlign:"center",color:'white'}} >{this.state.tabIndex}  Offers</Text>
          
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

  <Text style={{alignSelf:'center', textAlign:"center",color:'white' , fontSize:16}} >{this.state.tabIndex}  Offers</Text>

  </View>
  <View style={{justifyContent:'center',width:'11%',}}>
</View>

                </View>


                <View style={{width:deviceWidth,backgroundColor:'white', height:deviceHeight}}>
    {this.state.vehicleList.length ===  0 ?
    <View style={{width:deviceWidth,height:'100%',textAlign:'center', alignSelf:'center',alignContent:'center',alignItems:'center', justifyContent:'center'}}><Text>No Auctions</Text></View> 

    : <FlatList
                        contentInsetAdjustmentBehavior="automatic"

                        contentContainerStyle={{ paddingBottom: 30}}
                    data={this.state.vehicleList}
                    renderItem={this.renderAuctionlist}
                    keyExtractor={(item,id) => id.toString()}
                    extraData={this.state}
                    ListFooterComponent={<View style={{ height: 0, marginBottom: 60 }}></View>}

                    // ListFooterComponent={this.footer}
                    onEndReached={this.loadMoreData}

                    ItemSeparatorComponent={() => <View style={{  width: deviceWidth,
        height: 0.5,
        backgroundColor: Appcolors.Headercolor}} />}

                 />
    }

</View>

    </SafeAreaView>)
  
  
  }
}
 
// const Auctions = ({ navigation  }) => {

//   const[loading ,setloading] = useState(false);
//   const[User_id ,setUser_id] = useState('');
//   const[tabIndex ,settabIndex] = useState(0);
//   const[newarray1 ,setnewarray1] = useState([]);
//   const[vehicleList ,setvehicleList] = useState([]);




// //////////////////////////// Functions ///////////

// const showSnackbarMessage = () => {
//   setTimeout(() => {
//     Snackbar.show({
//       backgroundColor: Appcolors.toolbarColor,
//       title: 'New Auction Added',
//       duration: Snackbar.LENGTH_SHORT,
//     });
//   }, 100);
// };


// const callingAuctionApi = () =>{
  
// }

// const footer= () => {
//   return(
//   <View >
  
//   </View>);
// }

// const remove=(g)=>{
//     const filteredData = vehicleList.filter(item => item.id !== g);
//     setvehicleList(filteredData);
//     settabIndex(vehicleList.length);
//     // this.setState({ vehicleList: filteredData }); 
//     // this.setState({tabIndex: this.state.vehicleList.length})
// }

// const renderAuctionlist = ({item}) =>{
// let image='';
//   if(item.images.length > 0){
//     if(item.images.path !== ''){
//       image = item.images[0].path
      
//     }else{
//       image = item.images[0]
//       console.warn('image');
//     }
//   }
 

//   let date = moment().format('YYYY-MM-DD hh:mm:ss');
//   let End = moment(item.EndDate);
//   End = End.format('YYYY-MM-DD hh:mm:ss');
//     var localTime = moment.utc(End).local().format('YYYY-MM-DD hh:mm:ss');
//     let diffr = moment.duration(moment(localTime).diff(moment(date)));
//     let hours = parseInt(diffr.asHours());
//     let minutes = parseInt(diffr.minutes());
//     let seconds = parseInt(diffr.seconds());
//     var d = hours * 60 * 60 + minutes * 60 + seconds;
//       if (d > 0) {
//     // Do Something


//     return<TouchableOpacity


//                   onPress={() =>navigation.navigate('AuctionDetails',{'vehicleObj': item})}

//     style={{ borderWidth:0.2,borderColor:'#ccd1d1', marginTop:3, backgroundColor:'#ebedef', paddingHorizontal:5, flexDirection:'column' , width:deviceWidth,height:105}}>
  
  
//     <View
//     style={{flexDirection:'row'}}>

//    {item.images.length > 0 ?
//     <Image style={{ borderRadius:10,  width:90,height:80}}
//              source={{ uri:'http://68.183.179.25/image/' + image }}  /> :
//                     <Image style={{ borderRadius:10, width:90,height:80 }}  source={require('../Assets/icons/logo3.jpeg')} />}

//     <View
    
//     style={{marginStart:10, flexDirection:"column"}}
//     >
  
//   <View style={{marginTop:6, flexDirection:'row'}}>
//   <Image
//   style={{width:24,height:24}}
//   source={require('../Assets/icons/car.png')}
  
//   />
//   <Text 
//   style={{marginStart:5 ,fontSize:15, fontWeight:'bold'}}>{item.Make}</Text>
  
//   <Text
//   style={{marginStart:3, fontSize:15,fontWeight:'bold'}}
//   >{item.Model}</Text>
  
//   <Text
//   style={{marginStart:3 ,fontSize:14, fontWeight:'bold'}}
//   >{item.year}</Text>
  
//   </View>
  
  
//   <View style={{marginLeft:4, flexDirection:'row'}}>
//   {item.highestBid > 0 ? <Text style={{ fontSize:13 }}
//                      >Highest Bid: {item.highestBid}</Text> :
//                     <Text style={{ fontSize:13 }} >Highest Bid: {item.ReserveCost}</Text>}

//   {/* <Text
  
//   style={{fontSize:13}}>Highest Bid: {item.highestBid} </Text> */}
//   </View>
  
  
  
//     </View>
  
//     </View>
  
  
  
//   <View
//     style={{width:deviceWidth, paddingHorizontal:4, justifyContent:'space-between', flexDirection:'row'}}>
//   <View style={{ flexDirection:'row'}}>
//   <Image
//   style={{ height:13,width:13 ,marginTop:4}}
//   source={require('../Assets/icons/timer.png')}
  
//   />
// <CountDown
                
//                 until={d}
//                 //  until={100}

//                 //duration of countdown in seconds
//                 timetoShow={('H', 'M', 'S')}
//                 //formate to show
//                 onFinish={() => {
//                   remove(item.id);
//                   // this.setState({Textinput:false})
//                   // this.showSnackbarMessageclosed();
//                   // this.setState({closed: true});
//                 }}
//                 //on Finish call
//                 // onPress={() => alert('hello')}
//                 digitStyle={{backgroundColor: '#0000', }}
//                 digitTxtStyle={{color: 'red', fontWeight: 'normal'}}
//                 separatorStyle={{color: 'red'}}
//                 timeToShow={['H', 'M', 'S']}
//                 timeLabels
//                 showSeparator
//                 //on Press call
//                 size={9}
//               />
//             {/* <Moment>{item.EndDate}</Moment> */}
//     {/* <Text 
//     style={{color:'#C03939',fontSize:13, marginLeft:10}}>04:35:42</Text> */}
//   </View>
//   <Text style={{backgroundColor:'#268ef5' ,fontSize:12, paddingHorizontal:10, paddingVertical:1, color:'white'}}>Live</Text>
  
//     </View>
  
  
  
//    </TouchableOpacity>
  
//   }
//   else{
//   }
// }

// const loadMoreData = () => {
//     //   console.log('APO CALLING :: ', AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID + '&page=' + page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)

//     //page += 1;
//   return(<View>
  
// </View>




//   )
// }

// ////////////////// UseEffect /////////////////////////////////

// useEffect(() => {
//   // Interval to update count
//   const abortController = new AbortController()
//   const signal = abortController.signal
//   setloading(true)
//       //this.setState({loading:true})
//       var vv= 'http://68.183.179.25/api/auction'
//       fetch(vv, {
//          method: 'GET',
//          headers: {
//           Accept: 'application/json',
//            // 'Content-Type': 'application/json',
//          },
//        },{signal : signal})
//          .then((response) => response.json())
//          .then((responseJson) => {
//              //   this.setState({ vehicleList: responseJson.data.vehicle_details })
//              console.warn('Load more data :: ', responseJson)
//            // setItems([responseJson])
     
//            setvehicleList(responseJson.data);
//            settabIndex(vehicleList.length);
//            setloading(false);
     
//          }
       
//        );
       

      

//        Pusher.logToConsole = true;
  
//       let PusherClient = new Pusher('testappkey',{
//           //cluster: 'mt1',
//           wsHost: '68.183.179.25',
//           wsPort: '6001',
//           wssHost: '68.183.179.25',
//           wssPort: '6001',
//           enabledTransports: ['ws','wss'],
//           forceTLS: false,
//           disableStats: true,
//       });
  
//       let echo = new Echo({
//           broadcaster: 'pusher',
//           client: PusherClient
//       });
      
  
//       echo.channel('testing-channel').listen('testEvent', (e) => {
//         console.log(e)
  
//        let auctionID= e.data.auctionID.toString();
//        console.warn(auctionID);
  
//        let latestbid = e.data.latestBid.toString();

//       // this.setState({latestbid})
  
  
  
//   const elementIndex = vehicleList.findIndex(element => element.id == auctionID)
//   let newarray = [...vehicleList]
//   newarray[elementIndex]={...newarray[elementIndex],highestBid:latestbid}
// setvehicleList(newarray);
//  // this.setState({vehicleList:newarray,})
        
  
//       });

//       echo.channel('newAuctionChannel').listen('newauctionEvent', (e) => {
//         console.log('New car added::::::::1::::::'+e.data.EndDate)
//         console.log('data is ::::::::2:'+e.data.EndDate.toString());
//   //  let t = e.data.EndDate.toString();
//   // const End = moment(item.EndDate);
//   //   End.format('YYYY-MM-DD hh:mm:ss');
//   // var enddate =moment(item.EndDate).format('YYYY-MM-DD hh:mm:ss')var newArray = [...initialElements , {id : "2", text: "Object 3"}];
  
//   // const guestArray = [...vehicleList];
//   // guestArray.push(e.data);
//   // setnewarray1(guestArray);
//   //setnewarray1(vehicleList => [...vehicleList, e.data]);



//     let guestArray = newarray1;
//     guestArray.push(e.data);
    
//     //setnewarray1('1');

//     setvehicleList(newarray1);
  
//   // setnewarray1([...vehicleList, e.data]);

//     settabIndex(vehicleList.length);
//     //this.setState({vehicleList:newarray1})
//     //this.setState({tabIndex: this.state.vehicleList.length})
//     showSnackbarMessage();
  
//       });
      
//   // const interval = setInterval(() => {
//   //   setCount((count) => count + 1);
//   // }, 1000);

//   // Subscribe for the focus Listener
//   // const unsubscribe = navigation.addListener('focus', () => {
//   //  // setCount(0);
//   //  callingAuctionApi()
//   // });


// }, []);

// ////////////////// Return /////////////////////////////////


//   return (
//     <View style={{width:deviceWidth,height:deviceHeight }}>
//                  <DialogLoder loading={loading} />

//  <View 
//                 style={{  height:55, justifyContent:'center', paddingHorizontal:20,backgroundColor:'#268ef5',paddingVertical:5,}}
//               >  

// <TouchableOpacity style={{position: 'absolute',paddingHorizontal:9,
//              alignContent:'flex-start',alignSelf:'flex-start', }}
            
//             onPress={() => navigation.toggleDrawer()}
//             >
//                  <Image source={ require('../Assets/icons/list1.png')} 
//             style={{ width: 24, height:24,marginRight:15, alignSelf: 'center' }} resizeMode='contain'
//            />
//              </TouchableOpacity>
// <Text style={{justifyContent:'center',textAlign:"center",color:'white'}} >{tabIndex}  Offers</Text>
          
//                            </View>

  


     
//       <FlatList
//                         contentContainerStyle={{ paddingBottom: 50}}
//                         contentInsetAdjustmentBehavior="automatic"
//                      data={vehicleList}
//                     renderItem={renderAuctionlist}
//                     keyExtractor={(item,index) => index.toString()}
//                      extraData={newarray1}
//                     ListFooterComponent={footer}
//                     onEndReached={loadMoreData}

//                     ItemSeparatorComponent={() => <View style={{  width: deviceWidth,
//         height: 0.5,
//         backgroundColor: Appcolors.Headercolor}} />}

//                  />




//     </View>)
  
  
  

// }




export default Auctions;