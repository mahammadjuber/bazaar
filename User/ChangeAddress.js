import React, { Component } from 'react';
import { StyleSheet, View,Text,AsyncStorage,Alert,ScrollView,Image,Dimensions } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Button,Icon,Divider } from 'react-native-elements';
import APP_CONSTANTS from '../AppConstants.js';
import CustomHeader from '../CustomHeader';
import Scroll from '../Scroll.js';
import DottedLine from './DottedLine';
import ThatsAll from '../ThatsAll';
import Toast from 'react-native-simple-toast';


let {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
  container:{
    backgroundColor:'#f1f3f6',
    height:height,      
  },
  textRight:{
    textAlign:'right',
  },
  divider:{
    backgroundColor:'#ccc',
    marginTop:15,
    marginBottom:7,
  },
  ProductContainer:{
   minHeight:160,
   padding:10,
   paddingTop:20,
   paddingBottom:20,
   backgroundColor:'#fff',
   position:'relative',
   borderWidth: 1,
   borderRadius: 3,
   borderColor: '#fff',
   borderBottomWidth: 0,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 1,
   marginTop: 10,
  },
  productRight:{
    width:'55%',
    paddingLeft:15,
  },
  productLeft:{
  width:'40%',
  },
  productTitle:{
    fontSize:14,
  },
  cartItemss:{
     backgroundColor:'#f1f3f6',
     height:height,  
  },
  eachCartItem:{
     display:'none',
     minHeight:180,
     paddingTop:20,
     paddingBottom:20,
     backgroundColor:'#fff',
     position:'relative',
     borderWidth: 1,
     borderRadius: 3,
     borderColor: '#fff',
     borderBottomWidth: 0,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.8,
     shadowRadius: 2,
     elevation: 1,
     marginLeft: 5,
     marginRight: 5,
     marginTop: 10,
  },
  eCIFooter:{
      position:'absolute',
      bottom:0,
      height:30,
      borderColor:'#ccc',
      borderTopWidth:1,
      width:'100%'
  },
  priceDetails:{
    backgroundColor:'#fff',
    minHeight:100,
    marginTop:20,
    padding:10,
    minHeight:160,
    padding:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#fff',
    position:'relative',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10,
    marginBottom:20,
  },
  cardStyle:{
   backgroundColor:'#fff',
   minHeight:100,
   marginTop:20,
   padding:10,
   minHeight:160,
   padding:10,
   paddingTop:20,
   paddingBottom:20,
   backgroundColor:'#fff',
   position:'relative',
   borderWidth: 1,
   borderRadius: 3,
   borderColor: '#fff',
   borderBottomWidth: 0,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 1,
   marginTop: 10,
   marginBottom:20,
 },
  cartFooter:{
   backgroundColor:'#fff',
   marginTop:20,
   height:70,
   width:'100%',
   bottom:0,
   justifyContent: 'center',
   alignItems: 'center',
   padding:10,
  },
  Row:{
  flexDirection:'row',
  },
  splitCols:{
    flex:1,
    paddingTop:10,
  },
  buttonView:{
    height:45,
    backgroundColor:APP_CONSTANTS.APP_BTN_CLR,
    width:170,
    borderColor:"#fff",
    borderWidth:1,
    borderRadius:3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    color:'white',
    fontSize:15
  },
  totalPrice:{
    fontWeight:'bold',
    fontSize:25,
  },
  addressButtonStyle:{
    backgroundColor:'#fff',
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 3,
  },
  caddressButtonStyle:{
    backgroundColor:'#333',
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 3,
   
  },
  addressText:{
    fontSize:15,
  },
  displayBlock:{
    display:'flex',
  },
  displayNone:{
    display:'none',
  },
  addressNickname:{
    textAlign:'center',
    fontSize:17,
  }
  
});


export default class ChangeAddress extends Component{

  /* TO HIDE DEFAULT HEADER */
  static navigationOptions={
    header:null,
  }
/* //TO HIDE DEFAULT HEADER */

    constructor(){
        super()
        this.state={
            Addresses:<View><Text></Text></View>,
            AddressList:'',
            SubscriptionId:'',
            UserId:'',
        },
        this.AddressList=[];
this.CartRefs=[];
    }

    componentWillMount(){

        const { navigation } = this.props;
        let address_data=navigation.getParam('address_data', 'NO-ID');
        AddressList=address_data['data'];
        SubscriptionId=navigation.getParam('SubscriptionId', 'NO-ID');
        UserId=navigation.getParam('UserId', 'NO-ID');
        this.setState({SubscriptionId:SubscriptionId});
        this.setState({UserId:UserId});


       
        
        
        for(i=0;i<AddressList.length;i++){
          AddressList[i]['complete_address']=JSON.parse(AddressList[i]['complete_address'])[0];
        }
        
        this.setState({AddressList:AddressList});
        
        let AddressesViews='';
        AddressesViews=AddressList.map(EachAd =>(

          <View  key={EachAd['id']}  style={[styles.cardStyle,{flexDirection:'column'}]} ref={(ref) => { this.CartRefs['card_view_'+EachAd['id']] = ref; }}>
          <View style={{flex:2}}>
          <Text style={styles.addressNickname}>{EachAd['nickname']}</Text>
          <Text style={styles.addressText}>{EachAd['complete_address']['name']}</Text>
          <Text style={styles.addressText}>{EachAd['complete_address']['mobile']}</Text>
          <Text style={styles.addressText}>{EachAd['complete_address']['hno']}</Text>
          <Text style={styles.addressText}>{EachAd['complete_address']['area']}</Text>
          <Text style={styles.addressText}>{EachAd['complete_address']['landmark']}</Text>
          <Text style={styles.addressText}>{EachAd['complete_address']['pincode']}</Text>
          </View>
         
          <View style={{flex:1,alignItems:'center',marginTop:20}}>
          
          <View ref={(ref) => { this.CartRefs['dh_btn'+EachAd['id']] = ref; }}>
          <Button 
            icon={{ type: 'material',name:'room',size:17,
            color:APP_CONSTANTS.APP_BG_CLR}}
          onPress={()=>this.UpdtDeliveryAddress(EachAd['id'])}
          raised 
          title='Deliver Here'   
          color={APP_CONSTANTS.APP_BG_CLR}
         buttonStyle={styles.addressButtonStyle}/>

         </View>
         <View  ref={(ref) => { this.CartRefs['cad_btn'+EachAd['id']] = ref; }} style={{display:'none'}}>
            <Button 
            icon={{ type: 'material',name:'room',size:17,
            color:'white'}}
          onPress={()=>this.UpdtDeliveryAddress(EachAd['id'],'CHANGE')}
          raised
          title='Change Address'   
          color='#fff'
         buttonStyle={[styles.caddressButtonStyle]}/>

         </View>
         
          </View>
         
          </View>

        ));
        this.setState({'Addresses':AddressesViews});





    }

    UpdtDeliveryAddress=(AddressId)=>{

        fetch(APP_CONSTANTS.APP_API_URL+'checkPlansForAddress', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
              user_id: this.state.UserId,
              SubscriptionId:this.state.SubscriptionId,
              AddressId:AddressId
            
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
              
                if(responseJson['status']=='Success'){
                 Toast.show('Address changed successfully!.');   
                 const { navigate } = this.props.navigation;
                 setTimeout(function(){
                  navigate('Subscriptions');
                 },500)
                }else{
                    Toast.show('Something went wrong.Please try again later!.');   
                }

              }).catch((error) => {
                console.error(error);
              });

    }

    render(){

        return(

            <View>
<CustomHeader page_name='Change Address'/>
<ScrollView style={{backgroundColor:'#f1f3f6'}}>
{this.state.Addresses}
</ScrollView>
                </View>
        )
    }




}// END OF CLASS