import { StyleSheet } from "react-native";

export const HomeScreenStyle = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    cardTextTitle: {
        fontSize: 16,
        padding: 10
    },
    card: {
        backgroundColor: "#ffff",
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3,
        }
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
})