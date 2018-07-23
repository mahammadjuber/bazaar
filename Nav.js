import React,{Component} from 'react';
import {SideMenu,List,ListItem,Header} from 'react-native-elements';
import {Alert,Button,ScrollView,View,Text,StyleSheet,Dimensions,Image} from 'react-native';
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

  

class HeaderComponent extends Component{
    
    static navigationOptions={
        header:null,
    }

    GotoCart=()=>{
        
        const { navigate } = this.props.navigation;
        navigate('Cart');

    }
   


render(){
    const { navigate } = this.props.navigation;
/* 
    setTimeout(() => {
        
      this.GotoCart()
    }, 1000); */
    return(
    <View style={{marginTop:100}}>

     <Button OnPress={()=>Alert.alert('sjsfjh')} title='aajhfajh' />
       
    </View>
    );
    
}

}


export default HeaderComponent;