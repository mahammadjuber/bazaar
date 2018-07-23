import React, { Component } from 'react';
import { StyleSheet, View,Text,AsyncStorage,Alert,ScrollView,Image,TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Button,Icon,Divider } from 'react-native-elements';
import APP_CONSTANTS from '../AppConstants.js';
import CustomHeader from '../CustomHeader';
import styles from '../Stylesheet';
import DottedLine from './DottedLine';
import Toast from 'react-native-simple-toast';


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
    WalletBalance:'N/A'
}
        

    }

    componentWillMount(){

        

        AsyncStorage.getItem("LoggedInUserId").then((value) => {
            this.setState({LoggedInUserId:value});
            this.getProfile();
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
    updateMyProfile=()=>{


         Toast.show('API was not ready');
         return;
        fetch(APP_CONSTANTS.APP_API_URL+'updateUser', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
              user_id: this.state.LoggedInUserId,
              name:this.state.Name,
              email:this.state.Email,
              mobile:this.state.Mobile
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
           
                
                if(responseJson['status']=='Success'){
                    Toast.show('Profile updated successfully!');
                }else{
                    Toast.show('Something went wrong!.Please try later.');
                } 
                
              })
              .catch((error) => {
                console.error(error);
              });



    }


    render(){

    return(
    <View>
    <CustomHeader page_name='Edit Profile'/>

     <View style={styles.cardStyle}>
     <View style={{alignItems:'center'}}>
     <Image
           style={{width: 65, height: 65}}
           source={require('../assets/images/jlngdt_rounded.png')} 
          
      />
      </View>
<View style={{flexDirection:'row'}}>


      <View style={{flex:1,alignItems:'flex-end'}}>
      <Button  style={styles.createAccount}  
  icon={{ type: 'material',name:'save',size:18,
  color:APP_CONSTANTS.APP_BG_CLR}}
     title='SAVE'
     raised
     color={APP_CONSTANTS.APP_BG_CLR}
     buttonStyle={{
       backgroundColor: "#fff",
       width:100,
       height:35,
     }}
     containerViewStyle={{ marginTop:20,height:35,width:100, }}
    onPress={()=>this.updateMyProfile()}
    />

      </View>

     


</View>
<View style={{marginTop:50,padding:20,paddingTop:10,}}>

<View style={{flexDirection:'row'}}>
<Text style={{padding:10,fontWeight:'bold'}}>Name </Text>
<TextInput  defaultValue={this.state.Name} value={this.state.Name} onChangeText={(name)=>this.setState({Name:name})} style={styles.prflTextInput}></TextInput>
    </View>



    <View style={{flexDirection:'row'}}>
<Text style={{padding:10,fontWeight:'bold'}}>Email </Text>
<TextInput  defaultValue={this.state.Email} value={this.state.Email} onChangeText={(email)=>this.setState({Name:email})} style={styles.prflTextInput}></TextInput>
    </View>

    <View style={{flexDirection:'row'}}>
<Text style={{padding:10,fontWeight:'bold'}}>Mobile </Text>
<TextInput  defaultValue={this.state.Mobile} value={this.state.Mobile} onChangeText={(mobile)=>this.setState({Name:mobile})} style={styles.prflTextInput}></TextInput>
    </View>

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