import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default CustomBtn = (props) => {

    return (
        <TouchableOpacity
            activeOpacity={props.activeOpacity ? props.activeOpacity : 0.5}
            style={{...styles.btn, ...props.btnStyle}}
            onPress={props.onPress}
        >
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        elevation: 3,
        backgroundColor: '#277BC0',
        width: "100%",
        height: 60
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});