import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, Paragraph } from "react-native-paper";
import axios from "axios";

const baseUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=10';

const CardItem = ({item}) => {
    const [readMore, setReadMore] = useState(false);

    return (
        <Card style={styles.CardStyle}>
            <Card.Cover source={{ uri: item.url }} />
            <Card.Content>
                <Card.Title title={item.title} />
                <Paragraph numberOfLines={readMore? 0 : 2} >{item.title}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => setReadMore(!readMore)}>{readMore ? "ย่อ" : "อ่านเพิ่มเติม"}</Button>
            </Card.Actions>
        </Card>
    );
};

const DiseaseScreen = () => {

    let [diseaseData, setDiseaseData] = useState([]);
    const getDiseaseData = async () => {
        const response = await axios.get(baseUrl)
            .then(response => {
                setDiseaseData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDiseaseData();
    }, []);


    console.log(diseaseData);
    return (
        <View style={styles.container}>
        <FlatList 
        data={diseaseData}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({item}) => (
            <CardItem item={item} />
        )}
        />
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    CardStyle: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
});

export default DiseaseScreen;