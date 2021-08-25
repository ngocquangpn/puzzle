import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity } from "react-native";
import * as propTypes from "prop-types";

class ModalComponent extends Component {
  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.showModalComponent}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bạn chậm quá :(</Text>
              <Text style={styles.modalText}>Có cần thêm thời gian không ?</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    alignItems: "center",
                    backgroundColor: "#DDDDDD",
                    padding: 10,
                    borderRadius: 50,
                    marginRight: 5,
                  }}
                  onPress={this.props.handleCancel}
                >
                  <Text>Không</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    borderRadius: 50,
                    alignItems: "center",
                    backgroundColor: "#2288dd",
                    padding: 10,
                  }}
                  onPress={this.props.handleAccept}
                >
                  <Text style={{ color: "white" }}>Có</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

ModalComponent.propTypes = {
  showModalComponent: propTypes.string.isRequired,
  handleAccept: propTypes.func.isRequired,
  handleCancel: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});


export default ModalComponent;
