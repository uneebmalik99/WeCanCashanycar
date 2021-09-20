import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import Appcolors from '../AppColors/Appcolors';
import Snackbar from 'react-native-snackbar-component'
import DeviceInfo from 'react-native-device-info';


export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

class AppConstance extends Component {

    static AUTH_KEY = 'yyx6gzTHBjb_BW1MN-atMUC9Cr2B1r2E'

    static USER_TOKEN = '';
    static name =  'yyyy'

    static email ='';
    static password ='';
    static name ='';
    
    static USER_TOKEN_KEY = 'user_token'
    static JOB_STAGE_ID = 0;
    static password = ''

    static APP_PROPS = '';
    static APP_TOGGLE_FUN = '';

    static API_SUCESSCODE = '200';

    static BASE_IMAGE_PATH = 'https://erp.gwwshipping.com/uploads/';

    static ISLOGIN_SCREEN_VIS = false;

    static FIRE_BASE_SERVER_KEY = "AAAAeTW8SRw:APA91bFJG604bz0dEICq7QDjtaKTCbwKZkW--mCcGfnGiW5GxE9wdk40TdFfJ0Tm2FLyXi0hVIAEnfPj79vtwqHWwYUwAvXH5IXg2hq_GZul1aCWYIbv1p_hXB6NZsm5_WIZB9jzv5iS";
    
    	

    static showSnackbarMessage() {
        setTimeout(() => {
            Snackbar.show({
                backgroundColor: Appcolors.toolbarColor,
                title: "NOT",
                duration: Snackbar.LENGTH_SHORT,
            });
        }, 100);

    }

    
    
    static gettingStatusNameFromId = (statusId) => {
        if (statusId == 6) {
            return 'NEW PURCHASED';
        } else if (statusId == 1) {
            return 'ON HAND';
        } else if (statusId == 2) {
            return 'READY TO SHIP'
        } else if (statusId == 3) {
            return 'ON THE WAY'
        } else if (statusId == 10) {
            return 'ARRIEVED'
        }
    }


    static gettingStatusIfFromName = (statusName) => {
        if (statusName == 'NEW PURCHASED') {
            return 6;
        } else if (statusName == 'ON HAND') {
            return 1;
        } else if (statusName == 'READY TO SHIP') {
            return 2;
        } else if (statusName == 'ON THE WAY') {
            return 3;
        } else if (statusName == 'ARRIVED') {
            return 10;
        }
    }

    static gettingTowingTitle = (towingTileId) => {
        if (towingTileId==5) {
            return 'CLEAN TITLE'
        }else if (towingTileId==6) {
            return 'DMV TITLE'
        }else if (towingTileId==4) {
            return 'LIEN TITLE'
        }else if (towingTileId==3) {
            return 'BOS TITLE'
        }else if (towingTileId==2) {
            return 'PENDING TITLE'
        }else if (towingTileId==7) {
            return 'JUNK TITLE'
        }
        else if (towingTileId==8) {
            return 'SALVAGE'
        }
        else if (towingTileId==9) {
            return 'Certificate of Distraction'
        }
        else if (towingTileId==10) {
            return 'Unfit'
        }
        else if (towingTileId==11) {
            return 'Burn'
        }
        else if (towingTileId==12) {
            return 'Nonerepairable'
        }
        else if (towingTileId==13) {
            return 'Parts Only'
        }
        else if (towingTileId==14) {
            return 'Rebuildable'
        }
    }

    static USER_INFO = {
        USER_TOKEN: 'auth_key',
        USER_ID: 'user_id',
        USER_NAME: 'name',
        USER_EMAIL: 'email',
        USER_MOBILE: 'mobile',
        USER_STATUS: 'status',
        USER_ADDRESS1: 'address_line1',
        USER_ADDRESS2: 'address_line2',
        USER_CITY: 'city',
        USER_STATE: 'state',
        USER_DELETED: 'is_deleted',
        USER_ZIP_CODE: 'zip_code',
        USER_CUSTOMER_NAME: 'customer_name',
        USER_FAX: 'user_fax',
        USER_IS_BLOCK: 'is_block'
    }

    //store profile data as json response
    static USER_INFO_OBJ = 'userInfoObj';

    static IS_USER_LOGIN = '0' // 0- log out , 1- login
}
export default AppConstance;