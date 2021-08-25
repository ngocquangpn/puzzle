import React from "react";
import { View, ImageBackground, Button } from "react-native";
import Dialog from "react-native-dialog";
import Board from "./Board";
import LinearTimer from "./LinearTimer/LinearTimer";
import ModalComponent from "./Modal/Modal";
import background from "../assets/images/background.png";

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
      showModal: false,
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
    this.props.navigation.popToTop("Menu");
  };

  handleGoNextLevel = () => {
    if (this.state.size != 11) {
      this.props.navigation.push("Puzzle", { size: this.state.size + 1 });
      this.setState({ visible: false });
    } else {
      this.props.navigation.popToTop("Menu");
    }
  };

  handleAccept = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  linearTimer = (time) => {
    switch (time) {
      case 3:
        return 1;
      case 4:
        return 3;
      case 5:
        return 4;
      case 6:
        return 5;
      case 7:
        return 6;
      case 8:
        return 7;
      case 9:
        return 8;
      case 10:
        return 9;
      case 11:
        return 10;
      default:
        return 2;
    }
  };

  render() {
    return (
      <ImageBackground source={background} resizeMode="stretch" style={{ flex: 1 }}>
        <LinearTimer
          min={this.linearTimer(this.state.size)}
          onTimeElapsed={() => {
            this.setState({
              showModal: true,
            });
          }}
        />
        <ModalComponent
          showModalComponent={this.state.showModal}
          handleCancel={this.handleCancel}
          handleAccept={this.handleAccept}
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
      </ImageBackground>
    );
  }
}
