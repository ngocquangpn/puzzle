import React from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import Board from "./Board";
import LinearTimer from "./LinearTimer/LinearTimer";

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    let size = this.props.route.params.size;
    let board = new Array(size * size);
    for (let i = 0; i < size * size; ++i) board[i] = i;
    board = this.shuffle(board);
    this.state = {
      board: board,
      size: size,
      timerCount: "00:00:00",
      visible: false,
    };
  }

  updateBoard = (board) => {
    // this.setState({ visible: true });
    this.setState({ board: board });
    const _board = board.slice().sort((cur, next) => {
      return cur - next;
    });
    if ((_board.join("") === board.join("")) || ((_board.filter((item) => {
      return item != 0;
    }).join("") === board.filter((item) => {
      return item != 0;
    }).join("") && board[0] == 1 && board[Math.pow(this.state.size, 2) - 1] == 0))) {
      this.setState({ visible: true });
    }
  };

  shuffle(o) {
    const temp = o.slice();
    for (var j, x, i = temp.length; i; j = Math.floor(Math.random() * i), x = temp[--i], temp[i] = temp[j], temp[j] = x) ;
    return temp;
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.navigation.push("Menu");
  };

  handleGoNextLevel = () => {
    if (this.state.size != 11) {
      this.props.navigation.push("Puzzle", { size: this.state.size + 1 });
      this.setState({ visible: false });
    } else {
      this.props.navigation.push("Menu");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearTimer
          min={0.5}
          onTimeElapsed={() => {
            console.log("Timer Finished!");
          }}
        />
        <View style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}>
          {this.state && this.state.board ?
            <Board
              size={this.state.size}
              board={this.state.board} updateBoard={this.updateBoard}
            />
            : null
          }
        </View>
        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Congratulations</Dialog.Title>
          <Dialog.Description>
            Do you want to next level?
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="OK" onPress={this.handleGoNextLevel} />
        </Dialog.Container>
      </View>
    );
  }
}
