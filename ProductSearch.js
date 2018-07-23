import React,{Component} from 'react';
import {Dimensions,StyleSheet,TextInput,View,Text,Alert,ScrollView,TouchableHighlight} from 'react-native';
import APP_CONSTANTS from './AppConstants';
import {Icon} from 'react-native-elements';

let {height,width}=Dimensions.get('window');
let styles=StyleSheet.create({
    srchbarctner:{
        backgroundColor:APP_CONSTANTS.APP_BG_CLR,
        height:60,
        width:width,
        marginTop:-1,
        alignItems:'center' 
    },
    searchinput:{
    width:width/1.05,
    backgroundColor:'#fff',
    flexDirection:'row',
    borderRadius:3,
    height:45,
    padding:10
    },
    textInput:{
    width:'95%',
    paddingLeft:10,
    }
});

class ProductSearch extends Component{

  /* TO HIDE DEFAULT HEADER */
  static navigationOptions={ 
    header:null,
  }
  /* //TO HIDE DEFAULT HEADER */

  constructor(props){

    super(props)

    this.state={
        searchResults:<View><Text></Text></View>
    }

  }

  getSearchProducts=(kywrd)=>{
    var SearchResults=[];
    
    fetch(APP_CONSTANTS.APP_API_URL+'getProductsByName', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: kywrd,
        }),
        }).then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
             /*  SearchResults=responseJson['data'].map(EachR => (
<View></View>
            )); */
          })
          .catch((error) => {
            console.error(error);
          }); 
     this.setState({searchResults:SearchResults})
  }
  showResult=(Identity,Type)=>{

    
    
    
   console.log(Identity);
   console.log(Type);

   if(Type=='PRODUCT'){
    navigate('Home');
   }



  }

 render(){


  return(
<View>
<View style={{height:20,backgroundColor:APP_CONSTANTS.APP_BG_CLR,paddingTop:24}}></View>
    <View style={styles.srchbarctner}>
      <View style={styles.searchinput}>
      <Icon
  name='search'
  type='evilicon'
  color='#999'
  fontWeight='bold'
/>
      <TextInput underlineColorAndroid='#fff' placeholderTextColor='#999' onChangeText={(text)=>this.getSearchProducts(text)} style={styles.textInput} placeholder='Search for Products or Brands'></TextInput>
      </View>
    </View>
   <ScrollView>
<View style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
<TouchableHighlight onPress={()=>this.showResult('1','PRODUCT')}>
     <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15}}>
     
     <View style={{flex:1,marginLeft:-15,}}>
     <Icon
     name='search'
     type='evilicon'
     color='#999'
     fontWeight='bold'
     />
     </View>
     <View style={{flex:2}}><Text>Product Name</Text></View>
     
     <View style={{flex:1,alignItems:'flex-end',paddingRight:10}}>
     <Icon 
     name='call-made'
     type='material'
     color='#333'
     fontWeight='bold'
     />
     </View>
     </View>
    </TouchableHighlight>
     </View>
     </ScrollView>
     </View>
  )



 }
    




}//END OF CLASS


export default ProductSearch;
