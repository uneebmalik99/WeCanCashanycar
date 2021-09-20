import React,{ Component } from "react";

class AppUrlcollection extends Component{
    static BASE_URL = 'http://68.183.179.25/api/';
    static LOGIN = AppUrlcollection.BASE_URL+'authenticate';
    // static Register =AppUrlcollection;
    static Auction = AppUrlcollection.BASE_URL+'auction';
    static Auction = AppUrlcollection.BASE_URL+'bid';


    
    static EXPORT_LIST = AppUrlcollection.BASE_URL+ 'export?';
    static EXPORT_DETAIL = AppUrlcollection.BASE_URL+ 'export/view?';
    static VEHILE_LIST = AppUrlcollection.BASE_URL + 'vehicle?';
    static VEHICLE_DETAIL = AppUrlcollection.BASE_URL + 'vehicle/view';
    static LOCATION = AppUrlcollection.BASE_URL + 'location';
    static LOCATION2 = AppUrlcollection.BASE_URL + 'search/location';
    static CONTACT_US = AppUrlcollection.BASE_URL + 'contact-us/create';
    static INVOICE = AppUrlcollection.BASE_URL + 'invoice?';
    
    //static CONTAINER_TRACKING = AppUrlCollection.BASE_URL + 'export/tracking?';
    static CONTAINER_TRACKING = AppUrlcollection.BASE_URL + 'search/export?';
    static CONTAINER_TRACKING_VIEW = AppUrlcollection . BASE_URL + 'search/export-view?';

    //static VEHICLE_CONTAINER = AppUrlCollection.BASE_URL + 'vehicle/vehicle-shipping-details'
    static VEHICLE_CONTAINER = AppUrlcollection.BASE_URL + 'search/vehicle?'
    static VEHICLE_TRACKING_DETAIL = AppUrlcollection.BASE_URL + 'search/vehicle-view?'
    
    static DOWNLOAD_BILLE = AppUrlcollection.BASE_URL + 'export/billofladng-download?'
    
    static FORGOT_PASSWORD = AppUrlcollection.BASE_URL + 'user/forgot-password'
    static CHANGE_PASSWORD = AppUrlcollection.BASE_URL + 'user/update-password'



//     http://localhost/yii2_work/new_galaxy/webapi/export/billofladng-download?id=1
// http://localhost/yii2_work/new_galaxy/webapi/export/manifest-download?id=1

}
export default AppUrlcollection;