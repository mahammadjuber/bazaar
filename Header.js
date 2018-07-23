import React,{Component} from 'react';
import {SideMenu,List,ListItem,Header} from 'react-native-elements';
import {Alert,ScrollView,View,Text,StyleSheet,Dimensions,Image} from 'react-native';
import APP_CONSTANTS from './AppConstants';
import { withNavigation } from 'react-navigation';


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
    
   // const { navigate } = this.props.navigation;
    return(
    <View>

      <Header backgroundColor='#2874f0'
      placement='center'
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Bazaar', style: { color: '#fff',fontSize:20 } }}
      rightComponent={{ icon: 'shopping-cart', color: '#fff',onPress:this.GotoCart }}
       />
       
    </View>
    );
    
}

}


export default withNavigation(HeaderComponent);