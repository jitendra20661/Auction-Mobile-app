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
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5
      },
      avatar: {
        width: 80,
        height: 80,
        // borderRadius: 30,
        marginRight: 15,   // Space between avatar and details

      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333'
      },
      description: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10
      },
      cardDetails: {
        marginVertical: 5
      },
      rulesFile: {
        fontSize: 12,
        color: '#888',
        marginTop: 10
      },
      timeRemaining: {
        flexDirection: 'row-reverse',
        color: 'green'
      }
})

export default stylecss;