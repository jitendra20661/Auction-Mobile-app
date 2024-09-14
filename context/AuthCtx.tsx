import React, { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



const AuthContext = createContext<{
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    authData: { id: number, name: string; email: string } | null;
    logIn: (data: { username: string; password: string }) => Promise<void>;
    logOut: () => Promise<void>;
  }>({
    isLoading: false,
    setIsLoading: () => {},
    authData: null,
    logIn: async() => {},
    logOut: async() => {},  
  });


export function SessionProvider({children}: PropsWithChildren){
    const [isLoading, setIsLoading]=useState(false);
    const [authData, setAuthData] = useState<{ id: number, name: string; email: string } | null>(null);


    useEffect(() => {
        loadStorageData();
    },[]);
    
    async function loadStorageData() {
        setIsLoading(true);
    try {
        const authDataSerialized = await AsyncStorage.getItem("@AuthData");
        if (authDataSerialized) 
        {
            // convert JSON data into object
            const _authData = JSON.parse(authDataSerialized);
            // console.log(_authData);
            setAuthData(_authData);
        }
    } catch (error) {
        console.error('Error loading storage data', error);
    } finally {
        //loading finished
        setIsLoading(false);
    }
}

    const saveAuthDataInAsyncStorage = async (data: any) => {
    try {
        //Persist the data in the Async Storage
        //to be recovered in the next user session.
        await AsyncStorage.setItem("@AuthData", JSON.stringify(data));
    } catch (error) {
        console.log("Error Saving Auth Data to AsyncStorage: ", error);
    }
    };
    
    // console.log(AsyncStorage.getItem('@AuthData'))
    const getAuthDataFromAsyncStorage = async () => {
    try {
        const value = await AsyncStorage.getItem("@AuthData");
        if (value !== null) {
        // We have data!!
        console.log("Async Storage: " + value);
        return;
        }
    } catch (error) {
        console.log("Error Retrieving Async Storage data:");
    }
    return null;
    };



    const logIn = async(props: {username: string, password: string})=>{
        setIsLoading(true);
        try 
        {   
            console.log(process.env.EXPO_PUBLIC_API_URL)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/loginUser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: props.username,
                  password: props.password,
                }),
            });
            const data = await response.json();
            alert(response.status + " " + data.message+" , id: " + data.user_info.id);
            const uid = data.user_info.id;

            setIsLoading(false);

            if (!response.ok) {
                // alert("Error! "+data.message)
                return;
            }

            const _authData = {
                id: uid,
                name: props.username,
                email: props.password,
            };

            //Set the data in the context, so the App can be notified
            //and send the user to the AuthStack
            setAuthData(_authData);
            // console.log(_authData);

            // Save the data in AsyncStorage
            await saveAuthDataInAsyncStorage(_authData);
            // Optionally retrieve and log the stored data
            // await getAuthDataFromAsyncStorage();


        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            // Always set isLoading to false when done
            setIsLoading(false);
        }

    }
    const logOut = async () => {
        setIsLoading(true);

        //Remove data from context, so the App can be notified
        //and send the user to the AuthStack
        setAuthData(null);
        //Remove the data from Async Storage
        //to NOT be recoverede in next session.
        await AsyncStorage.removeItem("@AuthData");
        setIsLoading(false);
    };
    

    return(
        <AuthContext.Provider value={{isLoading, setIsLoading, authData, logIn, logOut}}>
        {children}
        </AuthContext.Provider>
    )
}


//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
  
    return context;
  }
  
  export { AuthContext, useAuth };