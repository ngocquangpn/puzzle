/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./components/Menu";
import Puzzle from "./components/Puzzle";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={{
          headerTitle: "Puzzle Game",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "fantasy",
            fontSize: 28,
          },
        }} />
        <Stack.Screen
          name="Puzzle"
          component={Puzzle}
          options={({ route }) => ({
            headerTitle: `Level ${route.params.size}x${route.params.size}`,
            headerStyle: {
              backgroundColor: "#f28d35",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontFamily: "fantasy",
              fontSize: 22,
              textAlign: "center",
              flexDirection: "row",
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
