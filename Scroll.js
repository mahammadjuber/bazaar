import React,{Component} from 'react';
import {ScrollView,Text,View} from 'react-native';



class Scroll extends Component{

render(){
 
    var AppList=[];

    for(let i=0;i<100;i++){
     
        AppList.push(

            <View key = {i}><Text style={{textAlign:'center'}}>User number {i}</Text></View>
        )

    }
    return(
    <ScrollView >
    <View style={{height:200}}>
    <Text>Hello</Text>
      {AppList}
    </View>
    </ScrollView>

    )
}
    



}//END OF CLASS COMPONENT


export default Scroll;