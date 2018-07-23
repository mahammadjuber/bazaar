import React, { Component } from 'react';
import { StyleSheet, View,Text,AsyncStorage,Alert,ScrollView,Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Button,Icon,Divider } from 'react-native-elements';
import APP_CONSTANTS from '../AppConstants.js';
import CustomHeader from '../CustomHeader';
import Scroll from '../Scroll.js';
import DottedLine from './DottedLine';
import ThatsAll from '../ThatsAll';
import Toast from 'react-native-simple-toast';


const Orders=[];
export default class CompletedSubscriptions extends Component {
    static navigationOptions={
        header:null,
    }

  constructor(props) {
    super(props);
    this.state = {
      LoggedInUserId:'',
      tableHead: ['ITEM', 'PRICE', 'SUBSCRIBED ON', 'EXPIRE ON','CHECK PLANS','ACTION'],
      tableData: [
        ['1', '2', '3', '4','3', '4'],
        ['a', 'b', 'c', 'd','3', '4'],
        ['1', '2', '3', '456\n789','3', '4'],
        
      ],
      widthArr: [100, 60, 150, 100, 160, 160]
    };
  
  }


  componentWillMount(){

    AsyncStorage.getItem("LoggedInUserId").then((value) => {
        this.setState({LoggedInUserId:value});
        this.getSubscriptions();
      });
  }


  cancelOrder=(Subscription)=>{



    BoxId=Subscription['Boxid'];
    SubscriptionId=Subscription['SubscriptionId'];
    Price=parseFloat(Subscription['Price']).toFixed(2);
    Reason='No meed want this product.';

    fetch(APP_CONSTANTS.APP_API_URL+'saveCancelledSubscription', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
        user_id: this.state.LoggedInUserId,
        subscriptionID:SubscriptionId,
        boxid:BoxId,
        reason:Reason,
        price:Price,
      
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
console.log(responseJson);
if(responseJson['status']=='Success'){
  Toast.show(responseJson['message']);
}else{
  Toast.show('Something went wrong!.Please try again later.');
}


        })
        .catch((error) => {
          console.error(error);
        });

  }
   
  getSubscriptions=()=>{
  
    var SubscriptionsData=[];

    fetch(APP_CONSTANTS.APP_API_URL+'completedSubscription', {
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

            
            Data=responseJson['data'];
            for(i=0;i<Data.length;i++){
           
             EachRow=[];
             CrData=Data[i];
             
             if(CrData['category_name']=='Groceries'){
                Item=CrData['category_name'];
             }else{
                Item=CrData['category_name']+' - '+CrData['Boxname']+' - '+CrData['Packagename'];
             }
             Price=parseFloat(CrData['Price']).toFixed(2);
             Subscribedon=CrData['Subscribedon'];
             ExpireOn=CrData['ExpiryDate'];
             ViewPlans=<Button title='View Plans' buttonStyle={{backgroundColor:'white',borderColor:'#ccc',borderWidth:1,height:30,width:110}}  color={APP_CONSTANTS.APP_BG_CLR}  onPress={()=>Alert.alert()}/>
             Action=<Button title='Action' buttonStyle={{backgroundColor:'white',borderColor:'#ccc',borderWidth:1,height:30,width:110}}  color={APP_CONSTANTS.APP_BG_CLR}  onPress={()=>Alert.alert()}/>
             let  IsDelivered=(CrData['IsAllDelivered']==0)?false:true;
             PayNow=CrData['PaymentStatus']=='unpaid'?true:false;

        
             
             
             EachRow.push(Item,Price,Subscribedon,ExpireOn,ViewPlans,Action);
             SubscriptionsData.push(EachRow);
            
             Orders.push(
                
<View style={styles.cardStyle} key={i}>
<View style={{flexDirection:'row',paddingBottom:10}}>
            <View style={{flex:1}}>
           <Text style={[styles.ItemName]}>{Item}</Text>
            </View>
            <View style={{flex:1,alignItems:'flex-end'}}>
           <Text style={{fontSize:16}}>{APP_CONSTANTS.APP_CURRENCY} {Price }</Text>
           
           
           </View>
            </View>
            <View>

<View>
      <View style={{flexDirection:'row'}}>

            <Image
             style={{width: 16, height: 16}}
             source={require('../assets/images/icons8-purchase.png')}/>
<Text style={{paddingLeft:8}}>{Subscribedon}</Text> 
           {/*  <View style={{flex:1,alignItems:'flex-end'}}>
            {PayNow==true ?<View style={[styles.RaisedText,{alignItems:'flex-end'}]} onClick={()=>Alert.alert('Online Payment Unavailable')}><Text style={{fontSize:12,color:APP_CONSTANTS.APP_BG_CLR}}>PAY NOW</Text></View>:<View style={[styles.RaisedText,{alignItems:'flex-end'}]}><Text style={{fontSize:14,color:'mediumseagreen'}}>PAID</Text></View>}
           
           
           
           </View> */}
      </View>

     <View>
     <DottedLine num_dots='8'/>
    

     </View>
     <View style={{marginTop:-12,backgroundColor:'transparent',flexDirection:'row'}}>
{IsDelivered==false ? <Image
  style={{width:22, height: 22}}
  source={require('../assets/images/icons8-checkmark-before.png')}/> : <Image
  style={{width:22, height: 22}}
  source={require('../assets/images/icons8-checkmark-after.png')}/> } 

  {IsDelivered==false ? <Text style={{paddingLeft:6}}>Delivered by {ExpireOn}</Text> : <Text style={{paddingLeft:6}}>Delivered on {ExpireOn}</Text> } 
  <View  style={{alignItems:'flex-end',flex:1}}>
  <View style={{flexDirection:'row'}}>
  

  
  
      {IsDelivered==false ? <Text style={{paddingLeft:6}} onPress={()=>this.cancelOrder(CrData)}>Cancel</Text> : <Text></Text> } 
           
          
  </View>
  </View>
     </View>
     <Divider style={styles.divider}/>
     <View style={{flexDirection:'row',marginTop:10}}>
    
      {IsDelivered==false ?  <Button 
                icon={{ type: 'material',name:'room',size:17,
                color:'white'}}
               onPress={()=>this.SetDeliveryAddress(EachAd['id'],'CHANGE')}
              
              title='Change Address'  
              color='#fff'
             buttonStyle={[styles.caddressButtonStyle]}/> : <Text></Text> } 
     

      </View>
    </View>        

          
            </View>
                      </View>
             )
             
            }
            this.setState({tableData:SubscriptionsData})
     
            
    //DO SOMETHING
          })
          .catch((error) => {
            console.error(error);
          });


  }
 
  render() {
    const state = this.state;
    return (

      <View style={{backgroundColor:'white',height:'100%'}}>
        <CustomHeader page_name='Completed'/>
        <View style={{padding:10}}>
        <Text style={{textAlign:'center',fontSize:20,margin:30,display:'none'}}>My Orders</Text>

          <ScrollView horizontal={true} style={{display:'none'}}>
          <View style={{paddingBottom:20}}>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.headerText}/>
              {/* <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/> */}
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Rows data={state.tableData}  widthArr={state.widthArr}  textStyle={styles.text}/>
              </Table>
            </ScrollView>
          </View>
        </ScrollView>


  
        </View>
       
       <ScrollView style={{backgroundColor:'#f1f3f6'}}>
      
       {Orders}
       <ThatsAll/>
       </ScrollView>

      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6,paddingTop:5,paddingBottom:5 },
  headerText:{textAlign:'center'},
  caddressButtonStyle:{
    backgroundColor:'#333',
    height: 35,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 3,
  },
  cardStyle:{
    backgroundColor:'#fff',
    minHeight:100,
    padding:10,
    paddingTop:20,
    paddingBottom:20,
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
    marginBottom:10,
  },
  divider:{
    backgroundColor:'#ccc',
    marginTop:15,
    marginBottom:7,
  },
  ItemName:{
      fontSize:16,
  },
  dot:{
      color:'black',
      fontSize:13,
      padding:0,
  },
  RaisedText:{
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
    padding:5,
 
  }
});