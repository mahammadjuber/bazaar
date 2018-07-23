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
    marginBottom:50,
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
    width:150,
    marginLeft:20,
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
  }
  
});

class Cart extends Component{

  /* TO HIDE DEFAULT HEADER */
  static navigationOptions={ 
    header:null,
  }
  /* //TO HIDE DEFAULT HEADER */

constructor(props){
 super(props)
this.state={
    categories:[],
    BillTotal:0,
    SampleData:'React Bazaar',
    BazaarCart:[{ProductId:22},{ProductId:23}],
    CartItems:<View><Text></Text></View>,
    NoOfItems:0,
    lastRefresh: Date(Date.now()).toString(),
    headerRefresh:true,
    CartLength:0,
},
this.CartRefs=[];

}



 RemoveItemFromCart=(ProductId,ProductName='')=>{
   var BazaarCart=this.state.BazaarCart;
   var CurrentItem=[];
   var MatchedIndex='';
   for(i=0;i<BazaarCart.length;i++){
    if(BazaarCart[i]['ProdDetails'].product_id==ProductId){
      CurrentItem=BazaarCart[i];
      MatchedIndex=i;
    }
   }

   if(MatchedIndex.length!=0){
    BazaarCart.splice(MatchedIndex,1);
    this.setState({'BazaarCart':BazaarCart});
    this.setState({CartLength:BazaarCart.length});
    this.setState({headerRefresh:!this.state.headerRefresh});
    
    AsyncStorage.setItem("BazaarCart",JSON.stringify(BazaarCart));
    Elem=this.CartRefs['product_'+ProductId];
    
   Elem.setNativeProps({style:{display:'none'}}); 
   Toast.show(ProductName+' has been removed from cart successfully!');
   }
   
   this.buildCartProds();
 }


 
 UpdateCart=(ProductId,Action)=>{

   
   var BazaarCart=this.state.BazaarCart;
   
   var CurrentItem=[];
   var MatchedIndex='';
   for(i=0;i<BazaarCart.length;i++){
     
     
    if(BazaarCart[i]['ProdDetails'].product_id==ProductId){
      
      CurrentItem=BazaarCart[i];
      MatchedIndex=i;
    }
   }
   
   Quantity=CurrentItem['Quantity'];
   if(Action=='ADD'){
    Quantity=parseInt(Quantity)+1;
    
   }else if(Action=='REMOVE'){
    Quantity=parseInt(Quantity)-1;
   }
   CurrentItem['Quantity']=Quantity;
   if(MatchedIndex!=''){
    BazaarCart[MatchedIndex]=CurrentItem;
   }else{
   // BazaarCart[MatchedIndex]=CurrentItem;//SILENCE PLEASE
   }
    
    QuantInput=this.CartRefs['product_quantity_'+ProductId];
    Quantity=Quantity.toString();

   QuantInput.setNativeProps({text :Quantity});
   this.setState({'BazaarCart':BazaarCart});
   AsyncStorage.setItem("BazaarCart",JSON.stringify(BazaarCart));
   this.buildCartProds();
 }

 buildCartProds(){
  var BillTotal=0;
  CartLength=this.state.BazaarCart.length;
   if(CartLength==0){
    this.on_empty_cart.setNativeProps({style:{display:'flex'}});
    this.cart_holder.setNativeProps({style:{display:'none'}});
    return;
   }else{ 
   this.cart_holder.setNativeProps({style:{display:'flex'}});
   this.on_empty_cart.setNativeProps({style:{display:'none'}});
   }

  for(j=0;j<CartLength;j++){
    let EachP=this.state.BazaarCart[j];
    BillTotal=parseFloat(BillTotal)+parseFloat(parseFloat(EachP['Price'])*parseFloat(EachP['Quantity']));
  } 
  let CartItems='';
  
  CartItems= this.state.BazaarCart.map(EachP => (
   
      <View key={EachP['ProdDetails'].product_id}  ref={(ref) => { this.CartRefs['product_'+EachP['ProdDetails'].product_id] = ref; }}  style={styles.ProductContainer}>
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

             <Button title='Remove' style={{width:80}}
        color="#999"
        buttonStyle={{
          backgroundColor: "#fff",
          height: 40,
          borderColor: "#999",
          borderWidth: 0,
          borderRadius: 3,
          marginTop:0
        }}
        icon={{ type: 'material',name:'delete',size:15,
        color:"#999"}}
        onPress={()=>this.RemoveItemFromCart(EachP['ProdDetails'].product_id,EachP['ProdDetails'].title)}
        raised
        containerViewStyle={{marginTop:0,height:40,borderRadius: 3,width:95,borderWidth:1,borderColor:'#fff' }}
        />

        </View>


        </View>
  
      </View>
      </View>
     
));

        this.setState({BillTotal:BillTotal});
        this.setState({CartItems:CartItems});
        this.setState({NoOfItems:CartLength})   
 }

 componentWillMount() {
  const { navigate } = this.props.navigation;
  let {width,height}=Dimensions.get('window');

   AsyncStorage.getItem("BazaarCart").then((value) => {
       
    
       let Cart=[];
       CartObject=JSON.parse(value);
       for(var key in CartObject){
           let Item=CartObject[key];
           Cart.push(Item);
           }
      
       this.setState({"BazaarCart":Cart});
       this.setState({CartLength:Cart.length});
       this.buildCartProds();
        

   }).done();

 }

 Checkout(){
  
  const { navigate } = this.props.navigation;
  BillDetails=[];
  BillDetails['BillTotal']=this.state.BillTotal;
  BillDetails['Items']=this.state.BazaarCart;
  BillDetails['NoOfItems']=this.state.NoOfItems;
  navigate('Checkout',{BillDetails:BillDetails});
 }
 
 

render(){
   debugger;
  
   const { navigate } = this.props.navigation;

return(
  
  <View style={{flex:1,backgroundColor:'white'}}>

   <CustomHeader cart_length={this.state.CartLength} />

<Text style={{fontSize:20,textAlign:'center',paddingTop:10,paddingBottom:10}}>Cart</Text>

   <View ref={(ref)=>this.on_empty_cart=ref} style={{display:'none',width:width,paddingTop:20,}}>
   <Image 
   style={{width:'90%',height:'60%'}}
   source={{uri: 'https://iticsystem.com/img/empty-cart.png'}}
   /> 
   <Button raised title='Start Browsing'    
   buttonStyle={{
        backgroundColor: "#fb641b",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
        marginTop:10
      }}
      containerViewStyle={{ marginTop:20,height:40 }}/>
   </View> 

<ScrollView style={{backgroundColor:'#f1f3f6'}} ref={(ref)=>this.cart_holder=ref}>


{this.state.CartItems}



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

 
<View style={styles.buttonView} onPress={()=>this.Checkout()}>
{/* <Text style={[styles.buttonText]} >{'Continue'.toUpperCase()}</Text> */}
<Button onPress={()=>this.Checkout()} title='CONTINUE'   
buttonStyle={{
        backgroundColor: "#fb641b",
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
        
      }}/>
</View>
</View>
</View>

{/* CART FOOTER  */}

</View>

)


}



}//end of class


export default Cart;