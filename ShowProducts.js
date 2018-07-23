import React,{Component} from 'react';
import {Text,Card,View,TextInput,Alert,StyleSheet,Dimensions,Image,ScrollView } from 'react-native';
import CustomHeader from './CustomHeader';

class ShowProducts extends Component{
  /* TO HIDE DEFAULT HEADER */
  static navigationOptions={
    header:null,
  }
/* //TO HIDE DEFAULT HEADER */
  render(){
    debugger;
    const { navigation } = this.props;
    let Products=navigation.getParam('Products', 'NO-ID');
    let AllProducts=[];
    for(i=0;i<Products.length;i++){
      for(j=0;i<Products[i].length;j++){
      AllProducts.push(Products[i][j]);
      }
    }
    console.log(AllProducts);
    let {width,height}=Dimensions.get('window');
    var styles=StyleSheet.create({
      container:{
        backgroundColor:'#fff',
        height:height
      },
      ProductContainer:{
       height:200,
      }

    });
    return(
        <ScrollView>
          <CustomHeader />
        <View style={styles.container}>
           <Text>I will show some Products</Text>  

          { /* PRODUCT CONTAINER */}
          <View style={styles.ProductContainer}>
          
          </View>
          
          { /* //PRODUCT CONTAINER */}
           
        </View>
        </ScrollView>
          )
  }

}//end of class

export default ShowProducts;
