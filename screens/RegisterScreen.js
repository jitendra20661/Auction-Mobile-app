import React, { useState } from "react"
import stylecss from './style'
import { Text, View,Button, TextInput } from "react-native"
import {TouchableOpacity } from "react-native-gesture-handler"
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from "@/context/AuthCtx";

export default function RegisterScreen(props){

    const [registerData, setRegisterData]=useState({
        username: '',
        email:'',
        password: '',

    });
    const [hidePassword, setHidePassword]=useState(true);
    

    const handleChangeUsername = (username)=>{
        setRegisterData({...registerData, username})
        // console.log(username);
    }
    const handleChangePassword = (password)=>{
        setRegisterData({...registerData, password})
        // console.log(password)
    }

    const {setIsLoading} = useAuth();
    const handleRegistration = async()=>{
        setIsLoading(true);
        if(registerData.username===''||registerData.password===''||registerData.email===''){
            alert('Username and password are required')
            setIsLoading(false);
            return
        }
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/registerUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: registerData.username,
                    email: registerData.email,
                    password: registerData.password,
                })
            })

            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            //     // alert('Registration failed. Please try again.');
            //     return
            // }

            const json = await response.json();
            // console.log('Registration successful:', json);
            alert(json.message);

            if(response.status == 201)
                props.navigation.goBack()

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Registration failed. Please try again.');
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        // <View 
        // style={{flex:1, justifyContent:'center', alignItems:'center',
        //  }}>


        <View style={[stylecss.container, {justifyContent: 'center'}]}>
            {/* <Text>Register Screen</Text> */}
            <View style={stylecss.stepContainer}>
                <Text style={[stylecss.title,{color: '#5900B2', fontSize: 50}]}>Register</Text>
            </View>
            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight:'500'}}>Username</Text>
                <TextInput placeholder="Enter Name" style={stylecss.textinput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    value={registerData.username}
                    onChangeText={handleChangeUsername}
                />
            </View>
            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight:'500'}}>Email</Text>
                <TextInput placeholder="example@email.com" style={stylecss.textinput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='email-address'
                    value={registerData.email}
                    onChangeText={(email)=>{setRegisterData({...registerData, email})}}
                />
            </View>
            
            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight:'500'}}>Password</Text>
                <View style={stylecss.textinput}>
                    <TextInput placeholder="Enter Password"
                        secureTextEntry={hidePassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        value={registerData.password}
                        onChangeText={handleChangePassword}
                        style={{flex: 1}}
                    />
                    {/* <FontAwesome name="eye" size={24} color="black" /> */}
                    <MaterialCommunityIcons
                        name={hidePassword?'eye-off':'eye'}
                        size={24}
                        color='#aaa'
                        onPress={()=>{setHidePassword(!hidePassword)}}
                        style={{marginLeft: 10}}
                    />
                </View>

            </View>



            {/* <Button title="Submit"/> */}
            <View style={stylecss.stepContainer}>
                <TouchableOpacity style={stylecss.btn} onPress={handleRegistration}>
                    <Text style={{color:'white', fontWeight: 'bold'}}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            
            <View>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={props.navigation.goBack}>
                    <Text>Already an user ? Click </Text><Text style={{textDecorationLine: 'underline', color: 'blue'}}>Here</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

