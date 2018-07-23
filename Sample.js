import React,{Component} from 'react';
import {Text,Picker,Card,View,TextInput,Alert,StyleSheet,Dimensions,Image,ScrollView,AsyncStorage } from 'react-native';
import CustomHeader from './CustomHeader';
import APP_CONSTANTS from './AppConstants.js';
import {Dropdown} from 'react-native-material-dropdown';
import {Button,Icon} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import ThatsAll from './ThatsAll';


class Sample extends Component{

  /* TO HIDE DEFAULT HEADER */
  static navigationOptions={
    header:null,
  }
/* //TO HIDE DEFAULT HEADER */
constructor(props){
  super(props)

 this.Decrement=this.Decrement.bind(this)
 this.state={
     language:'English',
     productQuantities:{},
     cart:{},
     CartLength:0,
 }
  
 }

  ManageCart(Action,Type,ProductId,ProductDetails,VarientDetails){

    cart=this.state.cart;
   if(Action=='ADD'){
   if(typeof this.state.productQuantities['product_'+ProductId] !=='undefined'){
    Quantity=this.state.productQuantities['product_'+ProductId]['Quantity'];
    if(typeof Quantity=='undefined'){
      Quantity=1;
    }
    Varient=this.state.productQuantities['product_'+ProductId]['VarientId'];
    Price=this.state.productQuantities['product_'+ProductId]['Price'];
    VarientName=this.state.productQuantities['product_'+ProductId]['VarientName'];
    if(typeof Price=='undefined'){
      Toast.show('Please select a variant');
      return;
    }

    cart[Type+'_'+ProductId]={};
    cart[Type+'_'+ProductId]['Quantity']=Quantity;
    cart[Type+'_'+ProductId]['VarientId']=Varient;
    cart[Type+'_'+ProductId]['Price']=Price;
    cart[Type+'_'+ProductId]['ProdDetails']=ProductDetails;
    cart[Type+'_'+ProductId]['VarientDetails']=VarientDetails;
    cart[Type+'_'+ProductId]['VarientName']=VarientName;
    

    const { navigate } = this.props.navigation;

    this.setState({cart:cart});
    this.setState({CartLength:cart.length});
    
    Toast.show('Added to cart successfully!');
  }else{
    Toast.show('Please select a variant');
  }
    //navigate('Cart',cart);
   
   }else if (Action=='REMOVE'){

    cart['product_'+ProductId]=0;

    this.setState({cart:cart});
     
   

   }
   AsyncStorage.setItem('BazaarCart',JSON.stringify(cart));
 
 
  }


  ManageVariant(SlctdVar,ProductId){

    
    var VarientId = SlctdVar.split('_')[0];
    var Price=SlctdVar.split('_')[1];
    var VarientName=SlctdVar.split('_')[2];

    productQuantities=this.state.productQuantities;
    if(typeof productQuantities['product_'+ProductId] !== 'undefined'){
      productQuantities['product_'+ProductId]['VarientId']=VarientId;
      productQuantities['product_'+ProductId]['VarientName']=VarientName;
      productQuantities['product_'+ProductId]['Price']=Price;
    }else{
      productQuantities['product_'+ProductId]={};
      productQuantities['product_'+ProductId]['VarientId']=VarientId;
      productQuantities['product_'+ProductId]['Price']=Price;
      productQuantities['product_'+ProductId]['VarientName']=VarientName;
    }
    
    this.setState({productQuantities:productQuantities});
    

  }

  ManageQuantity(CrntValue=false,ProductId,Action='',OP=''){
  
  productQuantities=this.state.productQuantities;
  
  if(CrntValue==false){

    if(typeof productQuantities['product_'+ProductId] !== 'undefined'){
      CrntValue=parseInt(productQuantities['product_'+ProductId]['Quantity']);
    }else{
      CrntValue=parseInt(productQuantities['product_'+ProductId]);
    }
    
    if(isNaN(CrntValue)){
      CrntValue=1;
    }
   
    if(Action=='PLUS'){
      CrntValue=CrntValue+1;
    }else{
      CrntValue=CrntValue-1;
    }
    CrntValue=CrntValue.toString();
    if(typeof productQuantities['product_'+ProductId] !== 'undefined'){
      productQuantities['product_'+ProductId]['Quantity']=CrntValue;
    }else{
      productQuantities['product_'+ProductId]={};
      productQuantities['product_'+ProductId]['Quantity']=CrntValue;
    }
    
   
  }else{
    
    if(CrntValue!='' && CrntValue>0){
      if(typeof productQuantities['product_'+ProductId] == 'undefined'){
        productQuantities['product_'+ProductId]={} ;
      }
      productQuantities['product_'+ProductId]['Quantity']=CrntValue;
    }else{
      productQuantities['product_'+ProductId]['Quantity']=CrntValue;
    }
    
   

  }
  
  this.setState({productQuantities:productQuantities});
  
 }


 Increment=(ProductId)=>{
  
  this.ManageQuantity(false,ProductId,'PLUS');
 }
  Decrement=(ProductId)=>{
   this.ManageQuantity(false,ProductId,'MINUS');
  }
  
render(){
    debugger;
    const { navigation } = this.props;
    let Items=navigation.getParam('Items','NO-ID');
    let IsGroceries=navigation.getParam('IsGroceries','NO-ID');
    let CategoryName=navigation.getParam('CategoryName','NO-ID');

    let {width,height}=Dimensions.get('window');
    var styles=StyleSheet.create({
      container:{
        backgroundColor:'#f1f3f6',
        height:height,      
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
       marginLeft: 5,
       marginRight: 5,
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
      pageHeadingCntnr:{
      width:'100%',
      backgroundColor:'white',
      padding:15,
      }

    });

    var Boxes=[];
    var Products=[];
    var Varients=[];
    if(IsGroceries=='YES'){
    
    for(i=0;i<Items.length;i++){
      //Products.push(Items[i].products);
      let EachPrdct={};
      let VarientsData=[];
      EachPrdct['P']=Items[i].products;
      
      for(j=0;j<Items[i].varients.length;j++){
        VData={};
        VarientId=Items[i].varients[j]['varientid'];
        OfferPrice=Items[i].varients[j]['offerprice'];
        ProductId=Items[i].varients[j]['productid'];
        
        VData['label']=Items[i].varients[j]['varientname']+' - Rs.'+Items[i].varients[j]['offerprice'];
        VData['value']=VarientId+'_'+OfferPrice+'_'+VData['label'];
        VarientsData.push(VData);
      }
      EachPrdct['V']=VarientsData;
      Products.push(EachPrdct);
      

      }
    }else{
     for(i=0;i<Items.length;i++){
      let EachPrdct={};
      let VarientsData=[];
      EachPrdct['P']=Items[i].products;
      
      for(j=0;j<Items[i].varients.length;j++){
        VData={};
        VarientId=Items[i].varients[j]['Packageid'];
        ProductId=Items[i].varients[j]['Boxid'];
        VData['value']=ProductId+'_'+VarientId;
        VData['label']=Items[i].varients[j]['VarientName']+' - Rs.'+Items[i].varients[j]['offerprice'];
        VarientsData.push(VData);
      }
      EachPrdct['V']=VarientsData;
      Boxes.push(EachPrdct);
      

      }
    }


  /*   AsyncStorage.setItem('BazaarBoxes',JSON.stringify(Boxes));
    AsyncStorage.setItem('BazaarProducts',JSON.stringify(Products)); */
          
    

    
    BoxItems= Boxes.map(EachBox => (
      
      <View key={EachBox['P'].Boxid} style={styles.ProductContainer}>
      <View style={{flexDirection:'row'}}>
        <View style={styles.productLeft}>
        <Image 
          style={{height: 120,width:140}} 
          source={{uri: APP_CONSTANTS.APP_BASE_URL+EachBox['P'].BoxImage}}
        />
        </View>
        <View style={styles.productRight}>
        <Text style={styles.productTitle}>{EachBox['P'].Boxname}</Text>
        <View>
        <Dropdown
        containerStyle={{
          marginLeft:30,

        }}
        pickerStyle={{
          marginLeft:30,
          width:'90%',
          borderColor:'#ccc',
          borderWidth:1
        }}
        label='Select'
        data={EachBox['V']}
      />
      </View>
       <View style={{width:240,flexDirection:'row'}}>
        <Button title='Customize' style={{flex:1}}
        color={APP_CONSTANTS.APP_BG_CLR}
        buttonStyle={{
          backgroundColor: "#fff",
          height: 28,
          borderColor: "#999",
          borderWidth: 0,
          borderRadius: 3,
          marginTop:0,
        }}
        icon={{ type: 'material',name:'edit',size:15,
        color:APP_CONSTANTS.APP_BG_CLR}}
        raised
        containerViewStyle={{marginLeft:-6,marginTop:5,height:30,borderRadius:3,width:95,borderWidth:1,borderColor:'#fff'}}
        />

             <Button title='Subscribe' style={{flex:1}}
        color={APP_CONSTANTS.APP_BG_CLR}
        buttonStyle={{
          backgroundColor: "#fff",
          height: 28,
          borderColor: "#999",
          borderWidth: 0,
          borderRadius: 3,
          marginTop:0
        }}
        icon={{ type: 'material',name:'shopping-cart',size:15,
        color:APP_CONSTANTS.APP_BG_CLR}}
        raised
        containerViewStyle={{marginLeft:-6,marginTop:5,height:30,borderRadius: 3,width:95,borderWidth:1,borderColor:'#fff' }}
        />

        </View>


        </View>
  
      </View>
      </View>
    ));

    
    ProductItems= Products.map(EachP => (
      
      <View key={EachP['P'].product_id}  style={styles.ProductContainer}>
      <View style={{flexDirection:'row'}}>
        <View style={styles.productLeft}>
        <Image 
          style={{height: 120,width:140}} 
          source={{uri: APP_CONSTANTS.APP_BASE_URL+EachP['P'].front_image}}
        />
        </View>
        <View style={styles.productRight}>
        <Text style={styles.productTitle}>{EachP['P'].title}</Text>
        <Dropdown onChangeText={(currentVal)=>this.ManageVariant(currentVal,EachP['P'].product_id)}
        containerStyle={{
          width:'120%',
          padding:5,
        }}
        pickerStyle={{
          width:'90%',
          borderColor:'#ccc',
          borderWidth:1,
          
        }}

      
        label='Select'
        data={EachP['V']}
      />
       <View style={{width:240,flexDirection:'row'}}>
          <View style={{width:80,borderColor:'#ccc',borderRadius:3,borderWidth:1,flexDirection:'row'}}>
          <Icon containerStyle={{flex:1,paddingLeft:7}} onPress={()=>this.Decrement(EachP['P'].product_id)}
  name='remove'
  type='material'
  color='#517fa4'
  size={18}
/>
<TextInput  underlineColorAndroid='#fff' defaultValue='1'

value={(typeof this.state.productQuantities['product_'+EachP['P'].product_id]) !=='undefined'?this.state.productQuantities['product_'+EachP['P'].product_id]['Quantity']:this.state.productQuantities['product_'+EachP['P'].product_id]}
onChangeText={(CurrentVal)=>this.ManageQuantity(CurrentVal,EachP['P'].product_id,'',this.state.productQuantities['product_'+EachP['P'].product_id])} 
style={{textAlign:'center',paddingLeft:5,paddingRight:5,flex:1}} 
keyboardType='numeric' maxLength={3} />
<Icon onPress={()=>this.Increment(EachP['P'].product_id)}
  containerStyle={{flex:1,paddingRight:7}}

  name='add'
  type='material'
  color='#517fa4'
  size={18}
         />
          </View>   

             <Button title='Add to cart' style={{width:80}} onPress={()=>this.ManageCart('ADD','product',EachP['P'].product_id,EachP['P'],EachP['V'])}
        color={APP_CONSTANTS.APP_BG_CLR}
        buttonStyle={{
          backgroundColor: "#fff",
          borderColor: "#999",
          height:30,
          borderWidth: 0,
          borderRadius: 3,
          marginTop:0
        }}
        icon={{ type: 'material',name:'shopping-cart',size:15,
        color:APP_CONSTANTS.APP_BG_CLR}}
        raised
        containerViewStyle={{height:35,marginLeft:5,borderRadius:3,width:100,borderWidth:1,borderColor:'#fff' }}
        />

        </View>


        </View>
  
      </View>
      </View>
    ));


 
    
 

  

return(

        <View style={{flex:1}}>
          <CustomHeader display_menu='none' cart_length={this.state.CartLength}/>
      <ScrollView >
          
        <View style={styles.container}>
        <View style={styles.pageHeadingCntnr}>
        <Text style={{marginBottom:10,textAlign:'center',fontSize:18}}>
        
         {CategoryName}
       
         
         </Text>   
         </View>

          { /* PRODUCT CONTAINER */}
  
          
          
          { /* //PRODUCT CONTAINER */}
          {BoxItems}

          {ProductItems}
        </View>
        <ThatsAll />
        </ScrollView>
        </View>
)

}


}//END OF CLASS


class Sample4 extends Component{

render(){
  <ScrollView>
          <CustomHeader />
        <View style={styles.container}>
           <Text>I will show some Products</Text>  

          { /* PRODUCT CONTAINER */}

         <Sample2 />
          
          { /* //PRODUCT CONTAINER */}
           
        </View>
        </ScrollView>
}

}

export default Sample;
