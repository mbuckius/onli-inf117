import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Button, TextInput, FlatList, ImageBackground } from 'react-native';

// components

import GoalItem from '../../components/GoalItem';
import GoalInput from '../../components/GoalInput'

export default function GoalScreen({ navigation }) {
  const image = require("../../Goals.png");
  
  const [goals, setGoals] = useState([]);
  const [myGoals, setMyGoals] = useState([]);
  const [theirGoals, setTheirGoals] = useState([]);

  const [ismodalVisable, setIsModalVisible] = useState(false);

  const addUserGoalHandler = (goalTitle, goalDescription, continuous, whoGoalIsFor) => {
    if (whoGoalIsFor == "me") {
      setMyGoals([...myGoals,
        { id: Math.random().toString(), value: goalTitle, description: goalDescription, continuous: continuous}]);
    }
    else {
      setTheirGoals([...theirGoals,
        { id: Math.random().toString(), value: goalTitle, description: goalDescription, continuous: continuous}]);
    } 
    
    setIsModalVisible(false);
  };

  const removeMyGoalHandler = goalId => {
    setMyGoals(goal => {
        return myGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const removeTheirGoalHandler = goalId => {
    setTheirGoals(goal => {
        return theirGoals.filter((goal) => goal.id !== goalId);
    });
  };

  return (
    <View style={styles.mainContainer} textAlign="center">
      <ImageBackground source = {image} style = {styles.image}>

        <View style = {styles.buttonView}>
            <Button title="Add New Goal" onPress={() => setIsModalVisible(true)} />
        </View>

        <Image 
          style = {{width: 100, height: 100, alignSelf: 'center'}}
          source = {require("Stars.png")}
        />
        <GoalInput visible={ismodalVisable} onAddGoal={addUserGoalHandler} onCancel={()=>setIsModalVisible(false)} />
    
        {
          (myGoals.length || theirGoals.length) ?
            <View style={styles.goalsContainer}>
              {
                myGoals.length ?
                  <View style={styles.myGoalsContainer}>
                    <Text>Your Goals</Text>
                    <FlatList
                      style={styles.scrollContainer}
                      data={myGoals}
                      keyExtractor={(item, index) => item.id}
                      renderItem={itemData =>
                        <GoalItem 
                          title={itemData.item.value} 
                          id={itemData.item.id} 
                          description={itemData.item.description} 
                          continuous={itemData.item.continuous} 
                          onDelete={removeMyGoalHandler} 
                        />}
                    />
                  </View>
                  :
                  <Text style={styles.myGoalsContainer}>There are no goals yet for you</Text>
              }
              
              {
                theirGoals.length ?
                <View style={styles.theirGoalsContainer}>
                  <Text>Your Partner's Goals</Text>
                  <FlatList
                    style={styles.scrollContainer}
                    data={theirGoals}
                    keyExtractor={(item, index) => item.id}
                    renderItem={itemData =>
                      <GoalItem 
                        title={itemData.item.value} 
                        id={itemData.item.id} 
                        description={itemData.item.description} 
                        continuous={itemData.item.continuous} 
                        onDelete={removeTheirGoalHandler} 
                      />}
                  />
                </View>
                :
                <Text style={styles.theirGoalsContainer}>There are no goals yet for your partner</Text>
              }
              
            </View>
          :
            <Text style={[styles.emptyMessage, styles.setColorWhite]}>You don't have any goals yet. Sharing experiences together shortens the distance.</Text>
        }

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

    scrollContainer: {
      paddingHorizontal: 20,
    },
    mainContainer: {
      height: "100%",
      width: "100%", 
      justifyContent: 'center',
      textAlign: 'center',
      alignContent: 'center'
      // backgroundColor: "#E2E3F4",
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonView:{
      alignItems:'center',
      marginTop: 30
    },
    setColorWhite: {
      color: '#e961e63'
    },
    emptyMessage: {
      height: "80%",
      paddingTop: 100,
      padding: 20,
      position: "flex",
      textAlign: "center",
      color: 'white'
    },

    goalsContainer: {
      height: '90%',
      width: '90%',
      alignSelf: 'center',
      
      // backgroundColor: 'yellow'
    },

    myGoalsContainer: {
      // backgroundColor: 'red',
      height: '45%',
      margin: 5,
      overflow: 'scroll'
    },

    theirGoalsContainer: {
      height: '45%',
      margin: 5,
    },
  });
