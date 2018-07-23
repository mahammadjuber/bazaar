import React,{Component} from 'react';
import {Alert,Text,TextInput,View,AsyncStorage,StyleSheet,ScrollView} from 'react-native';
import {Button,Icon,Divider} from 'react-native-elements';
import APP_CONSTANTS from './AppConstants.js';
import RadioBtn from  './RadioBtn';
import Scroll from './Scroll.js';
import CustomHeader from './CustomHeader';
import AppMenu from './AppMenu';

import { Table, Row, Rows } from 'react-native-table-component';



const styles =StyleSheet.create({

container:{
    backgroundColor:'#fff',
    marginTop:50,
    minHeight:150,
},
container_table: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
head: { height: 40, backgroundColor: '#f1f8ff' },
text: { margin: 6 }


})

class Test extends Component{
    
  /* TO HIDE DEFAULT HEADER */
  static navigationOptions={
    header:null,
  }
/* //TO HIDE DEFAULT HEADER */
 
    constructor(){
        super()
        this.state={
            MyHeader:<CustomHeader page_name='Test' cart_length='5'/>,
            CompanyName:'Nextpage Technologies Pvt Ltd.',
            MyStorage:'I was empty now.',
            value:'',
            CartLength:0,
            radio_btn_name:'radio-button-checked',
            LoggedInUserId:'',
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            tableData: [
              ['1', '2', '3', '4'],
              ['a', 'b', 'c', 'd'],
              ['1', '2', '3', '456\n789'],
              ['a', 'b', 'c', 'd']
            ]
        };
        AsyncStorage.setItem('Testing2', 'This was just an test method new.');
        AsyncStorage.getItem("LoggedInUserId").then((value) => {
            this.setState({LoggedInUserId:value});
            
          });
        /* var Hello=AsyncStorage.getItem("Testing");
        console.log(Hello); */
       AsyncStorage.getItem("Testing2").then((test) => {
          console.log(test);
          this.setState({'MyStorage':test});
      }).done();

      AsyncStorage.removeItem("Testing2");


    AsyncStorage.getItem("Testing2").then((test) => {
      console.log(test);
      this.setState({'MyStorage':test});
  }).done();

        this.MyRefs=[];
       }





       ManageTest=()=>{

       
        this.setState({MyHeader:<CustomHeader page_name='Test' cart_length='12'/>})
        this.setState({CartLength:2})

        
       }
 

    


render(){
 
  const state = this.state;

return(
 <View>
     {this.state.MyHeader}

     <CustomHeader page_name='Test' cart_length={this.state.CartLength}/>

     <Button onPress={()=>this.ManageTest()} title='Update Props' />
    
 </View>



)



}


}//end of class


export default Test;
