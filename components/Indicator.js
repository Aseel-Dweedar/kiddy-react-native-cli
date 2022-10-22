import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default Indicator = ({ currentQuestionIdx, idx }) => {

    return (
        <View
            style={currentQuestionIdx === idx ? styles.selectedIndicator : styles.indicator} >
            <Text
                style={currentQuestionIdx === idx ? styles.selectedIndicatorText : styles.indicatorText}
            >{idx + 1}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    indicator: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 50 / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        elevation: 1
    },
    selectedIndicator: {
        width: 70,
        height: 70,
        borderWidth: 3,
        borderColor: "#277BC0",
        borderRadius: 70 / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    indicatorText: {
        fontSize: 20,
        color: "#666666",
    },
    selectedIndicatorText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#277BC0",
    }
});