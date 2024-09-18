import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Button, Image} from 'react-native'
import { useEffect , useState} from 'react'
import stylecss from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '@/context/AuthCtx'
import { FlatList } from 'react-native-gesture-handler'
import AuctionCard from '@/components/AuctionCard'

export default Dashboard = (props)=>{

    useEffect(()=>{
        getAuctionsCreatedList();
    },[])

    const {authData, setIsLoading} = useAuth()
    const [auctionListData, setAuctionListData] = useState([])
    
    const getAuctionsCreatedList = async()=>{
        // setIsLoading(false)
        try {
            // const result = await fetch(`https://jsonplaceholder.typicode.com/posts`)
            const result = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/getAuctionsList/${authData.id}`)
            const resp = await result.json()
            // console.log("Fetch Auction list Result: ", resp);
            setAuctionListData(resp)
            console.log("auctionListData: ", auctionListData);

        } catch (error) {
            console.log("Error while trying to fetch List of auctions created by the user",error)
            alert("An unexpected Error occurred")
        }
        finally{
            setIsLoading(false)
        }
    }
    return(
        <View>
            {/* <Text>Dashboard Page</Text> */}
            <ScrollView>
            <View>
                {
                    auctionListData?(
                        auctionListData.map((item)=>{
                            return(
                                
                                // <View style={[stylecss.card, {flexDirection: 'row'}]} key={item.id}>

                                //     {/* Avatar on the left */}
                                //     <Image 
                                //         source={{ uri: 'https://via.placeholder.com/60' }} // Placeholder avatar image
                                //         style={stylecss.avatar}
                                //     />
                                    
                                //     <View style={{flex: 1, }}>
                                //     <Text style={stylecss.title}>{item.name}</Text>
                                //     <Text style={stylecss.description}>{item.description}</Text>
                                //     <View style={stylecss.cardDetails}>
                                //     {/* <Text>Manager ID: {item.manager_id}</Text> */}
                                //     {/* <Text>Max Teams: {item.max_teams}</Text> */}
                                //     {/* <Text>Players Per Team: {item.players_per_team}</Text> */}
                                //     {/* <Text>Min Bid Price: {item.min_bid_price}</Text> */}
                                //     {/* <Text>Time Per Bid: {item.time_per_bid}</Text> */}
                                //     <Text>Start Date: {new Date(item.start_date).toLocaleDateString()}</Text>
                                //     <Text>Start Time: {item.start_time}</Text>
                                //     </View>
                                //     {/* <Text style={stylecss.rulesFile}>Rules File: {item.rules_file}</Text> */}
                                //     <Text style={stylecss.rulesFile}>For More Download file :</Text>
                                //     <Button title='Rules File'/>
                                //     </View>
                                // </View>
                                <AuctionCard item={item} key={item.id}/>
                            )
                        })
                    ):(
                        <Text>No Auctions Yet</Text>
                    )
                }
                {/* <FlatList
                    data={auctionListData}
                    renderItem={(item)=>{
                        return(
                            <View key={item.id}>
                                <Text style={stylecss.title}>{item.title}</Text>
                                <Text>{item.body}</Text>
                            </View>
                        )
                    }}
                /> */}
                {/* <AuctionList/> */}
            </View>
            </ScrollView>

            <View style={inlineStyle.plusBtn}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('UserTypeScreen')}}>
                    <Text><MaterialCommunityIcons name="plus" color="white" size={40}/></Text>
                </TouchableOpacity>
            </View>

        </View>
        // </ScrollView>

    )
}

// const AuctionList = ({ auctionListData }) => {
//     const renderItem = ({ item }) => (
//         <View key={item.id}>
//             <Text style={stylecss.title}>{item.title}</Text>
//             <Text>{item.body}</Text>
//         </View>
//     );

//     return (
//         <FlatList
//             data={auctionListData}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             ListEmptyComponent={<Text>ille</Text>}
//         />
//     );
// };

const inlineStyle = StyleSheet.create({
    plusBtn: {
        position: 'absolute',
        width: 60, 
        height: 60, 
        backgroundColor: '#b1e911', 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: 10,
        top: 620,
        left: 280,
        borderWidth: 0.2,
        borderColor: 'orange',


        //shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.9,  
        shadowRadius: 9,  
        elevation: 6,
    }
})