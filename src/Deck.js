import React from "react";
import {
  Animated,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";

class Deck extends React.Component {
  constructor(props) {
    super(props);

    this.addCard = this.addCard.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.state = {
      opacity: new Animated.Value(0),
      decks: [],
      deck: this.props.navigation.state.params.deck
    };
  }

  componentDidMount() {
    const { opacity } = this.state;

    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start();

    this.getDecks();

    DeviceEventEmitter.addListener("AddedNewCard", () => {
      this.getDecks();
    });
  }

  async getDecks() {
    let decks = await AsyncStorage.getItem("Decks");

    let { deck } = this.props.navigation.state.params;

    if (decks !== undefined) {
      decks = JSON.parse(decks).filter(d => d.id === deck.id);

      if (decks.length > 0) {
        deck = decks[0];
        this.setState({ deck });
      }
    }

    this.setState({ decks: decks });
  }

  addCard() {
    this.props.navigation.navigate("NewCard", {
      deck: this.props.navigation.state.params.deck
    });
  }

  startQuiz() {
    this.props.navigation.navigate("Quiz", {
      deck: this.props.navigation.state.params.deck
    });
  }

  render() {
    let { opacity, deck } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Animated.Text
          style={{ textAlign: "center", fontSize: 30, margin: 20, opacity }}
        >
          {deck.name}
        </Animated.Text>
        <Animated.Text
          style={{ textAlign: "center", fontSize: 20, margin: 10, opacity }}
        >
          {`${deck.cards.length} cards`}
        </Animated.Text>

        <TouchableOpacity
          style={styles.button}
          onPress={this.addCard}
          accessibilityLabel="Add Quiz"
        >
          <Text
            style={{ flex: 1, fontSize: 22, marginTop: 8, textAlign: "center" }}
          >
            Add Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.startQuiz}
          accessibilityLabel="Start Quiz"
        >
          <Text
            style={{ flex: 1, fontSize: 22, marginTop: 8, textAlign: "center" }}
          >
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    height: 48,
    borderColor: "blue",
    backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 10
  }
});

export default Deck;
