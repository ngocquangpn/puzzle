import React from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import Board from "./Board";
import LinearTimer from "./LinearTimer/LinearTimer";
import background from "../assets/images/background.png";
import admob, { AdEventType, MaxAdContentRating } from "@react-native-firebase/admob";
import { BannerAd, TestIds, RewardedAd, RewardedAdEventType } from "@react-native-firebase/admob";
import { BannerAdSize } from "@react-native-firebase/admob";
import CountDown from "./LinearTimer/Timer";
import Modal from "react-native-modal";
import { Divider } from "react-native-elements";
import * as NetInfo from "@react-native-community/netinfo";

const rewardedAd = RewardedAd.createForAdRequest("ca-app-pub-8870641261471435/7452593077", {
  requestNonPersonalizedAdsOnly: true,
});

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
      visibleNextLevel: false,
      showModal: false,
      addTime: false,
      time: this.linearTimer(size),
      rewardedAdLoaded: false,
    };
  }

  componentDidMount() {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });

    const eventListener = rewardedAd.onAdEvent(async (type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        this.setState({
          rewardedAd: true,
        });
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log("rewarded with ", reward);
      }
      if (type === AdEventType.OPENED) {
        this.setState({
          rewardedAd: false,
        });
      }
      if (type === AdEventType.CLOSED) {
        this.setState({
          rewardedAd: true,
        });
        rewardedAd.load();
      }
    });

    // Start loading the rewarded ad straight away
    if (rewardedAd.loaded) {
      this.setState({
        rewardedAd: true,
      });
    } else {
      rewardedAd.load();

    }

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
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
      this.setState({ visibleNextLevel: false });
    } else {
      this.props.navigation.popToTop("Menu");
    }
  };

  handleAccept = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
    NetInfo.fetch().then(connectedInfo => {
      if (connectedInfo.isConnected) {
        rewardedAd.show()
          .then(() => {
            this.setState({
              addTime: false,
            });
          })
          .catch((e) => console.log(e));
      } else {
        this.setState({
          addTime: false,
        });
      }
    });

  };

  linearTimer = (size) => {
    switch (size) {
      case 3:
        return 4;
      case 4:
        return 5;
      case 5:
        return 6;
      case 6:
        return 7;
      case 7:
        return 9;
      case 8:
        return 12;
      case 9:
        return 14;
      case 10:
        return 16;
      case 11:
        return 18;
      default:
        return 5;
    }
  };

  render() {
    return (
      <ImageBackground source={background} resizeMode="stretch" style={{ flex: 1 }}>
        {
          (this.state.addTime === false && this.state.showModal === false) ?
            <View style={{ height: 30 }}>
              <LinearTimer
                min={this.state.time}
              />
              <View style={{ marginTop: 30 }}>
                <CountDown
                  until={this.state.time * 60}
                  size={15}
                  onFinish={() => {
                    this.setState({
                      showModal: true,
                    });
                  }}
                  timeToShow={["M", "S"]}
                />
              </View>

            </View>
            :
            <View style={{ height: 30 }} />
        }

        <View style={{
          flex: 1,
          justifyContent: "center",
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
        <BannerAd
          unitId="ca-app-pub-8870641261471435/1719660916"
          size={BannerAdSize.ADAPTIVE_BANNER}
        />
        <Modal isVisible={this.state.showModal}>
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
              <Text style={{ fontSize: 16, fontFamily: "BalooBhai2-ExtraBold" }}>Notification</Text>
            </View>
            <Divider orientation="horizontal" width={5} />
            <View style={{ width: "100%", marginTop: 15, alignItems: "center" }}>
              <Text style={{ fontFamily: "BalooBhai2-ExtraBold", fontSize:16 }}>Time Over!</Text>
              <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>Do you want to watch a short video to add time ?</Text>
            </View>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", marginTop: 15 }}>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: "white",
                }}
                onPress={this.handleCancel}
              >
                <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  marginLeft: 5,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: "white",
                }}
                onPress={this.handleAccept}
              >
                <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.visibleNextLevel}>
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
              <Text style={{ fontSize: 16, fontFamily: "BalooBhai2-ExtraBold" }}>Congratulations</Text>
            </View>
            <Divider orientation="horizontal" width={5} />
            <View style={{ width: "100%", marginTop: 15, alignItems: "center" }}>
              <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>Do you want to next level?</Text>
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
                onPress={this.handleCancel}
              >
                <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  marginLeft: 5,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: "white",
                }}
                onPress={this.handleGoNextLevel}
              >
                <Text style={{ fontFamily: "BalooBhai2-ExtraBold" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}
