import React, {useState} from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Pressable, Platform} from 'react-native'
import stylecss from './style'
// import DocumentPicker from 'react-native-document-picker'
import * as ExpoDocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuth } from '@/context/AuthCtx'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function CreateAuctionForm(){
    const {setIsLoading, authData} = useAuth();
    const manager_id=authData.id


    const [showDatePicker, setShowDatePicker] = useState(false)
    const toggleShowDatePiker = ()=>{
        setShowDatePicker(!showDatePicker)
    }
    const formatDate = (date) => {
        // function to format date for DatePicker
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based in JavaScript
        const year = date.getFullYear();
    
        // Add leading zeros if day or month is less than 10
        day = day < 10 ? `0${day}` : day;
        month = month < 10 ? `0${month}` : month;
    
        return `${year}-${month}-${day}`;
    };
    // state variable and Formating Function for DatePicker
    const [showTimePicker, setShowTimePicker] = useState(false)
    const toggleShowTimePiker = ()=>{
        setShowTimePicker(!showTimePicker)
    }
    const formatTime=(time)=>{
        // function to format time for TimePicker
        let hrs = time.getHours();
        let mins = time.getMinutes();

        hrs = hrs < 10 ? `0${hrs}`: `${hrs}`
        mins = mins < 10 ? `0${mins}`: `${mins}`


        return `${hrs}:${mins}`
    }
    


    // const today = formatDate(new Date())
    const [auctionForm, setAuctionForm]=useState({
        name: '',
        description: '',
        startDate: new Date(),
        startTime: new Date(),
        // endTime: '',
        timePerBid: '',
        rulesFile: '',
        maxTeams: '',
        maxPlayerPerTeam: '',
        minBidPrice: '',
    })


    const selectFile = async()=>{
        // refer the docs mentioned below for expo-document-picker guide
        // https://www.fsniraj.dev/file-upload-from-expo-document-picker-to-node-server 
        try {
            const pickedFile = await ExpoDocumentPicker.getDocumentAsync({
                // allow MIME types: image, csv, doc,docx, pdf, ppt, pptx 
                // refer https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
                type: ['image/*', 'text/csv', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf', 'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation']
            })
            // console.log(pickedFile)
            // {
            //     "assets": [{"mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "name": "TECHREPORT-2.docx", "size": 23128, "uri": "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/3a974be0-8561-4fe0-9218-7435b9ffb171.docx"}], 
            //     "canceled": false
            // }
            const assets = pickedFile.assets
            if(!assets)
                return

            const file = assets[0] 
            const rulesFile = {
                name: file.name.split(".")[0],
                extension: file.name.split(".")[1],
                uri: file.uri,
                size: file.size,
                type: file.mimeType,
            }
            
            // validating FILENAME and EXTENSION 
            // FILENAME must not contain `.(dot)`. However a dot just before the file extension is allowed
                // console.log("rulesFile: ",rulesFile)
                const validExtensions = ['jpg', 'jpeg', 'csv', 'doc', 'docx', 'pdf', 'ppt', 'pptx'];
                if (validExtensions.includes(rulesFile.extension)){
                    setAuctionForm({...auctionForm, rulesFile})
                }
                else{
                    console.log("Check Filename and Extension of the selected rulesFile : ", rulesFile)
                    alert("Please Select a file with .jpeg, .csv, .doc, .docx, .pdf, .ppt, .pptx ! Or Try renaming the filename to 'filename.extension' format ")
                    return
                }
                // console.log("auctionForm: ",auctionForm)

        } catch (error) {
            if(ExpoDocumentPicker.isCancel(error)){
                console.log('User Cancelled Upload')
            }
            else{
                console.log("Error while selecting a file: ", error);
            }
        }
    }

    const handleAuctionFormSubmit = async()=>{

        setIsLoading(true);
        if(auctionForm.name === ''||auctionForm.description===''||auctionForm.startDate === ''||auctionForm.maxTeams === ''||auctionForm.minBidPrice === ''||auctionForm.maxPlayerPerTeam === ''||auctionForm.timePerBid===''){
            alert('Field marked (*) cannot be empty');
            setIsLoading(false);
            return
        }
        try 
        {
            // Create FormData instance
            const formData = new FormData();

            // Append each form field
            // console.log("manager_id: ", manager_id);
            formData.append('manager_id', manager_id)
            formData.append('name', auctionForm.name);
            formData.append('description', auctionForm.description);

            formData.append('startDate', `${formatDate(auctionForm.startDate)}`)
            formData.append('startTime', `${formatTime(auctionForm.startTime)}:00`);
            // const combinedDateTime = new Date(`${formatDate(auctionForm.startDate)}T${formatTime(auctionForm.startTime)}:00`);  
            // console.log("combineDateTiem: ",combinedDateTime);
            // const utcDateTime = combinedDateTime.toISOString(); // This will convert to UTC in ISO 8601 format
            // // Now, you can store this UTC DateTime
            // formData.append('startDateTimeUTC', utcDateTime);
            // console.log("startDateTimeUTC: ",combinedDateTime);


            formData.append('timePerBid', auctionForm.timePerBid);
            formData.append('maxTeams', auctionForm.maxTeams);
            formData.append('maxPlayerPerTeam', auctionForm.maxPlayerPerTeam);
            formData.append('minBidPrice', auctionForm.minBidPrice);

            // Append the file if it's selected
            if (auctionForm.rulesFile) {
                formData.append('rulesFile', {
                    uri: auctionForm.rulesFile.uri, 
                    // name: `${auctionForm.rulesFile.name}.${auctionForm.rulesFile.extension}`, 
                    name: `${auctionForm.rulesFile.name}`,
                    extension: `${auctionForm.rulesFile.extension}`,
                    type: auctionForm.rulesFile.type,
                });
            }
            
            console.log('formData: ',formData);
            

            const result = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/create-auction`, {
                method: 'POST',
                body: formData,
                // headers:{
                //     'Content-Type': 'multipart/form-data',
                // }
            });

            // const responseText = await result.text()
            // console.log('Response Text: ', responseText.message);
            
            
            const responseData = await result.json(); // Check if the response contains JSON
            if (result.ok) {
                alert(responseData.message);
            } else {
                console.log('CreateAuction form Submit Error:', responseData);
                alert(responseData.message)
            }
        } catch (error) {
            console.log('Create Auction form Submit Error:', error);
            alert('Unable to process your request at the moment. Please try again later');
        }
        finally{
            setIsLoading(false);
        }
    }
    
    
    return(
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={stylecss.container}>
            <View style={stylecss.stepContainer}>
                <Text style={[stylecss.title, {color: '#5900B2',}]}>Create Auction</Text>
            </View>
            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight: '500'}}>Auction Name*</Text>
                <TextInput 
                    style={stylecss.textinput}
                    placeholder='Enter text' 
                    value={auctionForm.name}
                    onChangeText={(name)=>{setAuctionForm({...auctionForm, name})}}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='default'
                />
            </View>
            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight: '500'}}>Description*</Text>
                <TextInput
                    style={stylecss.textinput}
                    placeholder='Enter text'
                    value={auctionForm.description}
                    onChangeText={(description)=>{setAuctionForm({...auctionForm, description})}}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='default'
                />
            </View>

            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight:'500'}}>Auction Date*</Text>
                {
                   showDatePicker && (
                    <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={auctionForm.startDate}  // Keep it as a Date object
                    onChange={(event, selectedDate) => {
                        if (event.type === 'set') {
                            // If a date is selected, set it in the state
                            toggleShowDatePiker()
                            setAuctionForm({ ...auctionForm, startDate: selectedDate });
                        }
                        else{
                            toggleShowDatePiker(); // Close the date picker
                        }
                    }}
                    minimumDate={new Date()}
                    />
                )   
                }
                <Pressable onPress={toggleShowDatePiker}>
                <TextInput
                    placeholder='YYYY-MM-DD'
                    style={stylecss.textinput}
                    value={formatDate(auctionForm.startDate)}  // Format the Date object to 'YYYY-MM-DD'
                    editable={false}
                />
                </Pressable>

                
            </View>
            {/* <View style={stylecss.stepContainer}>
                <DateTimePickerAndroid mode="date" />
            </View> */}
            










            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight:'500'}}>Start Time*</Text>

                {   showTimePicker && (
                    <DateTimePicker
                        mode='time'
                        display='clock'
                        value={auctionForm.startTime}
                        onChange={(event, selectedTime)=>{
                            if(event.type=='set'){
                                toggleShowTimePiker()
                                setAuctionForm({...auctionForm, startTime: selectedTime})
                                // console.log("Picker Time: ", selectedTime)
                            }
                            else{
                                toggleShowTimePiker(); // Close the time picker
                            }
                        }}
                    />)
                }
                <Pressable onPress={toggleShowTimePiker}>
                    <TextInput
                        placeholder='HH:MM'
                        style={stylecss.textinput}
                        value={formatTime(auctionForm.startTime)}
                        // onChangeText={(startTime)=>{setAuctionForm({...auctionForm, startTime})}}
                        // keyboardType='number-pad'
                        editable={false}
                    />
                </Pressable>
            </View>














            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight:'500'}}>Single Bid Duration*</Text>
                <TextInput
                    placeholder='Time in minutes'
                    style={stylecss.textinput}
                    value={auctionForm.timePerBid}
                    onChangeText={(timePerBid)=>{setAuctionForm({...auctionForm, timePerBid})}}
                    keyboardType='numeric'
                />

            </View>
            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight: '500'}}>Min Bid Amount*</Text>
                <TextInput
                    style={stylecss.textinput}
                    placeholder='Rs. '
                    value={auctionForm.minBidPrice}
                    onChangeText={(minBidPrice)=>{setAuctionForm({...auctionForm, minBidPrice})}}
                    keyboardType='numeric'
                />
            </View>

            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight: '500'}}>Max Teams*</Text>
                <TextInput
                    style={stylecss.textinput}
                    placeholder='Enter a number'
                    value={auctionForm.maxTeams}
                    onChangeText={(maxTeams)=>{setAuctionForm({...auctionForm, maxTeams})}}
                    keyboardType='numeric'
                />
            </View>
            
            
            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight: '500'}}>Players Per Team*</Text>
                <TextInput
                    style={stylecss.textinput}
                    placeholder='Enter a number'
                    value={auctionForm.maxPlayerPerTeam}
                    onChangeText={(maxPlayerPerTeam)=>{setAuctionForm({...auctionForm, maxPlayerPerTeam})}}
                    keyboardType='numeric'
                />
            </View>
            

            <View style={stylecss.stepContainer}>
                <Text style={{fontWeight: '500'}}>Rules/Details</Text>
                <TouchableOpacity title="Sign Out" onPress={selectFile}style={style.roleBtn}>
                    {/*  for guide to Icons refer : https://medium.com/@techwithmuskan/react-native-icons-8d66afc3675e */}
                    <Text style={style.btnText}>Choose File <Icon name="image" size={18} color={'#00000'} /></Text>
                </TouchableOpacity>
            </View>
            
            {/* <View style={stylecss.stepContainer}>
                <TouchableOpacity style={stylecss.btn}>
                    <Text style={{fontWeight: '500', color: 'white'}}>Submit</Text>
                </TouchableOpacity>
            </View> */}
            <View style={stylecss.stepContainer}>
                <Button title='Submit' onPress={handleAuctionFormSubmit}/>
            </View>

        </View>
        </ScrollView>
    )
}


const style = StyleSheet.create({
    roleBtn:{
        // marginTop: 10,
        // backgroundColor: 'orange',
        // paddingVertical: 15,
        // paddingHorizontal: 20,
        borderRadius: 15,
        borderWidth: 1,
        padding: 2,
        marginVertical: 5, 
        borderColor: '#1d1f21',
        // alignItems: 'center'
    },
    btnText: {
        color: '#f5f5f5',
        fontWeight:'500', 
        fontSize: 15,
        backgroundColor: 'orange',
        paddingHorizontal: 110,
        paddingVertical: 10,
        borderRadius: 12,
    }
  })