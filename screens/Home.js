import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../components/Card';

export default Home = ({ route }) => {

    const games = route.params.games;

    return (
        <View style={styles.container} >
            {
                games && games.map((game, idx) => (
                    <Card
                        key={idx}
                        title={game.title}
                        imgUri={game.uri}
                        pageName={game.pageName}
                    />
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
    },
});