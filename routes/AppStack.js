import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/context/AuthCtx';
import stylecss from '@/screens/style';
import CreateAuctionFormPage from '../screens/CreateAuctionForm';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Stack = createStackNavigator()
export const AppStack = ()=>{

    const auth = useAuth()
    return(
        <Stack.Navigator
        screenOptions={{
            // headerTitle:'', 
            headerStyle:{
                // height:50, 
                backgroundColor:'#f5f5f5',
                // paddingVertical:0
                borderColor: '#00000',
                borderWidth: 1,
            }, 
            headerTitle:'',
            headerRight:(props)=>(
                // <Button title='Logout' onPress={auth.signOut} style={styles.btn}/>
                <TouchableOpacity onPress={auth.logOut} style={style.btn}>
                    <Text style={{color: 'white', fontWeight:'bold'}}>Logout <MaterialCommunityIcons name='logout' size={17} color='white'/></Text>
                    
            </TouchableOpacity>
            ),
            headerRightContainerStyle:{
                justifyContent:'center', 
                // borderWidth: 1,
                marginRight: 10,
                top: 0,

            },
            headerLeftContainerStyle: {
                justifyContent:'center',
            }
        }}
        // screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Home Screen' component={HomeScreen}/>
            <Stack.Screen name='Create Auction Form' component={CreateAuctionFormPage}/>
        </Stack.Navigator>
    )
}


const style = StyleSheet.create({
    btn:{
        backgroundColor: 'orange',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 6,

    }
})
