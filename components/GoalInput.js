import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { View, Image, TextInput, Text, Button, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const GoalInput = props => {
    const [continuous, setContinuous] = useState(false);
    // I just added the onetime boolean for aesthetic purposes of showing which type of goal was selected (to make sure neither show up as selected at the start)- Ell
    const [onetime, setOneTime] = useState(false);
    const [enteredGoal, setEnteredGoal] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [whoGoalIsFor, setWhoGoalIsFor] = useState("");

    const userGoalInputHandler = enteredText => {
        setEnteredGoal(enteredText);
    };

    const userDescInputHandler = desc => {
        setEnteredDescription(desc);
    }

    const addGoalHandler = () => {
        if (enteredGoal.length && whoGoalIsFor.length) {
            props.onAddGoal(enteredGoal, enteredDescription, continuous, whoGoalIsFor);
            setEnteredGoal('');
            setEnteredDescription('');
            setWhoGoalIsFor('');
        }
        else {
            alert("Goal must have a title");
        }
    };

    const setGoalToOneTime = () => {
        setContinuous(false);
        setOneTime(true);
    };

    const setGoalToContinuous = () => {
        setContinuous(true);
        setOneTime(false);
    }

    return (

        <Modal visible={props.visible} animationType="slide" >
            <View style={styles.firstContainer}>
                <Text style={styles.title}>Add Goal</Text>
                <Image 
                            style = {{width: 50, height: 50}}
                            source = {require("Chart.png")}
                            />
                {/* <Image style={styles.addGoalImage} source={require('../assets/addGoal.png')} /> */}
                <ScrollView style = {{width:'100%'}}>
                <View style={styles.infoContainer}>
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>1. Select your goal type</Text>
                        
                        <TouchableHighlight style={onetime ? styles.goalTypeSelected : styles.goalType} onPress={setGoalToOneTime}>
                            <View style={{flexDirection:'row'}}>
                                <Image 
                                    style = {{width: 40, height: 40}}
                                    source = {require("Calendar.png")}></Image>
                                    <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                                        <Text style={{paddingLeft: 5, alignSelf: 'center', fontWeight: '700'}}>One Time Goal</Text>
                                        <Text style={{paddingLeft: 5}}>For goals with a deadline</Text>
                                    </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={continuous ? styles.goalTypeSelected : styles.goalType} onPress={setGoalToContinuous}>
                            <View style={{flexDirection:'row'}}>
                                <Image 
                                    style = {{width: 40, height: 40}}
                                    source = {require("Continuous.png")}></Image>
                                    <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                                        <Text style={{paddingLeft: 5, alignSelf: 'center', fontWeight: '700'}}>Continuous Goal</Text>
                                        <Text style={{paddingLeft: 5}}>For forming new habits</Text>
                                    </View>
                            </View>
                        </TouchableHighlight>
                   
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>2. Set up your goal</Text>

                        <TextInput
                        placeholder="name your goal"
                        style={styles.textInputContainer}
                        onChangeText={userGoalInputHandler}
                        value={enteredGoal}
                        />

                        <TextInput
                        placeholder="describe the goal (optional)"
                        style={styles.descInputContainer}
                        onChangeText={userDescInputHandler}
                        value={enteredDescription}
                        />

                        <View style={styles.selectPerson}>
                            <SelectDropdown 
                                data = {["me", "my partner"]}
                                onSelect={(selectedItem) => {
                                    setWhoGoalIsFor(selectedItem);
                                }}
                                defaultButtonText = "Who is this goal for?"
                            />
                        </View>
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button color='red' title="Cancel" onPress={props.onCancel} />
                        </View>

                        <View style={styles.button}>
                            <Button title="Add" onPress={addGoalHandler} />
                        </View>
                    </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        </Modal>
        
    );
};

const styles = StyleSheet.create({
    addGoalImage: {
        width: "50%",
        height: "50%",
        resizeMode: 'contain',
    },

    goalType: {
        padding: 10,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 5,
        borderColor: "#8f7060",
        backgroundColor: "#ffe8db",
        width: "100%"
    },

    goalTypeSelected: {
        padding: 10,
        borderWidth: 3,
        marginVertical: 10,
        borderRadius: 5,
        borderColor: "#8f7060",
        backgroundColor: "#fccbb1",
        width: "100%"
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
      
    textInputContainer: {
        borderBottomColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: '100%'
    },

    descInputContainer: {
        borderBottomColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: '100%'
    },

    firstContainer: {
        flex: 1,
        paddingTop: 70,
        alignItems: 'center',
    },

    infoContainer: {
        width: "100%",
        padding: 30,
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    button: {
        width: '40%'
    },

    section: {
        width: "100%",
        padding: 30,
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: 'center',
    },

    selectPerson: {
        marginTop: 20,
        alignSelf: 'center',
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default GoalInput;