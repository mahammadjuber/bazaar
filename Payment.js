import React,{Component} from 'react';
import {Alert,TextInput,View,Text,AsyncStorage,ScrollView,StyleSheet,Dimensions,Image} from 'react-native';
import HeaderComponent from './Header.js';
import APP_CONSTANTS from './AppConstants.js';
import {Dropdown} from 'react-native-material-dropdown';
import {Button,Icon,Divider} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import RadioBtn from  './RadioBtn';



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


class Payment extends Component{

  /* TO HIDE DEFAULT HEADER */
  static navigationOptions={
    header:null,
  }
/* //TO HIDE DEFAULT HEADER */




constructor(){
 super()
this.state={
    categories:[],
    BillTotal:0,
    SampleData:'React Bazaar',
    BazaarCart:'',
    CartItems:<View><Text></Text></View>,
    NoOfItems:0,
    Addresses:<View><Text></Text></View>,
    LoggedInUserId:false,
    SelectedAddress:false,
},

this.AddressList=[];
this.CartRefs=[];
}




componentWillMount() {
  
  
  const { navigate } = this.props.navigation;

  const { navigation } = this.props;
  let OrderDet=navigation.getParam('OrderDet', 'NO-ID');

  Cart=OrderDet.cart_products;
  
  this.setState({NoOfItems:Cart.length})   
  this.setState({BazaarCart:Cart});
  this.setState({LoggedInUserId:OrderDet.user_id});
  this.setState({SelectedAddress:OrderDet.address_id});
  this.setState({BillTotal:parseFloat(OrderDet.bill_total)});


  


}



PlaceOrder=()=>{


  var Cart=this.state.BazaarCart;
  
  const { navigate } = this.props.navigation;

  Products=[];
   for(i=0;i<Cart.length;i++){
    EachProd={};
    EachProd['productid']=Cart[i]['ProdDetails'].product_id;
    EachProd['varientid']=Cart[i]['VariantId'];  
    EachProd['quantity']=Cart[i]['Quantity'];  
    Products.push(EachProd);
  }

  ProdDet=[];
  ProdDet['Boxid']=24;
  ProdDet['PBMid']=69;
  ProdDet['products']=69;



  AddressId=this.state.SelectedAddress;
  user_id=this.state.LoggedInUserId;
  totalamount=this.state.BillTotal;
  payment_method='pay_later';


  fetch(APP_CONSTANTS.APP_API_URL+'confirmSubscription', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      AddressId:AddressId,
      user_id: user_id,
      totalamount:totalamount,
      payment_method:payment_method,
      products:ProdDet,
    }),
  }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson['status']=='Success'){
          responseJson['user_id']=this.state.LoggedInUserId;
          navigate('OrderSuccess',{OrderDet:responseJson});
        }else{
          navigate('OrderFail',{OrderDet:responseJson});
        }
        
//DO SOMETHING


        
      })
      .catch((error) => {
        console.error(error);
      });
      
   
  



}
 





 



 


render(){
   debugger;

   
 
return(
  
  <View style={{flex:1,backgroundColor:'white'}}>
    <HeaderComponent />

<Text style={{fontSize:20,textAlign:'center',paddingTop:10,paddingBottom:10}}>Payment</Text>

<ScrollView style={{backgroundColor:'#f1f3f6'}}>
  <View>
    
  <RadioBtn radio_btn_name='radio-button-unchecked' group_name='pay_method' radio_btn_clr='#333' id='1' label='Pay Online'/>
  <RadioBtn radio_btn_name='radio-button-unchecked' group_name='pay_method' radio_btn_clr='#333' id='2' label='Cash on Delivery'/>
    </View>
 

{/* PRICE DETAILS */}
<View style={styles.priceDetails}>

<Text style={{color:"#666",fontSize:12}}>PRICE DETAILS</Text>
<Divider style={styles.divider} />

<View style={styles.Row}>
<View style={styles.splitCols}>
<Text>Price ( {this.state.NoOfItems} items )</Text>
</View>
<View style={styles.splitCols}>
<Text style={styles.textRight}>{APP_CONSTANTS.APP_CURRENCY}{this.state.BillTotal}</Text>
</View>
</View>

<View style={styles.Row}>
<View style={styles.splitCols}>
<Text>
   Delivery Charges</Text>
</View>
<View style={styles.splitCols}>
<Text style={[styles.textRight,{color:'mediumseagreen'}]}>FREE</Text>
</View>
</View>


<View style={styles.Row}>
<View style={styles.splitCols}>
<Text>
   Amount payable</Text>
</View>
<View style={styles.splitCols}>
<Text style={styles.textRight}>{APP_CONSTANTS.APP_CURRENCY}{this.state.BillTotal}</Text>
</View>
</View>


</View>
{/* PRICE DETAILS */}









</ScrollView>

{/* CART FOOTER  */}

<View style={[styles.cartFooter,styles.Row]}>
<Text style={[styles.splitCols,styles.totalPrice]}>{APP_CONSTANTS.APP_CURRENCY}{this.state.BillTotal}</Text>
<View style={styles.splitCols}>
<View style={styles.buttonView} >

<Button onPress={()=>this.PlaceOrder()} title='PLACE ORDER'   
buttonStyle={{
        backgroundColor: "#fb641b",
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
        width:'100%'
      }}/>
</View>
</View>
</View>

{/* CART FOOTER  */}

</View>

)


}



}//end of class


export default Payment;