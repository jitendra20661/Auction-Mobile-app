import React, { useState } from "react";
import { StyleSheet, View, Text,TouchableOpacity,Button, Modal, Pressable} from "react-native";
import { useAuth } from "@/context/AuthCtx";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import stylecss from "./style";




export default function UserTypeScreen(props){
    const auth = useAuth();
    // const [modalVisibility, setModalVisibility]=useState(false)

    return(
        <View style={style.container}>

            {/* <View style={style.stepContainer}>
                <Text style={[stylecss.title, {color: '#5900B2'}]}>User Type</Text>
            </View> */}
            {/* <View style={style.roleBtn}>
                <Button title="Manage Auction" onPress={()=>{props.navigation.navigate('Create Auction Form')}}/>

            </View>
            <View style={[style.roleBtn]}>
                <Button title="Create Team"/>
            </View>
            <View style={style.roleBtn}>
                <Button title="Join Player"/>
            </View> */}

            {/* <TouchableOpacity title="Sign Out" onPress={()=>{}} style={style.btn}>
                    <Text style={{color: 'white', fontWeight:'bold'}}>Test Logout</Text>
            </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Create Auction Form')}} style={style.roleBtn}>
                    <Text style={[style.btnText, {paddingHorizontal: 90}]}>Manage Auction <MaterialCommunityIcons name="gavel" size={24}/></Text>
                    
                </TouchableOpacity>

            <TouchableOpacity onPress={()=>{}} style={style.roleBtn}>
                    <Text style={[style.btnText, {paddingHorizontal: 105}]}>Create Team <MaterialCommunityIcons name="account-group" size={24}/></Text>
            </TouchableOpacity>

            <TouchableOpacity title="Sign Out" onPress={()=>{}} style={style.roleBtn}>
                <Text style={[style.btnText, {paddingHorizontal: 110}]}>Join Player <MaterialCommunityIcons name="cricket" size={24}/></Text>
            </TouchableOpacity>
            {/* <Modal 
                animationType="slide"
                // transparent={true}
                visible={modalVisibility}
                onRequestClose={()=>{setModalVisibility(!modalVisibility)}}
                // presentationStyle="fullScreen"
            >
                <View style={{flex: 1, backgroundColor: 'plum', padding: 40}}>
                    <Text>Manager</Text>
                    <Button title="close" onPress={()=>{setModalVisibility(false)}}>Close</Button>
                    

                    <MaterialCommunityIcons name="cross"/>

                </View>
            </Modal> */}
        </View>
    )

}


const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    //   alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
    //   bottom: 100,
    },
    btn:{
        backgroundColor: 'orange',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    roleBtn:{
        // marginTop: 10,
        // backgroundColor: 'orange',
        // paddingVertical: 15,
        // paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 2,
        padding: 2,
        marginVertical: 5, 
        borderColor: '#1d1f21',
        // alignItems: 'center'
    },
    btnText: {
        color: 'white', 
        fontWeight:'bold', 
        fontSize: 15,
        backgroundColor: 'orange',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 230,
    }
  })