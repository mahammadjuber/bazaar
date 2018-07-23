import React, { Component } from 'react';
import { StyleSheet, View, ScrollView,Text} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

const AllDots='';
class DottedLine  extends Component{

getDots=(NumDots)=>{

AllDots=[];
for(i=0;i<NumDots;i++){
AllDots.push(

    <Text key={i} style={{lineHeight:5,paddingLeft:6,color:'#333'}}>.</Text>
)
}


return AllDots;
}


render(){

return(

   <View style={{paddingTop:8,paddingBottom:8}}>
   {this.getDots(parseInt(this.props.num_dots))}
   </View>


)



}




}// END OF CLASS


export default DottedLine;