import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

// components
import GoalItem from '../../components/GoalItem';
import GoalInput from '../../components/GoalInput'

export default function GoalScreen({ navigation }) {
    const [goals, setGoals] = useState([]);

    const [ismodalVisable, setIsModalVisible] = useState(false);

    const addUserGoalHandler = (goalTitle, goalDescription, continuous) => {
    setGoals(currentGoals => [...goals,
    { id: Math.random().toString(), value: goalTitle, description: goalDescription, continuous: continuous }]);
    setIsModalVisible(false);
    };

    const removeGoalHandler = goalId => {
    setGoals(goal => {
        return goals.filter((goal) => goal.id !== goalId);
    });
    };

    return (
    <View style={styles.mainContainer}>
        <View style = {styles.buttonView}>
            <Button title="Add New Goal" onPress={() => setIsModalVisible(true)} />
        </View>
      <GoalInput visible={ismodalVisable} onAddGoal={addUserGoalHandler} onCancel={()=>setIsModalVisible(false)} />
      
      {
        goals.length ?
          <FlatList
            style={styles.scrollContainer}
            data={goals}
            keyExtractor={(item, index) => item.id}
            renderItem={itemData =>
              <GoalItem 
                title={itemData.item.value} 
                id={itemData.item.id} 
                description={itemData.item.description} 
                continuous={itemData.item.continuous} 
                onDelete={removeGoalHandler} 
              />}
          />
         :
          <Text style={styles.emptyMessage}>You don't have any goals yet. Sharing experiences together shortens the distance.</Text>
      }
      
    </View>
    );
}

const styles = StyleSheet.create({

    scrollContainer: {
      paddingHorizontal: 20,
    },
    mainContainer: {
      paddingTop: 100,
      height: "100%",
      width: "100%",
      backgroundColor: "#E2E3F4",
    },
    buttonView:{
      alignItems:'center'
    },
  
    emptyMessage: {
      height: "80%",
      paddingTop: 100,
      padding: 20,
      position: "flex",
      textAlign: "center",
    }
  });