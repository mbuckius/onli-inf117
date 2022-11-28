import * as React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    const image = require("Goals.png");

    return (
        <ImageBackground source={image} style = {styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
