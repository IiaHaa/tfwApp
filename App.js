import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './components/Home';
import NewWorkout from './components/NewWorkout';
import Workouts from './components/Workouts';
import Profile from './components/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({  // Navigator can be customized using screenOptions
            tabBarInactiveTintColor: '#3D3D3D',
            tabBarActiveTintColor: '#DE9E36',
            tabBarIcon: ({ focused, color, size }) => {
                // Function tabBarIcon is given the focused state, color and size params
                let iconName;
                    
                if (route.name === 'Koti') {
                  iconName = 'md-home';
                } else if (route.name === 'Uusi treeni') {
                  iconName = 'md-add';
                } else if (route.name === 'Treenit') {
                  iconName = 'md-bar-chart';
                } else if (route.name === 'Profiili') {
                  iconName = 'md-body';
                } else {
                  console.error('Unknown route')
                }
                    
                return <Ionicons name={iconName} size={size} color={color} />; //it returns an icon component
            },
          })}>
          <Tab.Screen name="Koti" component={Home} />
          <Tab.Screen name="Uusi treeni" component={NewWorkout} options={{unmountOnBlur: true}} />
          <Tab.Screen name="Treenit" component={Workouts} />
          <Tab.Screen name="Profiili" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigator: {
    padding: 10
  },
});
