import { Dimensions, StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 50
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
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        width: Dimensions.get('screen').width - 10,
    },
    // inputView: {
    //     flex: 1,
    //     backgroundColor: '#bbb',
    //     alignItems: 'flex-start',
    //     justifyContent: 'flex-start',
    // }
});


