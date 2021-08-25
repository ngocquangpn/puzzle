/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, ImageBackground, TouchableOpacity } from "react-native";

import Menu from "./components/Menu";
import Puzzle from "./components/Puzzle";
import background from "./assets/images/background.png";

const Stack = createNativeStackNavigator();
const backButton = require("./assets/images/button.png");

const App = () => {
  return (
    <ImageBackground source={background} resizeMode="stretch" style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Puzzle"
            component={Puzzle}
            options={({ navigation, route }) => ({
              title: `Level ${route.params.size}x${route.params.size}`,
              headerStyle: {
                backgroundColor: "#5181ff",
              },
              headerTitleStyle: {
                fontFamily: "BalooBhai2-ExtraBold",
                fontSize: 22,
                textAlign: "center",
              },
              headerLeft: () => (
                <TouchableOpacity style={{ margin: 5 }} onPress={() => {
                  navigation.push("Menu");
                }}>
                  <Image style={{ height: 50, width: 40, resizeMode: "contain" }} source={backButton} />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

export default App;
