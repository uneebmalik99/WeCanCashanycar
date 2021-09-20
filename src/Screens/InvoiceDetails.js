import React,{Component,useState,useEffect} from 'react';
import { View,Image,Button,TouchableOpacity,Text, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DialogLoder from '../utils/DialogLoder';
import AppConstance, { deviceHeight, deviceWidth } from '../AppConstants/AppConstance';
import AsyncStorage from '@react-native-community/async-storage';

let vehicleObj1;
let price;
let image;
class InvoiceDetails extends Component {
  
  
  constructor(vehicleObj) {
      super(vehicleObj)
      vehicleObj1 = vehicleObj.route.params.vehicleObj;
      price = vehicleObj.route.params.p;
      image = vehicleObj.route.params.img;

      this.state = {
        Loading: false,
        isDisplayView: 0,
        User_id:'',
        tabIndex: 0,
        lengthofoffers:'',
        Timer:'',
        show:true,
        id:vehicleObj1,
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

next=()=>{

let v =this.state.id
alert(v)
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
       // this.props.navigation.navigate('InvoiceDetails2',{'vehicleObj': d,})



      });



}
  render() {

    return (<SafeAreaView>


                      <View
      
      style={{ backgroundColor:'#dcdcdc' ,paddingHorizontal:3, width:deviceWidth,height:deviceHeight}}
      >
      
      
      
      <TouchableOpacity 
      
      onPress={()=>      this.props.navigation.navigate('InvoiceDetails2',{'vehicleObj': vehicleObj1,})}
      style={{width:deviceWidth, height:70,backgroundColor:'white', paddingVertical:5,flexDirection:'column'}}
      >
      
      
      
      
      <View
      style={{marginLeft:'7%',marginVertical:2,marginHorizontal:10,flexDirection:'row'}}
      >
       <Image style={{ borderRadius:10,  width:80,height:55}}
             source={{ uri:'http://68.183.179.25/image/' + image }}  /> 
      
      <View
      style={{marginLeft:'4%', marginTop:2,flexDirection:'column'}}
      >
      
      <View
      style={{ flexDirection:'row'}}
      >
      <Text style={{fontSize:12}}>2015 Nissan Juke 139,768 km GCC</Text>
      
      
      </View>
      
      <View
      style={{flexDirection:'row'}}
      >
      <Text style={{fontSize:12}}>AED {price}</Text>
      
      
      </View>
      
      </View>
      
      
      
      
      </View>
      
      
      </TouchableOpacity>
      





         
  
      <View style={{width:'100%', marginTop:15, paddingVertical:10, backgroundColor:'white', paddingHorizontal:20, flexDirection:"column",}} >
      <View
      style={{flexDirection:'row',justifyContent:'space-between'}}
      >
      <View style={{flexDirection:'row',alignContent:'center',alignItems:'center'}}>
      <Image
                      style={{height:14,width:14}}
                       source={require('../Assets/icons/check.png')} />
                             <Text style={{marginLeft:10, fontWeight:'bold',color:'#268ef5'}}>Payment is complete! </Text>
      </View>
      <View
      style={{ flexDirection:'row', }}
      >
      {this.state.show === true ?
         <TouchableOpacity
                      onPress={() => this.setState({show:false}) }>
                      <Image
                      style={{height:16,width:16}}
                       source={require('../Assets/icons/down-arrow.png')} />
                       </TouchableOpacity> :
                       <TouchableOpacity
                      onPress={() => this.setState({show:true})}>
                      <Image
                      style={{height:16,width:16}}
                       source={require('../Assets/icons/up-arrow.png')} />
                       </TouchableOpacity>
                          }
      
                          </View>
      </View>
    
      
      
              
       {this.state.show === true ?
          <View style={{ backgroundColor:'white'}}>
                      <View
                        style={{
                          paddingVertical: 10,
                          borderBottomColor: '#abb2b9',
                          marginHorizontal: 3,
                          flexDirection: 'row',
                        }}>
                        <Text style={{fontSize: 12,}}>All dues have been received for this Purchase.Thank You! </Text>
                        {/* <Text style={{fontSize: 12}}>{this.state.item.Paint}</Text> */}
                      </View>
      
                      
      
                      <View
                        style={{
                          borderBottomWidth: 0.2,
                          paddingVertical: 10,
                          borderBottomColor: '#abb2b9',
                          paddingHorizontal: 3,
                          flexDirection: 'row',
                          justifyContent:'space-between'
                        }}>
                        <Text style={{fontSize: 12}}>Paid amount: </Text>
                        <Text style={{fontSize: 12 , color:'green'}}>
                          {price} AED
                        </Text>
                      </View>
      
                      <View
                        style={{
                          paddingVertical: 5,
                          borderBottomColor: '#abb2b9',
                          paddingHorizontal: 3,
                          flexDirection: 'row',
                          justifyContent:'space-between'
                        }}>
                        <Text style={{fontSize: 12}}>Due: </Text>
                        <Text style={{fontSize: 12}}>0 AED
                        </Text>
                      </View>
      
                    
                    </View>
                  
                   :
                         null  }
   
      </View>    
      </View>
      
      
  
          </SafeAreaView>
          );
  }
}
export default InvoiceDetails;























// const InvoiceDetails = ({ navigation }) => {
// const [show, setshow] = useState(false)
//     return (<SafeAreaView>

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
// <Text style={{justifyContent:'center',textAlign:"center",color:'white' , fontSize:16}} >Your Purchase</Text>

//                 </View>



//                 <View

// style={{ backgroundColor:'#dcdcdc' ,paddingHorizontal:3, width:deviceWidth,height:deviceHeight}}
// >



// <TouchableOpacity 

// onPress={()=>  navigation.navigate('InvoiceDetails2')}
// style={{width:deviceWidth, height:70,backgroundColor:'white', paddingVertical:5,flexDirection:'column'}}
// >




// <View
// style={{marginLeft:'7%',marginVertical:2,marginHorizontal:10,flexDirection:'row'}}
// >
// <Image  style={{borderRadius:10, width:80,height:55}}
//           source={require('../Assets/Images/car-1.png')}

// />

// <View
// style={{marginLeft:'4%', marginTop:2,flexDirection:'column'}}
// >

// <View
// style={{ flexDirection:'row'}}
// >
// <Text style={{fontSize:12}}>2015 Nissan Juke 139,768 km GCC</Text>


// </View>

// <View
// style={{flexDirection:'row'}}
// >
// <Text style={{fontSize:12}}>AED 22,500</Text>


// </View>

// </View>




// </View>


// </TouchableOpacity>







// <TouchableOpacity 

// onPress={()=>  navigation.navigate('InvoiceDetails')}
// style={{width:deviceWidth,marginTop:15, height:50,backgroundColor:'white', paddingVertical:10,flexDirection:'row',}}
// >
// <View style={{width:'100%', paddingHorizontal:30, flexDirection:"row",justifyContent:'space-between'}} >
// <View
// style={{ flexDirection:'row', }}
// >
// <Text style={{fontWeight:'bold'}}>tick</Text>
// <Text style={{fontWeight:'bold'}}>Payment is complete! </Text>


// </View>
//  {show === true ?
//    <TouchableOpacity
//                 onPress={() => setshow(false) }>
//                 <Image
//                 style={{height:16,width:16}}
//                  source={require('../Assets/icons/down-arrow.png')} />
//                  </TouchableOpacity> :
//                  <TouchableOpacity
//                 onPress={() =>  setshow(false)}>
//                 <Image
//                 style={{height:16,width:16}}
//                  source={require('../Assets/icons/up-arrow.png')} />
//                  </TouchableOpacity>
//                     }


// <View

// >

//   {/* {show === true ?
//    <TouchableOpacity
//                 onPress={() => setshow(false) }>
//                 <Image
//                 style={{height:16,width:16}}
//                  source={require('../Assets/icons/down-arrow.png')} />
//                  </TouchableOpacity> :
//                  <TouchableOpacity
//                 onPress={() =>  setshow(false)}>
//                 <Image
//                 style={{height:16,width:16}}
//                  source={require('../Assets/icons/up-arrow.png')} />
//                  </TouchableOpacity>
//                     } */}


//     <View>              
//  {show === true ?
//     <View style={{flex: 1}}>
//                 <View
//                   style={{
//                     borderBottomWidth: 0.2,
//                     paddingVertical: 5,
//                     borderBottomColor: '#abb2b9',
//                     marginHorizontal: 20,
//                     flexDirection: 'row',
//                   }}>
//                   <Text style={{fontSize: 12}}>Paint: </Text>
//                   {/* <Text style={{fontSize: 12}}>{this.state.item.Paint}</Text> */}
//                 </View>

//                 <View
//                   style={{
//                     borderBottomWidth: 0.2,
//                     paddingVertical: 5,
//                     borderBottomColor: '#abb2b9',
//                     paddingHorizontal: 20,
//                     flexDirection: 'row',
//                   }}>
//                   <Text style={{fontSize: 12}}>Fuel Type: </Text>
//                   {/* <Text style={{fontSize: 12}}>{this.state.item.FuelType}</Text> */}
//                 </View>

//                 <View
//                   style={{
//                     borderBottomWidth: 0.2,
//                     paddingVertical: 5,
//                     borderBottomColor: '#abb2b9',
//                     paddingHorizontal: 20,
//                     flexDirection: 'row',
//                   }}>
//                   <Text style={{fontSize: 12}}>Transmission: </Text>
//                   <Text style={{fontSize: 12}}>
//                     {/* {this.state.item.Transmission} */}
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     borderBottomWidth: 0.2,
//                     paddingVertical: 5,
//                     borderBottomColor: '#abb2b9',
//                     paddingHorizontal: 20,
//                     flexDirection: 'row',
//                   }}>
//                   <Text style={{fontSize: 12}}>Engine Clinders: </Text>
//                   <Text style={{fontSize: 12}}>
//                     {/* {this.state.item.EngineGlinders} */}
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     borderBottomWidth: 0.2,
//                     paddingVertical: 5,
//                     borderBottomColor: '#abb2b9',
//                     paddingHorizontal: 20,
//                     flexDirection: 'row',
//                   }}>
//                   <Text style={{fontSize: 12}}>ServiceHistory: </Text>
                
//                 </View>
//               </View>
            
//              :
//                    null  }
// </View>  
              
            
// </View>


// </View>


// </TouchableOpacity>








// </View>












//     </SafeAreaView>
//     );
//   };

//export default InvoiceDetails;