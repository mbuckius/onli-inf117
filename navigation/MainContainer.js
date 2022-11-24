import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import GoalScreen from './screens/GoalScreen';
import MapScreen from './screens/MapScreen';

//Screen names
const homeName = "Home";
const goalName = "Goal";
const mapName = "Map";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
  
              if (rn === homeName) {
                iconName = focused ? 'home' : 'home-outline';
  
              } else if (rn === goalName) {
                iconName = focused ? 'flag' : 'flag-outline';
  
              } else if (rn === mapName) {
                iconName = focused ? 'map' : 'map-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            }, 
            
            tabBarStyle: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70}
              },
          })}
          >
  
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={goalName} component={GoalScreen} />
          <Tab.Screen name={mapName} component={MapScreen} />
  
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  export default MainContainer;
