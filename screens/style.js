import {StyleSheet} from 'react-native'

const stylecss =  StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        // justifyContent: 'center',
        // borderWidth: 4,
    },
    title:{
        // borderWidth: 5, 
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    stepContainer:{
        gap: 8,
        marginVertical: 8,
    },
    textinput:{
        // backgroundColor: '#f5f5f5',  //white 
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 15,
        fontWeight: '500',
        flexDirection: 'row'
        // color: '#222'
    },
    btn:{
        backgroundColor: '#5900B2',
        // backgroundColor: 'slate',
        paddingVertical: 10,
        justifyContent: 'centre',
        alignItems: 'center',
        color: 'white',
        borderRadius: 6
    },
})

export default stylecss;