import React from "react";
import {
  AsyncStorage,
  DeviceEventEmitter,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import uuidv4 from "uuid/v4";

class NewDeck extends React.Component {
  static navigationOptions = {
    tabBarLabel: "New Deck"
  };

  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.onPressAddDeck = this.onPressAddDeck.bind(this);
  }

  async onPressAddDeck() {
    Keyboard.dismiss();

    if (this.state.text.trim() === "") {
      alert("Text can't be empty");
    } else {
      try {
        let decks = await AsyncStorage.getItem("Decks");

        if (decks === null) {
          decks = [];
        } else {
          decks = JSON.parse(decks);
        }

        decks.push({ id: uuidv4(), name: this.state.text, cards: [] });

        await AsyncStorage.setItem("Decks", JSON.stringify(decks));

        this.setState({ text: "" });

        this.props.navigation.navigate("Deck");

        DeviceEventEmitter.emit("AddedNewDeck");
      } catch (error) {
        alert(`Could not create deck ${error}`);
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 8 }}>
        <View style={{ flex: 1 }} />

        <Text style={{ fontSize: 32, marginTop: 8, textAlign: "center" }}>
          What is the title of your new deck?
        </Text>

        <View style={{ flex: 1 }} />

        <TextInput
          value={this.state.text}
          onSubmitEditing={Keyboard.dismiss}
          style={{
            marginTop: 8,
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={text => this.setState({ text })}
        />

        <TouchableOpacity
          style={styles.container}
          onPress={this.onPressAddDeck}
          color="gray"
          accessibilityLabel="Button to add a new deck"
        >
          <Text
            style={{ flex: 1, fontSize: 30, marginTop: 8, textAlign: "center" }}
          >
            Add deck
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 2 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 48,
    borderColor: "black",
    backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 10
  }
});

export default NewDeck;
