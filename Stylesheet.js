import React, { Component } from 'react';
import { StyleSheet, View,Text,AsyncStorage,Alert,ScrollView,Image } from 'react-native';

const styles = StyleSheet.create({
    RaisedText:{
        backgroundColor:'#fff',
        position:'relative',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        padding:5,
     
      },
      cardStyle:{
        backgroundColor:'#fff',
        minHeight:100,
        padding:10,
        paddingTop:20,
        paddingBottom:20,
        position:'relative',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 10,
        marginBottom:10,
      },
      prflTextInput:{
          padding:6,
          minWidth:240
      },
      ItemName:{
        fontSize:16,
    }, divider:{
        backgroundColor:'#ccc',
        marginTop:15,
        marginBottom:7,
      },
      DashbTileCnt:{
          textAlign:'center',
          fontSize:25,
          paddingTop:20,
      },
      textCenter:{
          textAlign:'center',
      },
      whiteText:{
         color:'white',
      }
});
export default styles;
