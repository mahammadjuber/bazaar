import React, { Component } from 'react';
import { StyleSheet, View,Text,AsyncStorage,Alert,ScrollView,Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Button,Icon,Divider } from 'react-native-elements';
import APP_CONSTANTS from '../AppConstants.js';
import CustomHeader from '../CustomHeader';
import styles from '../Stylesheet';
import DottedLine from './DottedLine';

const Orders=[];

class Dashboard extends Component{
    static navigationOptions={
        header:null,
    }


    constructor(props) {
        super(props);
        this.state = {
            LoggedInUserId:false,
            cancelled:0,
            completed:0,
            deliverable:0,
            nextdate:'',
        };
      }


      componentWillMount(){

        AsyncStorage.getItem("LoggedInUserId").then((value) => {
            this.setState({LoggedInUserId:value});
            this.getDashbaord();
          });

      }
      
      getDashbaord=()=>{


        var SubscriptionsData=[];

        fetch(APP_CONSTANTS.APP_API_URL+'mobileDashboard', {
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
                Data=responseJson['data']['subscriptions'];
                
              //PLAY GAMES HERE
              this.setState({cancelled:responseJson['data']['cancelled']});
              this.setState({completed:responseJson['data']['completed']});
              this.setState({deliverable:responseJson['data']['deliverable']});
              this.setState({nextdate:responseJson['data']['nextdate'][0].PlannedDate});

              for(i=0;i<=1;i++){
            
                EachRow=[];
                CrData=Data[i]['Subscription'];
                
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
     
     <Icon containerStyle={{paddingLeft:7}} 
           name='cancel'
           type='material'
           color='#ff5252'
           size={18}
           /* onPress={()=>this.UpdateCart(EachP['ProdDetails'].product_id,'REMOVE')} */
         />
     
     
               {IsDelivered==false ? <Text style={{paddingLeft:6}}>Cancel</Text> : '' } 
              
             
     </View>
     </View>
        </View>
        <Divider style={styles.divider}/>
        <View style={{flexDirection:'row',marginTop:10}}>
        <Button 
          icon={{ type: 'material',name:'local-parking',size:17,
          color:'white'}}
          /* onPress={()=>this.Checkout()} */ title='View Plans'   
          buttonStyle={{
           backgroundColor: "#ff5252",
           height: 35,
           borderColor: "transparent",
           borderWidth: 0,
           borderRadius: 3,
           width:120,
           
         }}/>
         {IsDelivered==false ?  <Button 
                   icon={{ type: 'material',name:'room',size:17,
                   color:'white'}}
                 /* onPress={()=>this.SetDeliveryAddress(EachAd['id'],'CHANGE')} */
                 
                 title='Change Address'   
                 color='#fff'
                buttonStyle={[styles.caddressButtonStyle]}/> : '' } 
        
   
         </View>
       </View>        
   
             
               </View>
                         </View>
                         
                )
                
               }

              })
              .catch((error) => {
                console.error(error);
              });
      }


      render(){
        return(
        <View style={{backgroundColor:'#fff',height:'100%'}}>
        <CustomHeader page_name='Dashboard' />

      {/*  <ScrollView style={{backgroundColor:'#f1f3f6'}}>
      
      {Orders}
      
      </ScrollView> */}

        


          <View style={{marginTop:20}}>

              

             <View style={{flexDirection:'row'}}>
              <View style={[styles.RaisedText,{flex:1,borderRadius:5,height:130,margin:10,backgroundColor:'#face13'}]}>
               <Text style={styles.DashbTileCnt}>{this.state.deliverable}</Text>
               <Text style={[styles.textCenter,{marginTop:25,fontSize:16}]}>Active Orders</Text>
              </View>
              <View style={[styles.RaisedText,{flex:1,borderRadius:5,height:130,margin:10,backgroundColor:'#f44336'}]}>

<Text style={[styles.DashbTileCnt,styles.whiteText]}>{this.state.cancelled}</Text>

<Text style={[styles.textCenter,styles.whiteText,{marginTop:25,fontSize:16}]}>Cancelled Orders</Text>
               </View>


             </View>
             <View style={{flexDirection:'row'}}>
              <View style={[styles.RaisedText,{flex:1,borderRadius:5,height:130,margin:10,backgroundColor:'#5fce9b'}]}>
              <Text style={[styles.DashbTileCnt,styles.whiteText]}>{this.state.completed}</Text>
              <Text style={[styles.textCenter,styles.whiteText,{marginTop:25,fontSize:16}]}>Completed Orders</Text>
              </View>
              <View style={[styles.RaisedText,{flex:1,borderRadius:5,height:130,margin:10,backgroundColor:'#03a9f4'}]}>

<Text style={[styles.DashbTileCnt,styles.whiteText]}>{this.state.nextdate}</Text>
<Text style={[styles.textCenter,styles.whiteText,{marginTop:25,fontSize:16}]}>Next Delivery</Text>
               </View>


             </View>





          </View>


        </View>
        )
      }



}//END OF CLASS

export default Dashboard;
