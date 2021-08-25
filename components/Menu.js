import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import background from "../assets/images/background.png";
import logoApp from "../assets/images/logoGame.png";

const { width } = Dimensions.get("window");
const boxCount = 4;
const boxWidth = width / boxCount;


const btnLevels = [
  { id: 1, title: "3x3", size: 3 },
  { id: 2, title: "4x4", size: 4 },
  { id: 3, title: "5x5", size: 5 },
  { id: 4, title: "6x6", size: 6 },
  { id: 5, title: "7x7", size: 7 },
  { id: 6, title: "8x8", size: 8 },
  { id: 7, title: "9x9", size: 9 },
  { id: 8, title: "10x10", size: 10 },
  { id: 9, title: "11x11", size: 11 },
];

export default class Menu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} resizeMode="stretch" style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                style={{ height: 100, width: 150, resizeMode: "center" }}
                source={logoApp}
              />
            </View>
            <BtnLevels btnLevels={btnLevels} _navigation={this.props.navigation} />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

function BtnLevels(props) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.level}>Level</Text>
      <FlatList
        style={{ backgroundColor: "#fdf4eb", borderRadius: 8, padding: 5 }}
        data={btnLevels}
        renderItem={({ item }) => (
          <View style={styles.btnLevel} key={item.id}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props._navigation.push("Puzzle", { size: item.size })}>
              <Text style={styles.btnLevelText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  level: {
    textAlign: "center",
    color: "white",
    fontSize: 28,
    fontFamily: "BalooBhai2-ExtraBold",
  },
  btnLevel: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#fad9ae",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    elevation: 3,
    borderRadius: 5,
    width: boxWidth,
    height: 50,
  },
  btnLevelText: {
    fontFamily: "BalooBhai2-ExtraBold",
    fontSize: 16,
    color: "#866001",
  },
});
