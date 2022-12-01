import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "rgb(224,250,150)",
    },
    view: {
        width: "80%"
    },
    cardTitle: {
        color: "rgb(0,0,0)"
    },
    cardButton: {
        marginTop: 10,
        margin: 2,
        marginLeft: 0,
        marginRight: 0,
    }
})