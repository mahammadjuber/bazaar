import React,{Component} from 'react';
import { ScrollView,View,Alert,Text,StyleSheet,Dimensions,TextInput,AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from './Header';
import { createStackNavigator } from 'react-navigation';
import APP_CONSTANTS from './AppConstants';



class Signup extends Component{
  
    static navigationOptions={
        header:null,
    }
  

    constructor(){
        super();
        this.state={
            full_name:'',
            email:'',
            mobile:'',
            password:'',
            err_full_name:'',
            err_email:'',
            err_mobile:'',
            err_password:'',

            myKey:'',
           }
      
      }

    isValidEmail=(email)=>{
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return reg.test(email);
    }

    isValidMobile=(mobile)=>{
      let reg = /^[6-9]\d{9}$/ ;
    return reg.test(mobile);

    }
    VerifyLogin=()=>{

        AsyncStorage.setItem('myKey','HelloInput');
        AsyncStorage.getItem("myKey").then((value) => {
            this.setState({"myKey": value});
        }).done();
        
        var name = this.state.full_name;
        var email = this.state.email;
        var mobile = this.state.mobile;
        var password = this.state.password;
        var error=0;

        if(name.length==0){
          this.setState({err_full_name:'Name is required.'});
          error=1;
      }else{
          this.setState({err_full_name:''});
      }


      if(email.length==0){
        this.setState({err_email:'Email  is required.'});
        error=1;
    }else if(!this.isValidEmail(email)){
      this.setState({err_email:'Please enter a valid email address.'});
      error=1;
    }else{
        this.setState({err_email:''});
    }


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
      
        fetch(APP_CONSTANTS.APP_API_URL+'registerUser', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email:this.state.email,
              username:this.state.full_name,
              mobile: this.state.mobile,
              password:this.state.password,
              
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
               const { navigate } = this.props.navigation;
               let ResponseCode=responseJson.Message['RespCode'];
               if(ResponseCode=='Success'){
               navigate('VerifyMobile');
               }else{
                Alert.alert(responseJson.Message['RespMessage']);
               }
                
              })
              .catch((error) => {
                console.error(error);
              });

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
      }
    })
/*--This was an sample comment --*/
  return (
    
    <View style={styles.container}>
     <HeaderComponent />
    <View style={styles.login_container}>
    <Text style={styles.absolutechild}>Signup</Text>
    
    <View style={styles.inputfiled}>
    
    <TextInput underlineColorAndroid='#000' ref='full_name' 
     
     maxLength={100} 
     returnKeyType={ "next" }

     value={this.state.full_name}

    onChangeText={(full_name) => this.setState({full_name})} style={styles.Myinput} placeholder='Full name'></TextInput>
    <Text style={styles.errorInput}>{this.state.err_full_name}</Text>
    
    <TextInput underlineColorAndroid='#000' ref='email' 
     returnKeyType={ "next" }
     value={this.state.email}
    onChangeText={(email) => this.setState({email})} style={styles.Myinput} placeholder='Email'></TextInput>

    <Text style={styles.errorInput}>{this.state.err_email}</Text>

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
    <Button title='Signup'
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

    <Text style={styles.alignCenter}>Already had an account ?</Text>

    <Button  style={styles.createAccount}  onPress={() =>
          navigate('Login')
        } 
     title='Login'
     raised
     color='#2874f0'
     buttonStyle={{
       backgroundColor: "#fff",
     }}
     containerViewStyle={{ marginTop:20,height:40 }}
    
    />
      </View>

    
    </View>
    </View>
    
 )
}

}
export default Signup;