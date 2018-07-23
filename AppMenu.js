import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Alert,Image,TouchableHighlight 
} from 'react-native';
import { Button} from 'react-native-elements';
import APP_CONSTANTS from './AppConstants.js'




class AppMenu extends Component {
    /* TO HIDE DEFAULT HEADER */
    static navigationOptions={
      header:null,
    }
  /* //TO HIDE DEFAULT HEADER */

  constructor(){
super();
   this.state={
    bazaarMenuDisplay:'none',
   }

  }


HelloBro=()=>{
  console.log('I visited Hello Bro');
}

toggleBazaarMenu=(isopen)=>{
if(isopen=='flex'){
  this.setState({bazaarMenuDisplay:'none'});
}else{
  this.setState({bazaarMenuDisplay:'flex'});
}
  
}

componentWillMount(){
  console.log(this.props.isopen);
  this.setState({bazaarMenuDisplay:this.props.isopen});
}

  render() {
    
 
    const list = [
  {
    name: 'Larry Page',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Google Founder'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]
  
  

  const MenuComponentNew = (
    <View style={{zIndex:999,position:'absolute',alignSelf: 'flex-start',width:'70%'}}>
    <View style={{display:this.state.bazaarMenuDisplay,backgroundColor:'#fff',height:this.props.height_}}>
      <View style={{height:20,backgroundColor:APP_CONSTANTS.APP_BG_CLR,paddingTop:25}}></View>
      <TouchableHighlight   underlayColor='#fff'  onPress={()=>this.toggleBazaarMenu(this.props.isopen)}>
      <View style={{height:60,backgroundColor:'#fff',alignItems:'center',borderBottomColor:'#ccc',borderBottomWidth:1}}>
      
      <Image
           style={{width: 35, height: 35}}
           source={require('./assets/images/icons8-left-50.png')} 
          
      />
      </View>
      </ TouchableHighlight>
      <View >
      {
        list.map((item, i) => (
          <TouchableHighlight key={i} onPress={()=>this.HelloBro()} underlayColor='#fff'>
          <View  onPress={()=>this.HelloBro()} style={{height:60,borderBottomColor:'#ccc',borderBottomWidth:1,padding:10,margin:1,backgroundColor:'white',alignItems:'center',flexDirection:'row'}}>
          <View style={{flex:1}}>
          <Image
           style={{width: 35, height: 35}}
           source={require('./assets/images/jlngdt_rounded.png')} 
          
      />
          </View>
          <View style={{flex:2}}>
          <Text >{item.name}</Text>
          </View>
          <View style={{flex:1,alignItems:'flex-end'}}>
          
          

        <Image
           style={{width: 16, height: 16}}
           source={require('./assets/images/icons8-forward-18.png')}
        />
       

          
      
          
          </View>
          </View>
          </TouchableHighlight >
        ))
      }
      </View>
    </View>
    </View>
  )
    return (
     
MenuComponentNew
   
    );
  }
}

export default AppMenu;