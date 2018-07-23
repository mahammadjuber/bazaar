import React,{Component} from 'react';
import {Alert,TextInput,View,Text,AsyncStorage,ScrollView,StyleSheet,Dimensions,Image} from 'react-native';
import CustomHeader from './CustomHeader.js';
import APP_CONSTANTS from './AppConstants.js';
import {Dropdown} from 'react-native-material-dropdown';
import {Button,Icon,Divider} from 'react-native-elements';
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


class Checkout extends Component{

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
    BazaarCart:[{ProductId:22},{ProductId:23}],
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
    AsyncStorage.getItem("LoggedInUserId").then((value) => {
      this.setState({LoggedInUserId:value});
      this.CheckLogin();
    });
    AsyncStorage.getItem("BazaarCart").then((value) => {
        
        let Cart=[];
        CartObject=JSON.parse(value);
        for(var key in CartObject){
            let Item=CartObject[key];
            Cart.push(Item);
            }
        this.setState({"NoOfItems":Cart.length})   
        this.setState({"BazaarCart":Cart});
       
          var BillTotal=0;
        for(j=0;j<this.state.BazaarCart.length;j++){
          let EachP=this.state.BazaarCart[j];
          BillTotal=parseFloat(BillTotal)+parseFloat(parseFloat(EachP['Price'])*parseFloat(EachP['Quantity']));
        } 
        let CartItems='';
        
      /*   CartItems= this.state.BazaarCart.map(EachP => (
         
            <View key={EachP['ProdDetails'].product_id}  ref={(ref) => { this.CartRefs['product_1'] = ref; }}  style={styles.ProductContainer}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.productLeft}>
              <Image 
                style={{height: 120,width:140}} 
                source={{uri: APP_CONSTANTS.APP_BASE_URL+EachP['ProdDetails'].front_image}}
              />
              </View>
              <View style={styles.productRight}>
              <Text style={styles.productTitle}>{EachP['ProdDetails'].title}</Text>
              <View style={{height:40,marginTop:10,marginBottom:10}}>
               <Text>{EachP['VarientName']}</Text>
               </View>
             <View style={{width:240,flexDirection:'row'}}>
                <View style={{width:80,height:40,borderColor:'#ccc',borderRadius:3,borderWidth:1,flexDirection:'row'}}>
                <Icon containerStyle={{flex:1,paddingLeft:7}} 
        name='remove'
        type='material'
        color='#517fa4'
        size={18}
        onPress={()=>this.UpdateCart(EachP['ProdDetails'].product_id,'REMOVE')}
      />
      <TextInput 

      underlineColorAndroid='#fff'
      defaultValue={EachP['Quantity'].toString()} 
      style={{textAlign:'center',paddingLeft:5,paddingRight:5,flex:1}} 
      keyboardType='numeric' maxLength={3}
      ref={(ref) => { this.CartRefs['product_quantity_'+EachP['ProdDetails'].product_id] = ref; }} 
      />
   
    <Icon containerStyle={{flex:1,paddingRight:7}} 
        name='add'
        type='material'
        color='#517fa4'
        size={18}
        onPress={()=>this.UpdateCart(EachP['ProdDetails'].product_id,'ADD')}
      />
    
    
                </View>   
      
             
      
              </View>
      
      
              </View>
        
            </View>
            </View>
           
    )); */
         this.setState({BillTotal:BillTotal});
         //this.setState({CartItems:CartItems});

    }).done(); 
    
}


  getAddress(LoggedInUserId){

     
    fetch(APP_CONSTANTS.APP_API_URL+'getAddressesList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: LoggedInUserId,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          
          if(responseJson['status']=='success'){
            AddressList=responseJson['data'];
            console.log(AddressList);
            for(i=0;i<AddressList.length;i++){
              AddressList[i]['complete_address']=JSON.parse(AddressList[i]['complete_address'])[0];
            }
            this.setState({'AddressList':AddressList});
            let AddressesViews='';
            AddressesViews=this.state.AddressList.map(EachAd =>(

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
              onPress={()=>this.SetDeliveryAddress(EachAd['id'])}
              raised 
              title='Deliver Here'   
              color={APP_CONSTANTS.APP_BG_CLR}
             buttonStyle={styles.addressButtonStyle}/>

             </View>
             <View  ref={(ref) => { this.CartRefs['cad_btn'+EachAd['id']] = ref; }} style={{display:'none'}}>
                <Button 
                icon={{ type: 'material',name:'room',size:17,
                color:'white'}}
              onPress={()=>this.SetDeliveryAddress(EachAd['id'],'CHANGE')}
              raised
              title='Change Address'   
              color='#fff'
             buttonStyle={[styles.caddressButtonStyle]}/>

             </View>
             
              </View>
             
              </View>

            ));
            this.setState({'Addresses':AddressesViews});



          }else{
            this.setState({err_login:'Incorrect mobile number or password.'});
          }
          
        })
        .catch((error) => {
          console.error(error);
        });

        const { navigation } = this.props;
        let BillDetails=navigation.getParam('BillDetails', 'NO-ID');

  }

 
 RemoveItemFromCart=(ProductId)=>{

   Elem=this.CartRefs[ProductId];
   Elem.setNativeProps({style:{display:'none'}});
   

 }


 UpdateCart=(ProductId,Action)=>{
   
   var BazaarCart=this.state.BazaarCart;
   
   var CurrentItem=[];
   for(i=0;i<BazaarCart.length;i++){
     
     
    if(BazaarCart[i]['ProdDetails'].product_id==ProductId){
      
      CurrentItem=BazaarCart[i];
    }
   }
   
   Quantity=CurrentItem['Quantity'];
   if(Action=='ADD'){
    Quantity=Quantity+1;
    
   }else if(Action=='REMOVE'){
    Quantity=Quantity-1;
   }
   CurrentItem['Quantity']=Quantity;
   
   BazaarCart[ProductId]=CurrentItem;

   
   this.CartRefs['product_quantity_'+ProductId].setNativeProps({value:Quantity.toString()});
   this.setState({'BazaarCart':BazaarCart});
   
 }

 ProceedToPay=()=>{

  

  OrderDet=[];
  OrderDet['bill_total']=this.state.BillTotal;
  OrderDet['address_id']=this.state.SelectedAddress;
  OrderDet['user_id']=this.state.LoggedInUserId;
  OrderDet['cart_products']=this.state.BazaarCart;

  const { navigate } = this.props.navigation;
  
  navigate('Payment',{'OrderDet':OrderDet});

  

 }
 
  SetDeliveryAddress=(AddressId,Action='')=>{

    if(Action=='CHANGE'){
      this.CartRefs['dh_btn'+AddressId].setNativeProps({style:{display:'flex'}});
      this.CartRefs['cad_btn'+AddressId].setNativeProps({style:{display:'none'}});
      this.setState({SelectedAddress:false});

      for (var ref in this.CartRefs) {
     

        if(ref.indexOf("card_view_")!=-1){
        
          this.CartRefs[ref].setNativeProps({display:'flex'});
        }
        
    }


    }else{
      this.setState({SelectedAddress:AddressId});
      this.CartRefs['dh_btn'+AddressId].setNativeProps({style:{display:'none'}});
      this.CartRefs['cad_btn'+AddressId].setNativeProps({style:{display:'flex'}});

      for (var ref in this.CartRefs) {
     

        if(ref.indexOf("card_view_")!=-1){
        
         CurrentItem=ref.split("_").pop();
         if(CurrentItem!==AddressId){
             this.CartRefs[ref].setNativeProps({display:'none'});
         }
        }
        
    }
    }
    //Toast.show('Thank You!!');

  }


  CheckLogin(){

    if(this.state.LoggedInUserId===false){
      const { navigate } = this.props.navigation;
      navigate('Login');
     }else{
      this.getAddress(this.state.LoggedInUserId);
     }


  }


render(){
   debugger;

   
 
return(
  
  <View style={{flex:1,backgroundColor:'white'}}>
    <CustomHeader />

<Text style={{fontSize:20,textAlign:'center',paddingTop:10,paddingBottom:10}}>Delivery Address</Text>

<ScrollView style={{backgroundColor:'#f1f3f6'}}>
{this.state.Addresses}
 

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

<Button onPress={()=>this.ProceedToPay()} title='PROCEED TO PAY'   
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


export default Checkout;