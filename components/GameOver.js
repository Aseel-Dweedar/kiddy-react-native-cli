import React from 'react';
import { View, Image, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from './CustomBtn'

export default GameOver = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image style={styles.img}
                source={{ uri: "https://i.pinimg.com/originals/6f/3b/9f/6f3b9fff85514c1334ae7e8e531686cb.png" }}
            />
            <CustomBtn title={"العب مرة أخرى"} onPress={props.onPlayAgain} />
            <Pressable style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.backBtnText}>{"العودة إلى صفحة الألعاب"}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    img: {
        width: 250,
        height: 300,
        marginBottom: 20,
    },
    backBtn: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50
    },
    backBtnText: {
        color: '#277BC0',
    }
});