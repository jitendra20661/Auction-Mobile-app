import { ActivityIndicator, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import {AppStack} from './AppStack'
import { AuthStack } from "./AuthStack"
import {useAuth} from '../context/AuthCtx';


export const Router=()=>{
    const {authData, isLoading} = useAuth();

    if(isLoading){
        return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>
        )
    }
    return(
        <NavigationContainer independent={true}>
            {authData ? <AppStack/>: <AuthStack/>}
        </NavigationContainer>  
    )
}