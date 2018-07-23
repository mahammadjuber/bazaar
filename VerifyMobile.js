import React,{Component} from 'react';
import { View,Alert,Text,StyleSheet,Dimensions,TextInput,AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator } from 'react-navigation';
import HeaderComponent from './Header';
import SmsListener from 'react-native-android-sms-listener'


 



class VerifyMobile extends Component{
    static navigationOptions={
        header:null,
    }
    constructor(){
        super();
     this.state={
         mobile:7893547274,
         verification_code:4761,
     }

    }
    handleClick=()=>{
        Alert.alert('I will Resend the code');
    }


    VerifyOtp(){
   
        
        fetch('http://farm2fridge.com/client_test/index.php/Api/validateOtp', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
              mobile: 7893547274,
              verification_code:4761,
              
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
                Alert.alert(responseJson.Message['RespCode']);
                //Alert.alert(responseJson.Message['RespMessage']);
              })
              .catch((error) => {
                console.error(error);
              });

    }

    AutoSmsDetect(){


        let subscription = SmsListener.addListener(message => {
            let verificationCodeRegex = /Your Mobile Verification Code is ([\d]{4})/
           
            if (verificationCodeRegex.test(message.body)) {
              let verificationCode = message.body.match(verificationCodeRegex)[1]
           Alert.alert(verificationCode);
       /*        YourPhoneVerificationApi.verifyPhoneNumber(
                message.originatingAddress,
                verificationCode
              ).then(verifiedSuccessfully => {
                if (verifiedSuccessfully) {
                  subscription.remove()
                  return
                }
           
                if (__DEV__) {
                  console.info(
                    'Failed to verify phone `%s` using code `%s`',
                    message.originatingAddress,
                    verificationCode
                  )
                }
              }) */
            }
          })
    }

    render(){
        let {height,width} =Dimensions.get('window');
        const styles=StyleSheet.create({
         pageContainer:{
         backgroundColor:'#fff',
         height:height,
         },
         otpScreen:{
         padding:20,
         flexDirection:'row'
         },
         EachNumInpt:{
          width:width/5,
          height:50,
          marginRight:10,
          borderColor:'#ccc',
          borderWidth:1,
          padding:6,
          borderRadius:3
         },
         screenHeading:{
             fontSize:14,
             textAlign: 'center', // <-- the magic
             
         },
         VerifyMobileContainer:{
             marginTop:60,
             marginBottom:20,
         },codenotrecieved:{
             padding:10,
             marginTop:10,
             
         },
         textcenter:{
            textAlign:'center',
         },
         appClr:{
color:'#2874f0',
         },
         appBgClr:{
            backgroundColor:'#2874f0',
                     }

        })

        return(
        <View style={styles.pageContainer}>
         <HeaderComponent  />

        <View style={styles.VerifyMobileContainer}>
        <Text style={styles.screenHeading}>Please enter one time verification code sent to +917893547274</Text>

        </View>
         <View style={styles.otpScreen}>
         
         <TextInput underlineColorAndroid='#fff' selectionColor={'#000'}
           

 ref='otp_1' textAlign={'center'} 
 maxLength={1} 
            returnKeyType={ "next" } keyboardType='numeric' style={styles.EachNumInpt} placeholder='*'/>
  <TextInput underlineColorAndroid='#fff'   keyboardType='numeric' maxLength={1}            returnKeyType={ "next" }   selectionColor={'#000'}
 ref='otp_2' textAlign={'center'}  keyboardType='numeric' style={styles.EachNumInpt} placeholder='*'/>
  <TextInput underlineColorAndroid='#fff' maxLength={1}           keyboardType='numeric'   returnKeyType={ "next" }    selectionColor={'#000'}
 ref='otp_3' textAlign={'center'}   style={styles.EachNumInpt} placeholder='*'/>
  <TextInput underlineColorAndroid='#fff'  maxLength={1}     keyboardType='numeric'         returnKeyType={ "done" }   selectionColor={'#000'}
 ref='otp_4' textAlign={'center'}   style={styles.EachNumInpt} placeholder='*'/>
         </View>
         
         <Button title='Verify'
       iconRight={{ type: 'material',name:'arrow-forward',size:15,
       color:'white'}}
         
    loadingProps={{ size: "small", color: "#000" }}
    titleStyle={{color:'red'}}
      titleStyle={{ fontWeight: "700"}}
      
      buttonStyle={{
        backgroundColor: "#fb641b",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
        marginTop:10
      }}
      containerStyle={{ marginTop: 50 }}
    onPress={this.VerifyOtp}
 
    />
         <View style={styles.codenotrecieved}><Text style={styles.textcenter}>Didn't received your code ? <Text style={styles.appClr} onPress={this.handleClick}>Resend Code</Text></Text></View>
        </View>

        )
    }



}

export default VerifyMobile;