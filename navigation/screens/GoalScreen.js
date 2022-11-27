import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

// components
import GoalItem from '../../components/GoalItem';
import GoalInput from '../../components/GoalInput'

export default function GoalScreen({ navigation }) {
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
    <View style={styles.mainContainer}>
        <View style = {styles.buttonView}>
            <Button title="Add New Goal" onPress={() => setIsModalVisible(true)} />
        </View>
      <GoalInput visible={ismodalVisable} onAddGoal={addUserGoalHandler} onCancel={()=>setIsModalVisible(false)} />
      
      {
        (myGoals.length || theirGoals.length) ?

        
        <View>
          {
            myGoals.length ?
              <View>
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
              <Text style={styles.emptyMessage}>There are no goals yet for you</Text>
          }
          
          {
            theirGoals.length ?
            <View>
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
            <Text style={styles.emptyMessage}>There are no goals yet for your partner</Text>
          }
          
        </View>
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
      paddingTop: 70,
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