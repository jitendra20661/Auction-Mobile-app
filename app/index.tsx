import { StatusBar } from "react-native";
import {Router} from '@/routes/Router'
import { SessionProvider } from "@/context/AuthCtx";

export default function Index() {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Edit app/index.tsx to edit this screen.</Text>
    // </View>
    <>
    <StatusBar hidden={true}/>
    <SessionProvider>
      <Router/>
    </SessionProvider>
    </>
  );
}
