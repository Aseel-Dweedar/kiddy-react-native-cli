import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width;

export default Card = ({ title, imgUri, pageName }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(pageName)} >
            <Text style={styles.gameTitle}>
                {title}
            </Text>
            <View style={styles.imgContainer}>
                <Image
                    style={styles.images}
                    source={{
                        uri: imgUri
                    }}
                />
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
    },
    imgContainer: {
        borderWidth: 5,
        borderRadius: 20,
        borderColor: "#ddd",
        overflow: "hidden",
        height: deviceWidth * 0.5,
        width: deviceWidth * 0.5,
        padding: 10,
    },
    gameTitle: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5
    },
    images: {
        width: undefined,
        height: undefined,
        flex: 1,
    }
});