import React,{Component} from 'react';
import {Alert,ScrollView,View,Text,StyleSheet,Dimensions,Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import APP_CONSTANTS from './AppConstants';



/* #2874f0 */

let {height,width} =Dimensions.get('window');
const styles=StyleSheet.create({
LaunchContainer:{
    backgroundColor:APP_CONSTANTS.APP_BG_CLR,
    height:height,
    width:width,
    padding:20,
    position:'relative',
},
AppLogo:{
 justifyContent: 'center',
alignItems: 'center',
flex:1
},
AppName:{
    fontSize:25,
    color:'white',
}
})


class LaunchPage extends Component{
    
    static navigationOptions={
        header:null,
    }

    
   
    GotoHome(){
        const { navigate } = this.props.navigation;
        navigate('Home');
    }
   
render(){
    const { navigate } = this.props.navigation;
    setTimeout(() => {
      this.GotoHome()
    }, 1000);
    return(

     <View style={styles.LaunchContainer}>
     <View ref='AppLogo' style={styles.AppLogo}>
     <Image
           style={{width: 96, height: 96}}
          source={require('./assets/images/AppLogo.png')}

      />
     <Text style={styles.AppName}> Bazaar</Text>
     <Image
           style={{width: 90, height: 90}}
          source={{uri: 'https://loading.io/spinners/message/lg.messenger-typing-preloader.gif'}}
     /> 
     </View>
     </View>

    )
}

}


export default LaunchPage;