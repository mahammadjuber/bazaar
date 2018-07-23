import React,{Component} from 'react';
import { View,Alert,Text,StyleSheet,Dimensions,TextInput,AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator } from 'react-navigation';
 import HeaderComponent from './Header'; 
 



class Login extends Component{
  
    static navigationOptions={
        header:null,
    }
 

    constructor(props){
        super(props);
        this.state={
            mobile:'',
            password:'',
            err_mobile:'',
            err_password:'',
            myKey:'',
           }
      
      }
      ManageNavigation(){
      
        Alert.alert("I was inside go home ");
        const { navigate } = this.props.navigation;
        Alert.alert("I was inside go home 22");
       navigate('Login');
       }
    VerifyLogin=()=>{

        AsyncStorage.setItem('myKey','HelloInput');
        AsyncStorage.getItem("myKey").then((value) => {
            this.setState({"myKey": value});
        }).done();
        

        var mobile = this.state.mobile;
        var password = this.state.password;
        var error=0;
        if(mobile.length!=10){
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
      
        fetch('http://192.168.0.15/Codeignitor/index.php/Welcome/VerifyLogin', {
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
                Alert.alert(responseJson.mobile);
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
    <Text style={styles.absolutechild}>Login Sample</Text>
    
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

    <Text style={styles.alignCenter}>Don't have an account ?</Text>

    <Button  style={styles.createAccount}  onPress={()=>navigate('VerifyMobile')
        }
     title='Create account'
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
export default Login;