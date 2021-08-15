import React from "react";
import { Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from "react-native";

const deviceWidh = Dimensions.get("window").width;
export default class Board extends React.Component {

  componentWillMount() {
    this.findClickables(this.props.board, this.props.size);
  }

  componentWillReceiveProps(nextProps) {
    this.findClickables(nextProps.board, nextProps.size);
  }

  shouldComponentUpdate = (nextProps) => {
    const curr = this.props.board.join("");
    const next = nextProps.board.join("");

    return curr != next;
  };

  findClickables = (board, size) => {
    const zeroIndex = board.indexOf(0);
    const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
    const possibleTopIdx = zeroCoordinate.row > 0 ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size) : null;
    const possiblRightIdx = zeroCoordinate.column < size ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size) : null;
    const possiblBottomIdx = zeroCoordinate.row < size ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size) : null;
    const possibleLeftIdx = zeroCoordinate.column > 0 ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size) : null;

    this.setState({
      zero: zeroIndex,
      possibleTopIdx: possibleTopIdx,
      possiblRightIdx: possiblRightIdx,
      possiblBottomIdx: possiblBottomIdx,
      possibleLeftIdx: possibleLeftIdx,
    });
  };

  cellClickHandler = (index) => {
    if (index === this.state.possibleTopIdx || index === this.state.possiblRightIdx ||
      index === this.state.possiblBottomIdx || index === this.state.possibleLeftIdx) this.nextBoard(index);
  };

  nextBoard = (index) => {
    const board = this.props.board.slice();
    const temp = board[index];
    board[index] = board[this.state.zero];
    board[this.state.zero] = temp;
    this.props.updateBoard(board);
  };

  getIndexFromCoord = (row, col, size) => {
    return (size * (row - 1)) + col - 1;
  };

  getCoordFromIndex = (idx, size) => {
    return { row: Math.floor(idx / size) + 1, column: (idx % size) + 1 };
  };

  render () {
    return (
      <View style={styles.board}>
        <FlatList data={this.props.board} numColumns={this.props.size}
                  renderItem={({ item, index }) => (
                    <Cell value={item} size={this.props.size} onPress={this.cellClickHandler.bind(this, index)} />)}
                  keyExtractor={item => item} />
      </View>
    );
  }
}

function Cell(props) {
  return (
    <TouchableOpacity style={cellStyle(props.size, props.value)} onPress={props.onPress} key={props.index}>
      <Text style={{ textAlign: "center", fontSize: (deviceWidh - props.size) / props.size / 2 }}>
        {props.value != 0 ? props.value : ""}
      </Text>
    </TouchableOpacity>
  );
}

function cellStyle(size, value) {
  return {
    width: (deviceWidh - size * 4) / size,
    height: (deviceWidh - size * 4) / size,
    margin: 2,
    borderRadius: 5,
    backgroundColor: value != 0 ? "#f28d35" : "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "white",
  },
});
