/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
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

class ongoingDetails extends Component {
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
      carbodyimage:false,
     Textinput:true,
      SliderModel: false,
      is_updated: false,
      rc: vehicleObj1.ReserveCost,
  

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
      id: vehicleObj1.id,
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

////icon arraow /////////
      Hicon :'../Assets/icons/down-arrow.png',
      Highlightshow:true,
      Carbodyevaluation:true,
      feature:true,
      vehicleinfo:true,
      GlassandoutsideMirrors:true,
      checkofdoors:true,
      lights:true,
      AudioEntertaiment:true,
      HeatAC:true,
      InteriorAmenities:true,
      Carpet:true,
      Seats:true,
      TestDriveGeneral:true,
      TestDriveSensorsandCameras:true,
      Engine:true,
      ElectricalSystem:true,
      Transmission:true,
      Tiresandwheels:true,
      Brakes:true,

      bidvalueplusVat:0,



      eventDate: moment
        .duration()
        .add({days: 3, hours: 1, minutes: 18, seconds: 17}), // add 9 full days
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    };
    this.setState({User_Id: AppConstance.USER_INFO.USER_ID});
    this.setState({item: vehicleObj});
    // this.Timer();
  }

  showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: Appcolors.toolbarColor,
        title: 'Bid placed Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 130);
  };

  componentWillMount() {
    // const {params} = this.callHome.route.params.vehicleObj;
    // params.callHome();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.Timer();

    this._getdata();

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

  // calcTimeLeft = () => {
  //  let expiration_date=  this.state.vehicleObj1.EndDate
  //     const currentTime = moment({});
  //     const timeDiff = expiration_date.diff(currentTime);
  //     const duration = moment.duration(timeDiff);
  //     const hours = duration.asHours();
  //     if (hours > 0) {
  //       return Math.floor(hours) + moment(timeDiff).format('hh:mm:ss');
  //     }
  //     return 'complete';
  //   };
  
  updateTimer = () => {
    const x = setInterval(() => {
      let {eventDate} = this.state;

      if (eventDate <= 0) {
        clearInterval(x);
      } else {
        eventDate = eventDate.subtract(1, 's');
        const days = eventDate.days();
        const hours = eventDate.hours();
        const mins = eventDate.minutes();
        const secs = eventDate.seconds();

        this.setState({
          days,
          hours,
          mins,
          secs,
          eventDate,
        });
      }
    }, 1000);
  };

  _getdata = async () => {
//    var d1 = new Date(this.state.currenttime) //firstDate
// var d2 = new Date("2020-11-17 04:43:01") //SecondDate
// var diff = Math.abs(d1-d2);
//     let d1 = new Date("04:43:01") //firstDate
//     let d2 = new Date("05:43:01") //SecondDate
// //     dt1 = new Date("October 13, 2014 11:11:00");
// // dt2 = new Date("October 13, 2014 11:13:00");
// var startDate = new Date('October 13, 2014 04:43:00');
// // Do your operations
// var endDate   = new Date('October 13, 2014 05:43:00');
// var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

// console.log(diff_minutes(dt1, dt2)); 
    // var msDiff = new Date("04:43:01").getTime() - new Date("04:43:01").getTime();    //Future date - current date
    // var daysTill30June2035 = Math.floor(msDiff / (60 * 60 * 24));
    // console.log(daysTill30June2035);//     const diffInMs = Math.abs(d1 - d2);
//  let h = diffInMs / (1000 * 60 * 60);
    // let diff = Math.abs(d1-d2); //in milliseconds
   // alert(seconds)

    this.setState({loading: true});
    try {
      const value = await AsyncStorage.getItem('USER_ID');
      if (value !== null) {
        // We have data!!
        this.setState({User_Id: value});
        try {
          const value2 = await AsyncStorage.getItem('startLimit');
          const value3 = await AsyncStorage.getItem('endLimit');
          const value4 = await AsyncStorage.getItem('fcmtoken')
          if (value2 !== null && value3 !== null) {
            this.setState({startlimit: value2});
            this.setState({endlimit: value3});
            if(value4 !== null){
              AppConstance.USER_TOKEN = value4;
              this.setState({User_token:value4})
              console.warn('ok');          
              this.bidapi();
            }
            



          }else{
            console.warn('no range defined');
          }
        }
          catch(error){
            alert(error)
          }
           
//         await  AsyncStorage.setItem('startLimit', data.startLimit);
// await  AsyncStorage.setItem('endLimit', data.endLimit);

      } else {
        let ido = AppConstance.USER_INFO.USER_ID;
        this.setState({User_Id: ido});
        this.bidapi();
      }
    } catch (error) {
      this.setState({loading: false});
      this._getdata();
      console.warn('error at saving' + err);

      // Error retrieving data
    }
  };
Bidnowfunction=()=>{

  let t = moment().add(1, 'days').format("dddd, MMMM Do YYYY, h:mm:ss a");
  this.setState({t24:t})

  let m = this.state.MinimumBid;
  let r = this.state.item.ReserveCost.replace(/[^0-9]/g);
  var s = this.state.startlimit.replace(/[^0-9]/g);
  var b = this.state.bidvalue;


  
   s= Number(s);
   b= Number(b);
   var g = (520*5)/100;
   g= g+b+520;
   
  var  after24 = b+520;
  var after241 = (after24*5)/100;
  after241 = after24+after241;

   this.setState({bidvalueplusVat:g})
  this.setState({cost24after:after241})
   var e = this.state.endlimit.replace(/[^0-9]/g);
   e = Number(e);

   if (this.state.bidvalue >= m) {
    if(this.state.bidvalue >= s ){

      if(this.state.bidvalue <= e){

        this.setState({bidconfirmation:true})

    }else{

      this.setState({errortextrange:'Your Maximum Bid Limit is '+this.state.endlimit+' Aed.Kindly make deposit to increase your limit'})


      this.setState({loading: false});
      this.setState({errorrange: true});

    }
    
  }else{
    this.setState({errortextrange:'Your Minimum Bid Limit is '+this.state.startlimit+' Aed.Kindly above'})

      this.setState({loading: false});
      this.setState({errorrange: true});

    }



} else {
  this.setState({loading: false});

  this.setState({error: true});
  // alert('your bid is lower than previioues bid')
}





}
  Bidnow = () => {
    this.setState({loading:true})
    let m = this.state.MinimumBid;
    let r = this.state.item.ReserveCost.replace(/[^0-9]/g);
    let i = this.state.User_Id;
    var s = this.state.startlimit.replace(/[^0-9]/g);
    var b = this.state.bidvalue;
     s    = Number(s);
     b= Number(b);

    var e = this.state.endlimit.replace(/[^0-9]/g);
    e = Number(e);
    let userid = this.state.User_Id.toString();

    let y = AppConstance.USER_INFO.USER_ID;
    // if (this.state.bidvalue > r) {
    if (this.state.bidvalue >= m) {
        if(this.state.bidvalue >= s ){

          if(this.state.bidvalue <= e){

            

        let a = this.state.id;
        let b = this.state.bidvalue;
        let ui = this.state.userid;
        console.warn('userid' + ui + 'high' + b + 'auction' + a);

        let urlbid = 'http://68.183.179.25/api/postBid';
        // this.setState({ isLoading: true });
        var value = new FormData();
        value.append('Auction_id', a);
        value.append('User_id', userid);
        value.append('Latestbid', this.state.bidvalue);
        value.append('Usertoken', this.state.User_token);

        fetch(urlbid, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
          },
          body: value,
        })
          // .then((response) => response.json())
          .then((responseJson) => {
            console.warn('bidresponse :: ', responseJson);
            if (responseJson.status === 200) {
              this.setState({yourcureentBid: this.state.bidvalue});
              this.setState({colorbidbtn: '#58D68D'});
              this.setState({loading: false});

              this.showSnackbarMessage();
              // this.state.yourbidcheck = b;
              this.setState({yourbidcheck: b});
            } else {
              this.setState({loading: false});
              alert('server-error')
            }
          });
        
        }else{

          this.setState({errortextrange:'Your Maximum Bid Limit is '+this.state.endlimit+' Aed.Kindly make deposit to increase your limit'})


          this.setState({loading: false});
          this.setState({errorrange: true});

        }
        
      }else{
        this.setState({errortextrange:'Your Minimum Bid Limit is '+this.state.startlimit+' Aed.Kindly above'})

          this.setState({loading: false});
          this.setState({errorrange: true});

        }
    


    } else {
      this.setState({loading: false});

      this.setState({error: true});
      // alert('your bid is lower than previioues bid')
    }


  // } else {

  //   this.setState({loading: false});
  //   this.setState({errorresrve: true});

  // }
  };



  Bidnow3 = () => {
    this.setState({loading:true})
    let m = this.state.MinimumBid;
    let r = this.state.item.ReserveCost.replace(/[^0-9]/g);
    let i = this.state.User_Id;
    var s = this.state.startlimit.replace(/[^0-9]/g);
    var b = this.state.bidvalue;
     s    = Number(s);
     b= Number(b);

    var e = this.state.endlimit.replace(/[^0-9]/g);
    e = Number(e);
    let userid = this.state.User_Id.toString();

    let y = AppConstance.USER_INFO.USER_ID;
    // if (this.state.bidvalue > r) {
    if (m >= m) {
        if(m >= s ){

          if(m <= e){

            

        let a = this.state.id;
        let b = this.state.bidvalue;
        let ui = this.state.userid;
        console.warn('userid' + ui + 'high' + b + 'auction' + a);

        let urlbid = 'http://68.183.179.25/api/postBid';
        // this.setState({ isLoading: true });
        var value = new FormData();
        value.append('Auction_id', a);
        value.append('User_id', userid);
        value.append('Latestbid', this.state.MinimumBid);
        value.append('Usertoken', this.state.User_token);

        fetch(urlbid, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
          },
          body: value,
        })
          // .then((response) => response.json())
          .then((responseJson) => {
            console.warn('bidresponse :: ', responseJson);
            if (responseJson.status === 200) {
              this.setState({yourcureentBid: this.state.bidvalue});
              this.setState({colorbidbtn: '#58D68D'});
              this.setState({loading: false});

              this.showSnackbarMessage();
              // this.state.yourbidcheck = b;
              this.setState({yourbidcheck: b});
            } else {
              this.setState({loading: false});
              alert('server-error')
            }
          });
        
        }else{

          this.setState({errortextrange:'Your Maximum Bid Limit is '+this.state.endlimit+' Aed.Kindly make deposit to increase your limit'})


          this.setState({loading: false});
          this.setState({errorrange: true});

        }
        
      }else{
        this.setState({errortextrange:'Your Minimum Bid Limit is '+this.state.startlimit+' Aed.Kindly above'})

          this.setState({loading: false});
          this.setState({errorrange: true});

        }
    


    } else {
      this.setState({loading: false});

      this.setState({error: true});
      // alert('your bid is lower than previioues bid')
    }


  // } else {

  //   this.setState({loading: false});
  //   this.setState({errorresrve: true});

  // }
  };


  Bidnow2 = () => {
    this.setState({loading:true})
    let m = this.state.MinimumBid;
    

 
    let userid = this.state.User_Id.toString();

    
    let a = this.state.id;
    let b = this.state.bidvalue;
    let ui = this.state.userid;
    console.warn('userid' + ui + 'high' + b + 'auction' + a);

    let urlbid = 'http://68.183.179.25/api/postBid';
    // this.setState({ isLoading: true });
    var value = new FormData();
    value.append('Auction_id', a);
    value.append('User_id', userid);
    value.append('Latestbid', this.state.MinimumBid);
    value.append('Usertoken', this.state.User_token);

    fetch(urlbid, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: value,
    })
      // .then((response) => response.json())
      .then((responseJson) => {
        console.warn('bidresponse :: ', responseJson);
        if (responseJson.status === 200) {
          this.setState({yourcureentBid: this.state.bidvalue});
          this.setState({colorbidbtn: '#58D68D'});
          this.setState({loading: false});

          this.showSnackbarMessage();
          // this.state.yourbidcheck = b;
          this.setState({yourbidcheck: b});
        } else {
          this.setState({loading: false});
          alert('server-error')
        }
      });
    
    }

    // let y = AppConstance.USER_INFO.USER_ID;
    // // if (this.state.bidvalue > r) {
    // if (this.state.bidvalue >= m) {
    //     if(this.state.bidvalue >= s ){

    //       if(this.state.bidvalue <= e){

            

    //     let a = this.state.id;
    //     let b = this.state.bidvalue;
    //     let ui = this.state.userid;
    //     console.warn('userid' + ui + 'high' + b + 'auction' + a);

    //     let urlbid = 'http://68.183.179.25/api/postBid';
    //     // this.setState({ isLoading: true });
    //     var value = new FormData();
    //     value.append('Auction_id', a);
    //     value.append('User_id', userid);
    //     value.append('Latestbid', this.state.bidvalue);
    //     value.append('Usertoken', this.state.User_token);

    //     fetch(urlbid, {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         // 'Content-Type': 'application/json',
    //       },
    //       body: value,
    //     })
    //       // .then((response) => response.json())
    //       .then((responseJson) => {
    //         console.warn('bidresponse :: ', responseJson);
    //         if (responseJson.status === 200) {
    //           this.setState({yourcureentBid: this.state.bidvalue});
    //           this.setState({colorbidbtn: '#58D68D'});
    //           this.setState({loading: false});

    //           this.showSnackbarMessage();
    //           // this.state.yourbidcheck = b;
    //           this.setState({yourbidcheck: b});
    //         } else {
    //           this.setState({loading: false});
    //           alert('server-error')
    //         }
    //       });
        
    //     }else{

    //       this.setState({errortextrange:'Your Maximum Bid Limit is '+this.state.endlimit+' Aed.Kindly make deposit to increase your limit'})


    //       this.setState({loading: false});
    //       this.setState({errorrange: true});

    //     }
        
    //   }else{
    //     this.setState({errortextrange:'Your Minimum Bid Limit is '+this.state.startlimit+' Aed.Kindly above'})

    //       this.setState({loading: false});
    //       this.setState({errorrange: true});

    //     }
    


    // } else {
    //   this.setState({loading: false});

    //   this.setState({error: true});
    //   // alert('your bid is lower than previioues bid')
    // }


  // } else {

  //   this.setState({loading: false});
  //   this.setState({errorresrve: true});

  // }
  
  onChangeText = (changebid) => {
    // this.setState({inputtex:changebid})
    // inputbidtext= changebid
    this.setState({bidvalue: changebid.replace(/[^0-9]/g)});
    this.setState({yourbidder: changebid.replace(/[^0-9]/g)});

    
  };

  userid = async () => {
    await AsyncStorage.getItem('USER_ID').then((value) => {
      this.setState({User_Id: value});
      console.warn(this.state.User_Id);
    });
  };

  bidapi = () => {
    let auctionid = this.state.item.id;
    let userid = this.state.User_Id;
    console.warn('user' + userid);
    let bb = AppConstance.USER_INFO.USER_ID;
    var vv =
      'http://68.183.179.25/api/getBid?' +
      'Auction_id=' +
      auctionid +
      '&User_id=' +
      userid;
    fetch(vv, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.warn(responseJson.data);

        if (
          responseJson.data[0].currentBid !== null &&
          responseJson.data[0].highestBid !== null
        ) {
          if (
            responseJson.data[0].currentBid === responseJson.data[0].highestBid
          ) {
            this.setState({colorbidbtn: '#58D68D'});
          }
        }

        if (responseJson.data[0].currentBid !== null) {
          // console.warn('currentbiduser'+responseJson.data[0].currentBid);
          this.setState({loading: false});
          this.setState({
            yourcureentBid: responseJson.data[0].currentBid.toString(),
          });
        }
        if (responseJson.data[0].highestBid !== null) {
          this.setState({bidvalue: responseJson.data[0].highestBid.toString()});
          this.setState({
            Highestbid: responseJson.data[0].highestBid.toString(),
          });
          // inputbidtext = responseJson.data[0].highestBid;
          // this.setState({inputbid:responseJson.data[0].highestBid})
          // this.setState({inputbid:inputbidtext})
          this.setState({loading: false});

          let hb = responseJson.data[0].highestBid;
          let hb1 = Number(hb); // returns 123
          hb1 = hb + 500;
          this.setState({MinimumBid: hb1});
        } else {
          this.setState({loading: false});

          let o = this.state.item.ReserveCost;
          this.setState({Highestbid: o.toString()});
          this.setState({bidvalue: o.toString()});
          this.setState({loading: false});

          let hb = o;
          let hb1 = Number(hb); // returns 123
          hb1 = hb1 + 500;
          this.setState({MinimumBid: hb1});
        }
      });
  };
   showSnackbarMessageclosed =()=> {
    setTimeout(() => {
        Snackbar.show({
            backgroundColor: Appcolors.toolbarColor,
            title: "Auction is Closed now wait for an update and Approval",
            duration: Snackbar.LENGTH_SHORT,
        });
    }, 1000);
  
  }
  Timer = () => {
    // var date = moment().format('YYYY-MM-DD hh:mm:ss');
    let date = moment().format('YYYY-MM-DD hh:mm:ss');
    var localTime = moment.utc(this.state.item.EndDate).local().format('YYYY-MM-DD hh:mm:ss');
    let diffr = moment.duration(moment(localTime).diff(moment(date)));
    let hours = parseInt(diffr.asHours());
    let minutes = parseInt(diffr.minutes());
    let seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    this.setState({Timer: d});
  };
  componentDidMount() {
    //  setTotalDuration(d);
   
    // this.Timer();

    let v = AppConstance.USER_TOKEN;
    this.setState({v});


    Pusher.logToConsole = true;

    let PusherClient = new Pusher('testappkey', {
      //cluster: 'mt1',
      wsHost: '68.183.179.25',
      wsPort: '6001',
      wssHost: '68.183.179.25',
      wssPort: '6001',
      enabledTransports: ['ws', 'wss'],
      forceTLS: false,
      disableStats: true,
    });

    let echo = new Echo({
      broadcaster: 'pusher',
      client: PusherClient,
    });

    echo.channel('testing-channel').listen('testEvent', (e) => {
      let i = e.data.latestBid.toString();

      if (i !== this.state.yourbidcheck) {
        this.setState({colorbidbtn: 'orange'});
      }
      console.warn('iiii' + e);

      this.setState({Highestbid: i});
      this.setState({bidvalue: i});
      let hb = i;
      let hb1 = e.data.latestBid; // returns 123
      hb1 = hb1 + 500;
      this.setState({MinimumBid: hb1.toString()});
    });
  }

  render() {
    // let date = moment().format('YYYY-MM-DD hh:mm:ss');
    // var date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC
    //  let expirydate = '2020-11-16 13:30:01'; //You can set your own date-time

    //  //Let suppose we have to show the countdown for above date-time
    //  let diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //  //difference of the expiry date-time given and current date-time
    //  let hours = parseInt(diffr.asHours());
    //  let minutes = parseInt(diffr.minutes());
    //  let seconds = parseInt(diffr.seconds());
    //  let d = hours * 60 * 60 + minutes * 60 + seconds;
    //  //converting in seconds
    // //  alert(d)
    //  this.setState({time:d});
    // const { days, hours, mins, secs } = this.state
    return (
      <View>
        <DialogLoder loading={this.state.loading} />

        {/* <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.closed}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
              backgroundColor: '#0006',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                borderWidth: 0.5,
                borderColor: 'black',
                flexDirection: 'column',
                shadowColor: 'red',
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  height: 35,
                }}>
                <Text
                  style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                  {' '}
                  Auction Closed
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 30,
                    fontSize: 13,
                    textAlign: 'center',
                    color: 'grey',
                  }}>
                  {' '}
                  Auction is Closed now wait for an update and Approval
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 10,
                }}></View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({closed: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.bidconfirmation}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
              backgroundColor: '#0006',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                
                borderWidth: 0.5,
                borderColor: 'black',
                flexDirection: 'column',
                shadowColor: 'red',
              }}>

<View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: undefined,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 12,
                    fontSize: 14,
                    textAlign:'justify',
                    color: 'black',
                    fontWeight:'bold'

                    
                  }}>

                Your are about to place a bid of AED {this.state.bidvalue} on this {this.state.item.Make} {this.state.item.Model} {this.state.item.Year} ({this.state.item.ExactModel})               </Text>
              </View>





            <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: undefined,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 13,
                    textAlign:'auto',
                    color: 'black',
                    
                  }}>By clicking Confirm you agree to the <Text style={{fontWeight:'bold'}}>Terms & Conditions </Text>and<Text style={{fontWeight:'bold'}}> Privacy Policy</Text>.  
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: undefined,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 12,
                    fontSize: 13,
                    textAlign:'justify',
                    color: 'black',
                    letterSpacing:0.5,
                    
                  }}>

                  Note: If your payment arrives by {this.state.t24},we will charge the lowest applicable VAT rate for this car and and your total incl. VAT and Added Services will approximately be <Text style={{fontWeight:'bold'}}>AED {this.state.bidvalueplusVat}</Text> ,(indication based on historical values).If your payment arrives late,we will have to charge you VAT on the vehicle and your total will be <Text style={{fontWeight:"bold"}}>AED {this.state.cost24after}</Text> incl.VAT and update Added Services. 
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 10,
                }}></View>

              <View
                style={{
                  paddingVertical: 13,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                  flexDirection:'row'
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({bidconfirmation: false})}
                  style={{
                    borderRadius: 10,
                    width:'45%',
                    alignSelf: 'center',
                    backgroundColor: 'transparent',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'grey',
                    }}>
                   Cancel
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => {this.setState({bidconfirmation: false});this.Bidnow}}
             style={{
                    borderRadius: 5,
                    width:'45%',
                    alignSelf: 'center',
                    backgroundColor: 'green',
                    paddingVertical: 13,
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>


              </View>
            </View>
          </View>
        </Modal>





        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.saved}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
              backgroundColor: '#0006',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                
                borderWidth: 0.5,
                borderColor: 'black',
                flexDirection: 'column',
                shadowColor: 'red',
              }}>

<View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: undefined,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 50,
                    fontSize: 16,
                    textAlign:'center',
                    color: 'black',
                    fontWeight:'bold'

                    
                  }}>

                Your bid has been saved</Text>
              </View>





            <View
                style={{
                  paddingVertical: 12,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: undefined,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 13,
                    textAlign:'auto',
                    color: 'grey',
                    
                  }}>Thank you for placing your bid! We will contact ypu, if you have submitted the highest bid first.  
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: undefined,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 12,
                    fontSize: 13,
                    textAlign:'justify',
                    color: 'grey',
                    letterSpacing:0.5,
                    
                  }}>

                <Text style={{fontWeight:'bold'}}>Note</Text> : As long as the countdown is running you can update your bid. 
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 10,
                }}></View>

              <View
                style={{
                  paddingVertical: 13,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                  flexDirection:'row'
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({saved: false})}
                  style={{
                    borderRadius: 10,
                    width:'45%',
                    alignSelf: 'center',
                    backgroundColor: '#00ffff',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'blue',
                    }}>
                   Ok
                  </Text>
                </TouchableOpacity>


              </View>
            </View>
          </View>
        </Modal>







        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.errorrange}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
              backgroundColor: '#0006',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                borderWidth: 0.5,
                borderColor: 'black',
                flexDirection: 'column',
                shadowColor: 'red',
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  height: 35,
                }}>
                <Text
                  style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                  {' '}
                  Error Range limit
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 30,
                    fontSize: 13,
                    textAlign: 'center',
                    color: 'grey',
                  }}>

                  {this.state.errortextrange}
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 10,
                }}></View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({errorrange: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>





        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.errorresrve}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
              backgroundColor: '#0006',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                borderWidth: 0.5,
                borderColor: 'black',
                flexDirection: 'column',
                shadowColor: 'red',
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  height: 35,
                }}>
                <Text
                  style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                  {' '}
                  Error 
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 30,
                    fontSize: 13,
                    textAlign: 'center',
                    color: 'grey',
                  }}>

                  You need to enter bid amount above starting price. 
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 10,
                }}></View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({errorresrve: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>











        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.error}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
              backgroundColor: '#0006',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                borderWidth: 0.5,
                borderColor: 'black',
                flexDirection: 'column',
                shadowColor: 'red',
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  height: 35,
                }}>
                <Text
                  style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                  {' '}
                  Error
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 30,
                    fontSize: 13,
                    textAlign: 'center',
                    color: 'grey',
                  }}>
                  {' '}
                  You need to bid at least the Minimun Bid amount
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 10,
                }}></View>

              <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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

            <View
              style={{
                width: '100%',
                height: 40,
                flexDirection: 'row',
                borderBottomWidth: 0.4,
                borderBottomColor: '#E8E8E8',
              }}>
              {/* <Moment>{this.state.dateToFormat}</Moment> */}
              {/* <Moment from="2015-04-19"></Moment> */}

              {/* <Text style={{fontWeight:"bold",fontSize:50,marginBottom:50}}>{`${days} : ${hours} : ${mins} : ${secs}`}</Text> */}
              {/* <Text style={{    textAlign: 'center',textAlignVertical:"center", width:'30%', color:'red', backgroundColor:'#E8E8E8'}} > {` ${hours} : ${mins} : ${secs}`} </Text> */}
              <CountDown
                style={{width: '26%'}}
                // until={this.state.Timer}
                 until={this.state.Timer}

                //duration of countdown in seconds
                timetoShow={('H', 'M', 'S')}
                //formate to show
                onFinish={() => {
                  this.setState({complete: true});
                  this.setState({Textinput:false})
                  this.showSnackbarMessageclosed();
                  // this.setState({closed: true});
                }}
                //on Finish call
                // onPress={() => alert('hello')}
                digitStyle={{backgroundColor: '#0000', width: 22}}
                digitTxtStyle={{color: 'red', fontWeight: 'Normal'}}
                separatorStyle={{color: 'red'}}
                timeToShow={['H', 'M', 'S']}
                timeLabels
                showSeparator
                //on Press call
                size={14}
              />
              <TextInput
                style={{
                  textAlign: 'center',
                  color: 'black',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: '26%',
                }}
                onChangeText={this.onChangeText}
                editable={this.state.Textinput}
                maxLength={8}
                  keyboardType = 'number-pad'
                placeholder='Bid here'
                value={this.state.yourbidder}></TextInput>

              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 10,
                  width: '7%',
                }}>
                AED
              </Text>
              
              {this.state.complete === true ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: this.state.colorbidbtn,
                    justifyContent: 'center',
                    width: '40%',
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Auction Closed
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.Bidnow()}
                  style={{
                    backgroundColor: this.state.colorbidbtn,
                    justifyContent: 'center',
                    width: '27%',
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Bid Now
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
              onPress={() => this.Bidnow3()}

                  style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    width: '14%',
                  }}>
                  <Text style={{textAlign:'center'}}>
                  Next Bid


                  </Text>
                  {/* <Image 
style={{width:'100%',height:40}}
source={require('../Assets/icons/next3.png')} 
                  /> */}
                  {/* <Text style={{color: 'white', textAlign: 'center'}}>
                    Next
                  </Text> */}
                </TouchableOpacity>
              {/* <TouchableOpacity 
            onPress={() =>  this.Bidnow()}
      style={{backgroundColor:this.state.colorbidbtn,justifyContent:"center" , width:'28%'}}
       >
        <Text style={{ color:'white',textAlign:'center',}}>Bid Now</Text>
      </TouchableOpacity> */}
            </View>
         
            <View
              style={{
                width: '100%',
                paddingTop: 10,
                height: 50,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#E8E8E8',
              }}>
              <View style={{width: '25%', flexDirection: 'column'}}>
                <Text
                  style={{
                    flexDirection: 'row',
                    fontSize: 10,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Starting Price
                </Text>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}>
                    {this.state.rc}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      textAlignVertical: 'bottom',
                      fontSize: 9,
                    }}>
                    AED
                  </Text>
                </View>
              </View>

              <View style={{width: '25%', flexDirection: 'column'}}>
                <Text
                  style={{
                    flexDirection: 'row',
                    fontSize: 10,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Your Current Bid
                </Text>

                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      textAlignVertical: 'bottom',
                      fontSize: 12,
                    }}>
                    {this.state.yourcureentBid} AED
                  </Text>
                  {/* <Text style={{  fontSize:12, textAlign: 'center',textAlignVertical:"center", }} >{this.state.SUserCurrentbid}</Text> */}
                </View>
              </View>
              {/* <BlinkView element={Text}>veritatis</BlinkView> */}
           
           
              <View style={{width: '25%', flexDirection: 'column'}}>
                <Text
                  style={{
                    flexDirection: 'row',
                    fontSize: 10,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Highest Bid
                </Text>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                 
                 
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}>
                    {this.state.Highestbid}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      textAlignVertical: 'bottom',
                      fontSize: 9,
                    }}>
                    AED
                  </Text>
                </View>
              </View>

              <View style={{width: '25%', flexDirection: 'column'}}>
              
                <Text
                  style={{
                    flexDirection: 'row',
                    fontSize: 10,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Minimum Bid
                </Text>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}>
                    {this.state.MinimumBid}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      textAlignVertical: 'bottom',
                      fontSize: 9,
                    }}>
                    AED
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#ebedef',
                width: deviceWidth,
                height: 20,
              }}></View>

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
                <Text style={{color: 'black',fontWeight:'bold', fontSize: 15}}>Highlights</Text>



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
                    <Text style={{fontSize: 13,fontWeight:'bold'}}>ServiceHistory, 50</Text>
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
                    <Text style={{fontSize: 13}}>Door Front Left</Text>
                    <Text style={{fontSize: 13}}>
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
                    <Text style={{fontSize: 13,fontWeight:'bold/'}}>Wing Rear Left</Text>
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
                      marginHorizontal: 15,
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
                      marginHorizontal: 30,
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
                      paddingVertical: 1,
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
                      marginHorizontal: 30,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Engine Noise</Text>
                    <Text style={{fontSize: 12}}>
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











{/* 

<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between' }}>
<Text>Glass And Outside Mirrors</Text>
{this.state.GlassandoutsideMirrors === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({GlassandoutsideMirrors:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({GlassandoutsideMirrors:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>


{this.state.GlassandoutsideMirrors === true ?
  <View>       
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      borderBottomColor: '#abb2b9',
                      paddingVertical: 5,
                      marginHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Make: </Text>
                    <Text style={{fontSize: 12}}>{this.state.item.Make}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Model: </Text>
                    <Text style={{fontSize: 12}}>{this.state.item.Model}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      marginHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Exact Model: </Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.ExactModel}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Transmission: </Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.Transmission}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Interior Trim</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.InteriorTrim}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Year</Text>
                    <Text style={{fontSize: 12}}>{this.state.item.Year}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Specifications</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.Specifications}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Engine Size</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.EngineSize}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Engine Clinders</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.EngineGlinders}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>OdoMeter Reading</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.OdoMeterReading}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Paint</Text>
                    <Text style={{fontSize: 12}}>{this.state.item.Paint}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Accident History</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.AccidentHistory}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>ServiceHistory, 50</Text>
                    <Text style={{fontSize: 12}}>
                      {(this.state.item.ServiceHistory, 50)}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Service Type</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.ServiceType}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 30,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Body</Text>
                    <Text style={{fontSize: 12}}>{this.state.item.Body}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Drive</Text>
                    <Text style={{fontSize: 12}}>{this.state.item.Drive}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Steering Wheel Location</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.SteeringWheelLocation}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Car Color</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.CarColor}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Fuel Type</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.FuelType}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Car Number</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.CarNumber}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Engine Size</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.EngineSize}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>
                      Structural/Chassis Damage
                    </Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.Structural_Chassis_Damage}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Chassis Repaired</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.ChassisRepaired}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Chassis Extention</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.ChassisExtention}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Naviagtion System</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.NaviagtionSystem}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>VIN Plate</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.VINPlate}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Manufacture Year</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.ManufactureYear}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Manufacture Month</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.ManufactureMonth}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Warranty Month</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.WarrantyMonth}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Warranty Validity</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.WarrantyValidity}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Warranty Validity</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.WarrantyValidity}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>SMC Valid Till</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.SMC_ValidTill}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Warranty Validity</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.WarrantyValidity}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Number Of Keys</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfKeys}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Warranty Validity</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.WarrantyValidity}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Roof</Text>
                    <Text style={{fontSize: 12}}>{this.state.item.Roof}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Rim Type</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.RimType}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Rim Condition</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.RimCondition}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Seal Color</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.SealColor}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      paddingVertical: 5,
                      borderBottomColor: '#abb2b9',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 12}}>Number Of Seats</Text>
                    <Text style={{fontSize: 12}}>
                      {this.state.item.NumberOfSeats}
                    </Text>
                  </View>
                  </View>:null

}




</View>






<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Check of Doors</Text>
{this.state.checkofdoors === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({checkofdoors:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({checkofdoors:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>





</View>







<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Lights</Text>
{this.state.lights === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({lights:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({lights:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>

<View>


<Text>dummy data</Text>
<Text>dummy data</Text>
<Text>dummy data</Text>

</View>



</View>











<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Audio Entertainment</Text>
{this.state.AudioEntertaiment === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({AudioEntertaiment:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({AudioEntertaiment:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>


<View>


<Text>dummy data</Text>
<Text>dummy data</Text>
<Text>dummy data</Text>

</View>



</View>








<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Heat/AC</Text>
{this.state.HeatAC === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({HeatAC:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({HeatAC:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>


<View>


<Text>dummy data</Text>
<Text>dummy data</Text>
<Text>dummy data</Text>

</View>




</View>








<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Interior Amenities</Text>
{this.state.InteriorAmenities === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({InteriorAmenities:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({InteriorAmenities:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>

<View>


<Text>dummy data</Text>
<Text>dummy data</Text>
<Text>dummy data</Text>

</View>



</View>







<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Carpet,trim and Mats</Text>
{this.state.Carpet === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({Carpet:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({Carpet:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>


<View>


<Text>dummy data</Text>
<Text>dummy data</Text>
<Text>dummy data</Text>

</View>


</View>





<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Seats</Text>
{this.state.Seats === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({Seats:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({Seats:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>





</View>









<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Test Drive General</Text>
{this.state.TestDriveGeneral === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({TestDriveGeneral:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({TestDriveGeneral:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>





</View>







<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Test Drive Sensors and Cameras</Text>
{this.state.TestDriveSensorsandCameras === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({TestDriveSensorsandCameras:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({TestDriveSensorsandCameras:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>





</View>









<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Engine</Text>
{this.state.Engine === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({Engine:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({Engine:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>





</View>





<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Electical System</Text>
{this.state.ElectricalSystem === true ?
   <TouchableOpacity
                onPress={() =>  this.setState({ElectricalSystem:false})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/down-arrow.png')} />
                 </TouchableOpacity> :
                 <TouchableOpacity
                onPress={() =>  this.setState({ElectricalSystem:true})}
               >
                <Image
                style={{height:13,width:13}}
                 source={require('../Assets/icons/up-arrow.png')} />
                 </TouchableOpacity>
                    }




</View>

<View>

<Text>jsdhksdhkv</Text>
<Text>jsdhksdhkv</Text>
<Text>jsdhksdhkv</Text>
<Text>jsdhksdhkv</Text>

</View>



</View>




<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Transmission,Transaxle,Differential and transfer Case</Text>
<Text>Vehicle Info</Text>





</View>





</View>




<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>tires And Wheels </Text>
<Text>Vehicle Info</Text>





</View>





</View>







<View  style={{

flexDirection:'column',
paddingVertical:5,
paddingHorizontal:10,

}}>
<View 
style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
<Text>Brakes</Text>
<Text>Vehicle Info</Text>





</View>





</View>
 */}






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

export default ongoingDetails;
