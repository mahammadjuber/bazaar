import React,{Component} from 'react';
import {Image,View,Text} from 'react-native';
import {Button} from 'react-native-elements';
import APP_CONSTANTS from './AppConstants.js';





class OrderSuccess extends Component{


    /* TO HIDE DEFAULT HEADER */
  static navigationOptions={
    header:null,
  }
/* //TO HIDE DEFAULT HEADER */


    constructor(){

    super();

    this.state={
        animatedImage:true,
        SubscriptionId:'',
        UserId:'',
    }


    }

    ComponentWillMount(){


        const { navigation } = this.props;
        let OrderDet=navigation.getParam('OrderDet', 'NO-ID');
      
        SubscriptionId=OrderDet.order_id;
        UserId=OrderDet.user_id;
        this.setState({SubscriptionId:SubscriptionId});
        this.setState({UserId:UserId});





    }
    
    SeeDeliveryPlans=()=>{

        fetch(APP_CONSTANTS.APP_API_URL+'getSubscriptionDeliveryPlan', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscriptionID:this.state.SubscriptionId,
              user_id: this.state.UserId,
           
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
               
                
        //DO SOMETHING
        
        
                
              })
              .catch((error) => {
                console.error(error);
              });




    }


 



render(){
setTimeout(() => {
    this.setState({animatedImage:false})
}, 800);
var ReturnView='';
    if(this.state.animatedImage){
        ReturnView=   <View style={{backgroundColor:'#fff',height:'100%',alignItems:'center'}}>

        <Image 
               style={{height: 400,width:400}} 
               source={{uri: 'https://cdn.dribbble.com/users/3821/screenshots/1572598/checkmark.gif'}}
             /> 
         
        </View>
    }else{
         ReturnView= <View style={{backgroundColor:'#fff',height:'100%',alignItems:'center',paddingTop:100}}>
            <Image 
                style={{height: 170,width:170}} 
                source={require('./assets/images/icons8-ok-150.png')}        />
      <Text style={{fontSize:20,color:'#3498db'}}>Order recieved successfully :)</Text>
      <Button title='See Delivery Plans' onPress={()=>this.SeeDeliveryPlans()}
      raised
            buttonStyle={{
                backgroundColor: "#3498db",
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 3,
              }}
              containerViewStyle={{ marginTop: 50 }}
      />
         </View>
    }

    return ReturnView;
}





}//end of class


export default OrderSuccess;