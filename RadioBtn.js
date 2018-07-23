import React,{Component} from 'react';
import {Text,View,AsyncStorage,StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import APP_CONSTANTS from './AppConstants.js';
 
const styles =StyleSheet.create({

    container:{
        backgroundColor:'#fff',
        marginTop:50,
        minHeight:150
    }
    
    
    })


let state={
    radio_btn_names:{
        
    },
}

class RadioBtn extends Component {


    constructor(){
    super();
        this.state=state;


    }

    ManageRadioButton=(Identity,GroupName)=>{

        
        var radio_btn_name='';
        var radio_btn_names=this.state.radio_btn_names;
        CurrentButtonName=radio_btn_names[Identity+'_'+GroupName];
        if(CurrentButtonName==='radio-button-unchecked'){
            radio_btn_name='radio-button-checked';
        }else{
            radio_btn_name='radio-button-unchecked';
        }

        
        for (var rs in radio_btn_names) {
            if(rs.indexOf(GroupName)!=-1){
            // CurrentItem=rs.split("_").pop();
             console.log(rs);
             radio_btn_names[rs]='radio-button-unchecked';
            }
        }
        
        console.log(radio_btn_names);
        radio_btn_names[Identity+'_'+GroupName]=radio_btn_name;

        this.setState({radio_btn_names:radio_btn_names});
          console.log(this.state.radio_btn_names[Identity+'_'+GroupName]);

    }


    componentWillMount(){

      var radio_btn_name=this.props.radio_btn_name;
      var GroupName=this.props.group_name;
      var Identity=this.props.id;
      var radio_btn_names=this.state.radio_btn_names;
      radio_btn_names[Identity+'_'+GroupName]=radio_btn_name;
      this.setState({radio_btn_names:radio_btn_names});
      


    }

    render() {
      return (
          <View style={{flexDirection:'row',padding:5,height:50}}>
        <View>
        <Icon containerStyle={{flex:1,paddingLeft:7}} 
               name={this.state.radio_btn_names[this.props.id+'_'+this.props.group_name]}
               type='material'
               color={this.props.radio_btn_clr}
               size={24}
               onPress={()=>this.ManageRadioButton(this.props.id,this.props.group_name)}
             />
        
        </View>

<View style={{marginTop:10.5,marginLeft:6}}>
<Text>{this.props.label}</Text>
</View>
</View>

      );
    }
  }

  export default RadioBtn;
  