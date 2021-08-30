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
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import Menu from "./components/Menu";
import Puzzle from "./components/Puzzle";
import background from "./assets/images/background.png";
import { Divider, Icon } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";

const Stack = createNativeStackNavigator();
const backButton = require("./assets/images/button.png");

const App = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaProvider>
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
                    navigation.popToTop("Menu");
                  }}>
                    <Image style={{ height: 50, width: 40, resizeMode: "contain" }} source={backButton} />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <Icon
                    size={30}
                    name="question-circle"
                    type="font-awesome-5"
                    color="#ffffff"
                    onPress={() => setModalVisible(true)} />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
      <Modal isVisible={modalVisible}>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: "#fad9ae",
          width: "80%",
          borderRadius: 5,
          padding: 8,
        }}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 16, fontFamily: "BalooBhai2-ExtraBold" }}>Instruction</Text>
          </View>
          <Divider orientation="horizontal" width={5} style={{backgroundColor:"red"}} />
          <View style={{ width: "100%", marginTop: 15, alignItems: "center" }}>
            <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>Touch and move the number tiles in ascending order, enjoy the magic of numbers, coordinate your eyes, hands and brain.</Text>
          </View>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                backgroundColor: "white",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

export default App;
