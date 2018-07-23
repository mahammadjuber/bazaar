import React,{Component} from 'react';
import {Text,Card,View,TextInput,Alert,StyleSheet,Dimensions,Image,ScrollView } from 'react-native';
import CustomHeader from './CustomHeader';
import AppMenu from './AppMenu';
import APP_CONSTANTS from './AppConstants';
import { Icon,Button } from 'react-native-elements';
import HomeSlider from './AppSlider';


class Home extends Component{

    /* TO HIDE DEFAULT HEADER */
    static navigationOptions={
        header:null,
      }
    /* //TO HIDE DEFAULT HEADER */

    constructor(){
     super()
    this.state={
        categories:[]
    }
    }
    

    GetCategories(){
        console.log('Hello');
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
            
            if(i==1){
                var URI="https://www.bigbasket.com/media/uploads/banner_images/T1_All_Pomegranate_DT_2_1600x460_25thjun.jpg";
               }else{
                   var  URI=APP_CONSTANTS.APP_BASE_URL+Category.catgimg
               }
            AllCategories.push(
            <View key={i} style={{paddingTop:10,backgroundColor:'white'}}> 
            <View style={{flexDirection:'row',position:'relative',width:'100%'}}>
            <Text style={{flex:1,textAlign:'left',fontSize:17,padding:10,paddingBottom:5}}>{Category.category_name}</Text>
            <Button title='View All' style={{position:'absolute',flex:2,right:0,marginLeft:'90%'}}
            onPress={()=>navigate('Sample',{'Items':Items,'IsGroceries':IsGroceries,'CategoryName':Category.category_name})}
            buttonStyle={{
                backgroundColor: "#fff",
                height: 28,
                borderColor: "#999",
                borderWidth: 0,
                borderRadius: 3,
                marginTop:0
              }}
              raised
              containerViewStyle={{ marginTop:5,height:30,borderRadius: 3,borderWidth:1,borderColor:'#fff' }}
              color={APP_CONSTANTS.APP_BG_CLR}
              titleStyle={{ fontWeight: "700"}}
            /> 
            </View>
            <View style={{padding:10}}>
           
            <Image
                style={{height: 170,borderColor:'#fff',borderRadius:5,borderWidth:1}}
                source={{uri:URI}}
              />
              </View>
            </View>
            )
           }
           this.setState({categories:AllCategories})
           }else{
            Alert.alert(responseJson.Message['RespMessage']);
           }
            
          })
          .catch((error) => {
            console.error(error);
          });




    }

    /* LOADS BEFORE RENDER */
    componentDidMount(){
        this.GetCategories()
     }


    render(){
    debugger;
    const { navigate } = this.props.navigation;
    let {height,width}=Dimensions.get('window');
    let styles=StyleSheet.create({
        srchbarctner:{
            backgroundColor:APP_CONSTANTS.APP_BG_CLR,
            height:55,
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
    
   

    return(
        <View style={{flex:1}}>
              {  /* HEADER */ }
              <CustomHeader/>
{  /* //HEADER */ }
             
             {  /* SEARCH BAR */ }
    <View style={styles.srchbarctner}>
      <View style={styles.searchinput}>
      <Icon
  name='search'
  type='evilicon'
  color='#999'
  fontWeight='bold'
/>
      <TextInput underlineColorAndroid='#fff' placeholderTextColor='#999' onTouchEndCapture={()=>navigate('ProductSearch')} style={styles.textInput} placeholder='Search for Products or Brands'></TextInput>
      </View>
    </View>
   
    
{  /* //SEARCH BAR */ }
    <ScrollView style={{backgroundColor:'#fff'}} onScroll={(e) => {
        let paddingToBottom = 10;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
          // Silence for now and make something noise later...
          //Alert.alert('Reached Bttom');
        }}}>
       


 <View styles={{height:170}}>
    <Image
          style={{height: 170}} 
          source={{uri: 'https://www.bigbasket.com/media/uploads/banner_images/pizza-party_28thJune.jpg'}}
        />
    </View>

{  /* PRODUCT CATEGORIES */ }
{this.state.categories}


{  /* //PRODUCT CATEGORIES */ }
    <Text style={{textAlign:'center',padding:15,fontSize:15}}>That's all for now :)</Text>
    </ScrollView>
    </View>
    
)
}
}//END OF CLASS


export default Home;