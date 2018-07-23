import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,Image,TouchableHighlight,AsyncStorage} from 'react-native';
import APP_CONSTANTS from './AppConstants.js';
import {Icon,Divider} from 'react-native-elements';
import AppMenu from './AppMenu';
import { withNavigation } from 'react-navigation';


let {width,height} =Dimensions.get('window');
const styles=StyleSheet.create({


})



class CustomHeader extends Component{

  constructor(props){
    super(props);
    this.state={
      bazaarMenuDisplay:'none',
      categoryMenu:<Text></Text>,
      BazaarCartLength:0,
    }

 /*    setInterval(() => {
      this.setState({BazaarCartLength:this.state.BazaarCartLength+1});
    }, 1000);



     */
}
  
OpenMenu=()=>{

this.setState({bazaarMenuDisplay:'flex'});

}



closeMenu=()=>{
  this.setState({bazaarMenuDisplay:'none'});

}

 GetCategories(){
        
    fetch(APP_CONSTANTS.APP_API_URL+'listCategories', {
        method: 'GET'
        }).then((response) => response.json())
          .then((responseJson) => {
           const { navigate } = this.props.navigation;
           let ResponseCode=responseJson.Message['RespCode'];
           if(ResponseCode=='Success'){
           var categories=responseJson.data;
           
           var AllCategories=[];
           for(let i=0;i<categories.length;i++){
            let Category=categories[i]['category'];
            let IsGroceries=categories[i]['Groceries'];
            let Items=categories[i]['items'];
            let NavData={'Items':Items,'IsGroceries':IsGroceries,'CategoryName':Category.category_name};

            if(Category.category_id==1){
              AllCategories.push({
                name: 'Fruits',
                avatar_url: 'https://png.icons8.com/ios/30/333333/vegetarian-food.png',
                navigateurl: 'Sample',
                navData:NavData,
              })
            }else if(Category.category_id==2){
              AllCategories.push({
                name: 'Vegetables',
                avatar_url: 'https://png.icons8.com/wired/30/333333/natural-food.png',
                navigateurl: 'Sample',navData:NavData,
              })
            }else if(Category.category_id==3){
              AllCategories.push({
                name: 'Groceries',
                avatar_url: 'https://png.icons8.com/wired/30/333333/ingredients.png',
                navigateurl: 'Sample',
                navData:NavData,
              })
            }

            categoryMenu=AllCategories.map((item, i) => (
              <TouchableHighlight key={i} onPress={()=>navigate(item.navigateurl,item.navData)} underlayColor='#fff'>
              <View  style={{height:45,padding:10,margin:1,backgroundColor:'white',alignItems:'center',flexDirection:'row'}}>
              <View style={{flex:1}}>
              <Image
               style={{width: 25, height: 25}}
               source={{uri:item.avatar_url}} 
              
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
           this.setState({categoryMenu:categoryMenu});
           }
           
           }else{
            Alert.alert(responseJson.Message['RespMessage']);
           }
            
          })
          .catch((error) => {
            console.error(error);
          });




    }

  /*   componentWillUpdate(nextProps, nextState) {


      if(nextProps.CartLength!=undefined){
       // nextState.bazaarCartLength=nextProps.CartLength;
        console.log('Cart length is defined bro.');
        console.log(nextProps.CartLength);
        this.setState({bazaarCartLength:nextProps.CartLength});
      }
      if(this.state.bazaarMenuDisplay=='none'){
          
      }else{
        nextState.bazaarMenuDisplay = nextProps.display_menu;
      }
  } */

 
 componentWillUpdate(nextProps, nextState) {
    console.log('Property was updated');
    console.log(nextProps.cart_length);
    if(nextProps.cart_length==undefined){
      nextState.CartLength=0;
    }else{
      nextState.CartLength=nextProps.cart_length;
    }
    
    //this.setState({CartLength:nextProps.cart_length});
  } 

    componentWillMount() {

      if(this.props.cart_length==undefined || this.props.cart_length==0){
        console.log('Sure');
        this.props.cart_length=5;
      /*  AsyncStorage.getItem("BazaarCart").then((value) => {
          let Cart=[];
          CartObject=JSON.parse(value);
          for(var key in CartObject){
              let Item=CartObject[key];
              Cart.push(Item);
          } 
          console.log(Cart.length);
          this.props.cart_length=Cart.length;
      }).done(); */
      }else{
        //this.setState
      }
      }

    /* LOADS BEFORE RENDER */
    componentDidMount(){
        this.GetCategories()
     }

     logout=()=>{
      const { navigate } = this.props.navigation;
      AsyncStorage.removeItem("LoggedInUserId");
      navigate('Home');
     }

 render(){
  const { navigate } = this.props.navigation;
  const menuitems = [
    {
      name: 'My Cart',
      avatar_url: 'https://png.icons8.com/windows/30/666666/shopping-cart.png',
      navigateurl: 'Cart'
    },
    {
      name: 'My Orders',
      avatar_url: 'https://png.icons8.com/dotty/30/333333/purchase-order.png',
      navigateurl: 'Subscriptions'
    },
    {
      name: 'My Account',
      avatar_url: 'https://png.icons8.com/ios/30/333333/user.png',
      navigateurl: 'Profile'
    }
  ]

  

  const MenuComponentNew =(

    <View style={{zIndex:999,position:'absolute',alignSelf:'flex-start',width:'100%',backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
    <View style={{height:20,backgroundColor:APP_CONSTANTS.APP_BG_CLR,paddingTop:24}}></View>
    <View style={{display:this.state.bazaarMenuDisplay,flexDirection:'row'}}>
    <View style={{backgroundColor:'#fff',width:'70%',opacity:1,height:height}}>
    <View style={{flexDirection:'row',height:60,backgroundColor:APP_CONSTANTS.APP_BG_CLR,alignItems:'center',borderBottomColor:'#ccc',borderBottomWidth:1}}>
    <View style={{flex:1}}>
    <Icon containerStyle={{width:55}} 
           name='home'
           underlayColor={APP_CONSTANTS.APP_BG_CLR}
           type='material'
           color='#fff'
           size={28}
           onPress={()=>navigate('Home')} />
    </View>
      
      <View style={{flex:2}}>
      <Text onPress={()=>navigate('Home')} style={{color:'white',paddingTop:10,}}>Home</Text>
      </View>
      
      <View style={{flex:1,alignItems:'flex-end',paddingRight:10}}>
      <Icon containerStyle={{width:33}} 
           name='clear'
           underlayColor={APP_CONSTANTS.APP_BG_CLR}
  type='material'
   color='#fff'
  size={28}
  onPress={()=>this.closeMenu()}
/>
  
      </View>
      
      </View>
     
      <View >
      {
        this.state.categoryMenu
      }


       <View style={{paddingTop:10}}>
       <Image
           style={{width: '100%', height:200}}
           source={{uri:'http://www.seriff.in/download/1499222768food.jpg'}} 
          
      />

        {
        menuitems.map((item, i) => (
          <TouchableHighlight key={i} onPress={()=>navigate(item.navigateurl)} underlayColor='#fff'>
          <View  style={{height:45,padding:10,margin:1,backgroundColor:'white',alignItems:'center',flexDirection:'row'}}>
          <View style={{flex:1}}>
          <Image
           style={{width: 25, height: 25}}
           source={{uri:item.avatar_url}} 
          
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

        <TouchableHighlight  onPress={()=>this.logout()} underlayColor='#fff'>
          <View  style={{height:45,padding:10,margin:1,backgroundColor:'white',alignItems:'center',flexDirection:'row'}}>
          <View style={{flex:1}}>
          <Image
           style={{width: 25, height: 25}}
           source={{uri:'https://png.icons8.com/windows/30/666666/shutdown.png'}} 
          
      />
          </View>
          <View style={{flex:2}}>
          <Text >Logout</Text>
          </View>
          <View style={{flex:1,alignItems:'flex-end'}}>
          
          

        <Image
           style={{width: 16, height: 16}}
           source={require('./assets/images/icons8-forward-18.png')}
        />
       

          
      
          
          </View>
          </View>
          </TouchableHighlight >

      </View>


      </View>
    
      
    </View>
    <TouchableHighlight  style={{width:'100%'}} onPress={()=>this.closeMenu()} underlayColor='rgba(52, 52, 52, 0.8)'>
      <View  style={{height:height,alignSelf:'flex-end'}}>
       
      </View>
      </TouchableHighlight >
      </View>
    </View>
  )

    return(
     <View >
     <View style={{height:20,backgroundColor:APP_CONSTANTS.APP_BG_CLR,paddingTop:25}}></View>
     

    { MenuComponentNew }

     <View style={{height:60,backgroundColor:APP_CONSTANTS.APP_BG_CLR,flexDirection:'row',alignItems:'center'}}>
     <View style={{flex:1}}>
     <View style={{flexDirection:'row'}}> 
     <View>
     <Icon containerStyle={{width:55}} 
           name='dehaze'
           underlayColor={APP_CONSTANTS.APP_BG_CLR}
  type='material'
   color='#fff'
  size={28}
  onPress={()=>this.OpenMenu()}
/>
</View>
<View style={{paddingTop:2}}>
{/* <Text style={{color:'white',fontWeight:'bold',fontStyle:'italic',fontSize:16}}>Bazaar</Text> */}
     </View>
     </View>
     </View>
     <View style={{flex:1}}>
     <Text style={{color:'white',fontSize:20,paddingLeft:20}} onPress={()=>navigate('Home')}>Bazaar </Text>
     </View>
    
     <View style={{flex:1,alignItems:'flex-end'}}>
     <View style={{backgroundColor:'white',borderRadius:7.5,height:15,width:15,alignItems:'center',position:'absolute',top:-8,right:12}}>
     <Text style={{fontSize:10}}>{this.state.CartLength}</Text>
     </View>
     
     <Icon containerStyle={{width:55}} 
           name='shopping-cart'
           underlayColor={APP_CONSTANTS.APP_BG_CLR}
  type='material'
   color='#fff'
  size={22}
  onPress={()=>navigate('Cart')}
/>
     </View>
     
     </View>
   
     </View>

    );


 }



}//end of class

export default withNavigation(CustomHeader);

