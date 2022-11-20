import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const GoalItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this,props.id)} >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
                {
                    props.description ? <Text style={styles.description}>{props.description} </Text> : <Text></Text>
                }
                <Text>{props.continuous}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    textContainer: {
        padding: 10,
        borderWidth: 1,
        marginVertical: 10,
       
        width: "95%"
    },

    title: {
        fontWeight: "bold",
        textTransform: 'capitalize',
        fontSize: 20,
    },

    description: {
        padding: 10,
    }
});

export default GoalItem;