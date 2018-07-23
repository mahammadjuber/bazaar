import React,{Component} from 'react';
import { View,Alert,Text,StyleSheet,Dimensions,TextInput,AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator } from 'react-navigation';
 import CustomHeader from './CustomHeader'; 
 import APP_CONSTANTS from './AppConstants';



class Login extends Component{
  
    static navigationOptions={
        header:null,
    }
 

    constructor(){
        super();
        this.state={
            mobile:'',
            password:'',
            err_mobile:'',
            err_password:'',
            myKey:'',
            err_login:'',
           }
      
      }
      componentWillMount(){

        AsyncStorage.getItem("LoggedInUserId").then((value) => {
           if(value!='' && value!=undefined){
            const { navigate } = this.props.navigation;
           navigate('Subscriptions');
           }
          });
      }
      ManageNavigation=()=>{
      
        
        const { navigate } = this.props.navigation;
        navigate('Signup');
       }

    VerifyLogin=()=>{

        

        var mobile = this.state.mobile;
        var password = this.state.password;
        var error=0;
        if(mobile.length==0){
            this.setState({err_mobile:'Mobile number is required.'});
            error=1;
        }else if(!this.isValidMobile(mobile)){
            this.setState({err_mobile:'Please enter a valid mobile number.'});
            error=1;
        }else{
          this.setState({err_mobile:''});
        }

        if(password.length==0){
            this.setState({err_password:'Password is required.'});
            error=1;
        }else{
            this.setState({err_password:''});
        }

        if(error==0){
        this.SubmitLogin();
        }
        
        
    }

    

    SubmitLogin(){
      const { navigate } = this.props.navigation;
        fetch(APP_CONSTANTS.APP_API_URL+'userLogin', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
              mobile: this.state.mobile,
              password:this.state.password,
              
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
           
                if(responseJson.Message['RespCode']=='Success'){
                  AsyncStorage.setItem("LoggedInUserId",responseJson['data']['customer']['user_id']);

                  const { navigation } = this.props;
                  let Origin=navigation.getParam('Origin', 'NO-ID');
                   if(Origin!=null && Origin!=undefined && Origin!=''){
                    navigate(Origin);
                   }else{
                    navigate('Subscriptions');
                   }
                  
                }else{
                  this.setState({err_login:'Incorrect mobile number or password.'});
                }
                
              })
              .catch((error) => {
                console.error(error);
              });

    }

    forgotPassword=()=>{
      const { navigate } = this.props.navigation;
     
      mobile=this.state.mobile;
      if(mobile.length==0){
        this.setState({err_mobile:'Mobile number is required.'});
        error=1;
    }else if(!this.isValidMobile(mobile)){
        this.setState({err_mobile:'Please enter a valid mobile number.'});
        error=1;
    }else{
      //WE CAN CALL API
      
      this.setState({err_mobile:''});


      fetch(APP_CONSTANTS.APP_API_URL+'generateMobPassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: this.state.mobile,
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Message['RespCode']=='Success'){
              navigate('ResetPassword',{mobile_number:mobile});
            }else{
              this.setState({err_login:'Mobile number not registered with us.'})
            }
            
          })
          .catch((error) => {
            console.error(error);
          });


    }
      
    }

    isValidMobile=(mobile)=>{
      let reg = /^[6-9]\d{9}$/ ;
    return reg.test(mobile);

    }
   


render(){
    const { navigate } = this.props.navigation;
     
    const AppBackgroundClr='#2874f0';
    let {height, width} = Dimensions.get('window');
    let styles=StyleSheet.create({
     container:{
     position:'relative',
     height:height,
     backgroundColor:'#fff',
     },
     login_container:{
        position:'absolute',
        top:height/2-200,
        width:width,
        marginLeft:10,
        marginRight:10,
        padding:10,
        
     },
     absolutechild:{
       textAlign:'center',
       fontSize:25,
       fontWeight:'normal'
       
     },        inputfiled: {
        margin:10,
        marginTop:10,
        padding:10,
        height:'auto',
     
        borderRadius:5,
      },
      InputLabel:{
        color:'#fff',
        marginTop:10,
        marginLeft:5
      },
      loginButtonStyle:{
          marginTop:20,
          color:'red',
      },
      alignCenter:{
        textAlign:'center',
        marginTop:20,
      },
      Myinput:{height:45,marginTop:15},
      createAccount:{
          marginTop:50,
          color:'black',
      },
      errorInput:{
        color:'red',
      },codenotrecieved:{
        padding:10,
        marginTop:5,
        
    },
    textcenter:{
       textAlign:'center',
    },
    appClr:{
color:'#2874f0',
    },
    forgotpassword:{
      marginTop:10,
    },
    appBgClr:{
       backgroundColor:'#2874f0',
                }
    })
/*--This was an sample comment --*/
  return (

    <View style={styles.container}>
     <CustomHeader />
    <View style={styles.login_container}>
    <Text style={styles.absolutechild}>Login</Text>
    <Text style={[styles.errorInput,{textAlign:'center'}]}>{this.state.err_login}</Text>
    <View style={styles.inputfiled}>
    
    <TextInput underlineColorAndroid='#000' ref='mobile' 
     keyboardType='numeric'
     maxLength={10} 
     returnKeyType={ "next" }

     value={this.state.mobile}

    onChangeText={(mobile) => this.setState({mobile})} style={styles.Myinput} placeholder='Mobile'></TextInput>
    <Text style={styles.errorInput}>{this.state.err_mobile}</Text>
    
    <TextInput underlineColorAndroid='#000'  
     value={this.state.password}

     onChangeText={(password) => this.setState({password})}
    ref='password' style={styles.Myinput}  secureTextEntry={true} placeholder='Password'></TextInput>
    <Text style={styles.errorInput}>{this.state.err_password}</Text>
     
  

    </View>

    <View>
    <Button title='Login'
       iconRight={{ type: 'material',name:'arrow-forward',size:15,
       color:'white'}}
         style={styles.loginButtonStyle}
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
    onPress={this.VerifyLogin}
 
    />
    <View style={styles.forgotpassword}><Text onPress={this.forgotPassword} style={[styles.appClr,styles.textcenter]}>Forgot password  ?</Text></View>
    <View style={styles.codenotrecieved}><Text style={styles.textcenter}>Don't have an account ? <Text style={styles.appClr} onPress={this.ManageNavigation}>Signup</Text></Text></View>
    

{/*     <Button  style={styles.createAccount}  onPress={()=>navigate('VerifyMobile')
        } 
     title='Create account'
     raised
     color='#2874f0'
     buttonStyle={{
       backgroundColor: "#fff",
     }}
     containerViewStyle={{ marginTop:20,height:40 }}
    
    /> */}
      </View>

    
    </View>
    </View>
 )
}

}
export default Login;