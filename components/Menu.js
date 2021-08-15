import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const btnLevels = [
  { id: 1, title: "3x3", size: 2 },
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
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.level}>Level</Text>
        <BtnLevels btnLevels={btnLevels} _navigation={this.props.navigation} />
      </View>
    );
  }
}

function BtnLevels(props) {
  return (
    <View>
      <ScrollView>
        {props.btnLevels.map((btnLevel) => {
          return (
            <View style={styles.btnLevel} key={btnLevel.id}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props._navigation.navigate("Puzzle", { size: btnLevel.size })}>
                <Text style={styles.btnLevelText}>{btnLevel.title}</Text>
              </TouchableOpacity>
            </View>);
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f28d35",
    flex: 1,
  },

  level: {
    textAlign: "center",
    color: "white",
    fontSize: 28,
    padding: 14,
    fontFamily: "fantasy",
  },
  btnLevel: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5,
    width: 140,
    height: 42,
  },
  btnLevelText: {
    fontFamily: "fantasy",
    fontSize: 16,
  },
});
