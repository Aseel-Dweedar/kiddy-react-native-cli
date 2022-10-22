import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

export default Header = () => {

  return (
    <View style={styles.headerContainer} >
      <Text style={styles.title} >
        MY GAMES
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent:"center" ,
        alignItems:"center",
        backgroundColor: "#FB2576",
        height: 60,
    },
    title :{
        color: "white",
        fontSize: 18
    }
});