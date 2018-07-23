import React, { Component } from 'react';
import { StyleSheet, View,Text,AsyncStorage,Alert,ScrollView,Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Button,Icon,Divider } from 'react-native-elements';
import APP_CONSTANTS from '../AppConstants.js';
import CustomHeader from '../CustomHeader';
import styles from '../Stylesheet';
import DottedLine from './DottedLine';


class Profile extends Component{

    static navigationOptions={
        header:null,
    }
    constructor(){
super();
this.state={
    LoggedInUserId:'',
    Name:'N/A',
    Email:'N/A',
    Mobile:'N/A',
    WalletBalance:'N/A',
}
        

    }

    componentWillMount(){

        

        AsyncStorage.getItem("LoggedInUserId").then((value) => {
            if(value!=null){
            this.setState({LoggedInUserId:value});
            this.getProfile();
            }
          });

    }
    getProfile=()=>{

        fetch(APP_CONSTANTS.APP_API_URL+'getUser', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
              user_id: this.state.LoggedInUserId,
              
              
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
           console.log(responseJson);

                if(responseJson['status']=='Success'){
                 var Profile=responseJson['data'];
                 this.setState({Name:Profile.username});
                 this.setState({Email:Profile.email});
                 this.setState({Mobile:Profile.mobile});
                 this.setState({WalletBalance:Profile.wallet_total});

                 
                }else{
                  
                } 
                
              })
              .catch((error) => {
                console.error(error);
              });

    }

    UpdateProfile=()=>{
        const { navigate } = this.props.navigation;
        navigate('UpdateProfile');
    }


    render(){

    return(
    <View>
    <CustomHeader page_name='Profile'/>

     <View style={styles.cardStyle}>
     <View style={{alignItems:'center'}}>
     <Image
           style={{width: 65, height: 65}}
           source={require('../assets/images/jlngdt_rounded.png')} 
          
      />
      </View>
<View style={{flexDirection:'row'}}>


      <View style={{flex:1,alignItems:'flex-end'}}>
<Icon containerStyle={{paddingLeft:7}} 
        name='edit'
        type='material'
        color='#000'
        size={18}
        onPress={()=>this.UpdateProfile()} 
      />
      </View>

     


</View>
<View style={{marginTop:50,padding:20,paddingTop:10,}}>
<Text style={{padding:10}}><Text style={{fontWeight:'bold'}}>Name</Text> : {this.state.Name}</Text>
      <Text style={{padding:10}}><Text style={{fontWeight:'bold'}}>Email</Text> : {this.state.Email}</Text>
      <Text style={{padding:10}}><Text style={{fontWeight:'bold'}}>Mobile</Text> : {this.state.Mobile}</Text>
    </View>
         </View>
         <View style={[styles.cardStyle,{paddingLeft:30}]}>
         

          <Image
           style={{width: 48, height: 48}}
           source={require('../assets/images/icons8-wallet-48.png')} 
          
      />
      <Text>Balance : {APP_CONSTANTS.APP_CURRENCY} {this.state.WalletBalance}</Text>
         </View>
            </View>
    )


    }




}///END OF CLASS


export default Profile;