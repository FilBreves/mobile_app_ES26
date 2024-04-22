import { Dimensions, StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth: 1,
        marginBottom: 20,
        fontSize: 16,
        padding: 4,
        width: Dimensions.get('screen').width - 80
    },
    title: {
        fontSize: 24,
        margin: 40
    },
    label: {
        fontSize: 18,
        alignSelf: "flex-start",
    },
    buttonView: {
        width: Dimensions.get('screen').width - 140
    }
    // inputView: {
    //     flex: 1,
    //     backgroundColor: '#bbb',
    //     alignItems: 'flex-start',
    //     justifyContent: 'flex-start',
    // }
});


