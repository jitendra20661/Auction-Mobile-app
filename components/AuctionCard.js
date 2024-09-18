import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import stylecss from '@/screens/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AuctionCard = ({ item }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [clockColor, setClockColor] = useState('green');


    useEffect(() => {
        // // Convert auction start time to local time (adjust for time zone)
        // console.log("start_date: ",new Date(item.start_date).toLocaleDateString());
        // const startDate = new Date(item.start_date).toLocaleDateString()
        
        // // const auctionStartDateTime = new Date(`${startDate.split('T')[0]}T${item.start_time}`);
        // const auctionStartDateTime = new Date(`${item.start_date.split('T')[0]}T${item.start_time}`);
        // console.log("Auction Start DateTime:", auctionStartDateTime);  // Log the start time for debugging
        // const auctionStartDate = new Date(item.start_date);
        
        // const startDateLocal = auctionStartDate.toLocaleDateString('en-GB', { timeZone: 'UTC' });  // Force UTC for the correct date
        // console.log("StartDateLocal: ", startDateLocal);
        
        const auctionStartDateTime = new Date(item.start_date).toLocaleDateString(); // This date is in UTC
        console.log("Local Date: ",auctionStartDateTime);

        const [day, month, year] = auctionStartDateTime.split('/');
        // console.log("year: "+year);
        // console.log("month: "+month);
        // console.log("day: "+day);

        const time=item.start_time
        const auctionStartDateTimeUTC = new Date(year, month-1, day)
        console.log(" Local to UTC: ", auctionStartDateTimeUTC);
        
        
        
        // const startDateLocal = auctionStartDateTime.toLocaleDateString();
        // console.log("start_date_local: ",startDateLocal);

    

        const calculateTimeRemaining = () => {
            const now = new Date();  // Current local time
            const timeDiff = auctionStartDateTime - now;
            // console.log("Adjusted Time Difference:", timeDiff);  // Log the time difference for debugging

            // Convert the time difference to hours for debugging
            const timeDiffInHours = timeDiff / (1000 * 60 * 60);
            // console.log("Adjusted Time Difference (in hours):", timeDiffInHours);

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDiff / 1000 / 60) % 60);

                let timeString = '';
                if (days > 0) timeString += `${days}d `;
                if (hours > 0 || days > 0) timeString += `${hours}h `;
                if (minutes > 0) timeString += `${minutes}m`;

                setTimeRemaining(timeString);

                // Color Logic Based on Time Remaining
                if (days > 1) {
                    setClockColor('green'); // More than 1 day left
                    console.log("Clock Color: Green");
                } else if (days === 0 && hours >= 1) {
                    setClockColor('orange'); // Less than a day, more than an hour
                    console.log("Clock Color: Orange");
                } else if (hours < 1 && minutes > 0) {
                    setClockColor('red'); // Less than an hour
                    console.log("Clock Color: Red");
                }
            } else {
                setTimeRemaining(' --- ');
                setClockColor('gray'); // Auction has started or ended
                console.log("Clock Color: Gray");
            }
        };

        // Run immediately and set interval to update every minute
        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 60000);  // Update every minute

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [item]);

    return (
        <View style={[stylecss.card, { flexDirection: 'row' }]}>
            {/* Avatar on the left */}
            <Image
                source={{ uri: 'https://via.placeholder.com/60' }} // Placeholder avatar image
                style={stylecss.avatar}
            />

            <View style={{ flex: 1 }}>
                <Text style={stylecss.title}>{item.name}</Text>
                <Text style={stylecss.description}>{item.description}</Text>
                <Text>Start Date: {new Date(item.start_date).toLocaleDateString()}</Text>
                <Text>Start Time: {item.start_time}</Text>
                <View style={stylecss.cardDetails}>
                    <View style={stylecss.timeRemaining}>
                        <Text style={{ color: clockColor }}> Starts in: {timeRemaining}</Text>
                        <MaterialCommunityIcons name="clock-outline" size={20} color={clockColor} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AuctionCard;
