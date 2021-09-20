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


class Wonbids extends Component {

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
  const unsubscribe = this.props.navigation.addListener('focus', () => {
    vehicleList='';
   // setCount(0);

let value1 =AppConstance.USER_INFO.USER_ID ;
this.callingAuctionApi(value1)
});
let value1 =AppConstance.USER_INFO.USER_ID ;
this.callingAuctionApi(value1)
// this._getdata();
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

}
  
 callingAuctionApi = (value) =>{
        var vv= 'http://68.183.179.25/api/wonbids?'+ 'userID='+value;
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
              console.warn('Load won data :: ', responseJson)
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

handleBackPress = () => {
  // this.props.navigation.goBack();
  navigation.navigate("AppDrawerScreen");


}

apinextscreendata=(v,inu)=>{

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
        console.warn('okkkkkkkk'+responseJson.data[0]);
        let d = responseJson.data[0];
        this.props.navigation.navigate('WonbidsDetails',{'vehicleObj': d,'invoicestatus':inu})

        

      });

}
 renderAuctionlist = ({item}) =>{

 let v =item.auctionID;
 let ini = item.invoice_status;
    return<TouchableOpacity


                 onPress={() =>this.apinextscreendata(v,ini)}

    style={{ borderWidth:0.2,borderColor:'#ccd1d1', marginTop:3, backgroundColor:'#ebedef', paddingHorizontal:5, flexDirection:'column' , width:deviceWidth,height:105}}>
  
  
    <View
    style={{flexDirection:'row'}}>

   {item.image !== null ?
    <Image style={{ borderRadius:10,  width:90,height:80}}
             source={{ uri:'http://68.183.179.25/image/' + item.image }}  /> :
                    <Image style={{ borderRadius:10, width:90,height:80 }}  source={require('../Assets/icons/logo3.jpeg')} />}

    <View
    
    style={{marginStart:10, flexDirection:"column"}}
    >
  
  <View style={{marginTop:6, flexDirection:'row'}}>
  <Image
  style={{width:24,height:24}}
  source={require('../Assets/icons/car.png')}
  
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
  {item.latestBid > 0 ? <Text style={{ fontSize:13 }}
                     >Your Won bid: {item.latestBid}</Text> :
                    null}

  {/* <Text
  
  style={{fontSize:13}}>Highest Bid: {item.highestBid} </Text> */}
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
  <Text style={{backgroundColor:'green' ,fontSize:12, paddingHorizontal:10, paddingVertical:1, color:'white'}}>Won</Text>
  
    </View>
  
  
  
   </TouchableOpacity>
  
//   }
//   else{
//   }
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
    <View style={{width:deviceWidth,height:deviceHeight }}>
                 <DialogLoder loading={this.state.loading} />


                 {/* {this.state.vehicleList.length < 1 ?
    <View style={{width:deviceWidth,height:'100%',textAlign:'center', alignSelf:'center',alignContent:'center',alignItems:'center', justifyContent:'center'}}><Text>No On going bids</Text></View> : null} */}

      <FlatList
                    contentInsetAdjustmentBehavior="automatic"

                    contentContainerStyle={{ paddingBottom: 20 }}
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




export default Wonbids;