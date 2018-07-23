import React,{Component} from 'react';
import {View,Text,Dimensions,Button,Alert} from 'react-native';

export default class MyMenu extends Component{
 /* TO HIDE DEFAULT HEADER */
 static navigationOptions={
    header:null,
  }
/* //TO HIDE DEFAULT HEADER */


manageMenu=()=>{

    Alert.alert('I will manage');

}
    render(){
    let {width,height}=Dimensions.get('window');
    return(
<View>
        <View style={{height:200,width:150,backgroundColor:'#ccc',padding:25}}>
         <Text>ALL ARE EQUAL</Text>
        </View>
        <View>
<Button title='Open Menu' onPress={()=>this.manageMenu()}/> 
            </View>

        </View>

    )

    }




}