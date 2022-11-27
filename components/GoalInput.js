import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { View, Image, TextInput, Text, Button, StyleSheet, Modal, TouchableHighlight } from 'react-native';


const GoalInput = props => {
    const [continuous, setContinuous] = useState(false);
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
    };

    const setGoalToContinuous = () => {
        setContinuous(true);
    }

    return (
        <Modal visible={props.visible} animationType="slide" >
            <View style={styles.firstContainer}>
                <Text style={styles.title}>Add Goal</Text>

                {/* <Image style={styles.addGoalImage} source={require('../assets/addGoal.png')} /> */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>1. Select your goal type</Text>

                        <TouchableHighlight style={styles.goalType} onPress={setGoalToOneTime}>
                            <View>
                                <Text>One Time Goal</Text>
                                <Text>For goals with a deadline</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.goalType} onPress={setGoalToContinuous}>
                            <View>
                                <Text>Continuous Goal</Text>
                                <Text>For forming new habits</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                   
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
        backgroundColor: "#FFE5D7",
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
        width: '60%',
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