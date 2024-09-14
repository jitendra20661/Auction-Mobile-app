import { View, Text, TouchableOpacity, Touchable, StyleSheet,Image, Platform } from "react-native";
import { useAuth } from "@/context/AuthCtx";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import stylecss from "./style";
import {MaterialCommunityIcons} from '@expo/vector-icons'

const auth_img = require('@/assets/images/auth_img.jpg')

export default function LoginScreen(props){
    // const [loading, isLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

  const auth = useAuth();
  const handleLogIn = async () => {
    // isLoading(true);
    await auth.logIn(formData)
  };

    return(

        // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //     {/* <Text>Login Screen</Text> */}
        //         <TouchableOpacity title="Sign In" onPress={signIn}style={style.btn} >
        //             <View >
        //                 <Text style={{fontWeight: 'bold', color: 'white'}}>Test Login</Text>
        //             </View>
        //         </TouchableOpacity>
            
        //     <View>
        //         <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{props.navigation.navigate('Register Screen')}}>
        //             <Text>Don't Have an Account ? Register </Text><Text style={{textDecorationLine: 'underline', color:'blue'}}>Here</Text>     
        //         </TouchableOpacity>
        //     </View>
        //     {/* <Button title="Sign In" onPress={signIn} /> */}
        // </View>
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={auth_img}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Login</ThemedText>
          {/* <HelloWave /> */}
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold">Username</ThemedText>        
          <TextInput 
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='default'
            placeholder="Enter text" 
            value={formData.username} 
            onChangeText={username=>setFormData({...formData, username})} 
            style={styles.TextInput}
            />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold">Password</ThemedText>
          <TextInput placeholder="Enter text" value={formData.password} onChangeText={password=>setFormData({...formData, password})} style={styles.TextInput} autoCapitalize="none" autoCorrect={false}/>
        </ThemedView>


        <ThemedView>
            <TouchableOpacity onPress={handleLogIn} style={styles.btn}>
                <View>
                    <ThemedText type="defaultSemiBold">Login <MaterialCommunityIcons name='login' size={16} /></ThemedText>
                </View>
            </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('RegisterScreen')}} style={{flexDirection:'row'}}>
            {/* <ThemedText>Dont't have an account? Register </ThemedText> */}
            <Text style={{color:'white'}}>Don't Have an Account ? Register </Text><Text style={{textDecorationLine: 'underline', color:'skyblue'}}>Here</Text>     

        </TouchableOpacity>

      </ParallaxScrollView>

    )
}


const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      },
    img:{
        height: 200,
        width: 200
    },
    img_container:{ 
        height: 200,
        
    },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 300,
    width: 500,
    top:0,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  TextInput:{
    backgroundColor:"#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#222'
  },
    btn:{
        backgroundColor: 'orange',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius:8,
        justifyContent: 'center',
        alignItems: 'center',
    }
})