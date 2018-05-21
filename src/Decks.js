import React from "react";
import {
  AsyncStorage,
  DeviceEventEmitter,
  FlatList,
  Text,
  View
} from "react-native";
import Delegate from "./Delegate";

class Decks extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Decks"
  };

  constructor(props) {
    super(props);
    this.state = { decks: [] };
  }

  componentDidMount() {
    this.getDecks();

    DeviceEventEmitter.addListener("AddedNewDeck", () => {
      this.getDecks();
    });

    DeviceEventEmitter.addListener("AddedNewCard", () => {
      this.getDecks();
    });
  }

  async getDecks() {
    let decks = await AsyncStorage.getItem("Decks");
    if (decks !== undefined) {
      decks = JSON.parse(decks);
    }
    this.setState({ decks: decks });
  }

  render() {
    let { decks } = this.state;

    if (!decks || decks.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <Text
            style={{ flex: 1, textAlign: "center", fontSize: 30, margin: 20 }}
          >
            Please add a deck.
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={decks}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <Delegate
                key={item.id}
                navigate={this.props.navigation.navigate}
                deck={item}
              />
            )}
          />
        </View>
      );
    }
  }
}

export default Decks;
