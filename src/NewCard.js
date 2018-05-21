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
import { NavigationActions } from "react-navigation";

class NewCard extends React.Component {
  static navigationOptions = {
    tabBarLabel: "New Card"
  };

  constructor(props) {
    super(props);
    this.state = { question: "", answer: "" };
    this.onPressAddCard = this.onPressAddCard.bind(this);
  }

  async onPressAddCard() {
    Keyboard.dismiss();

    const { deck } = this.props.navigation.state.params;
    const { question, answer } = this.state;

    if (this.state.question.trim() === "" || this.state.answer.trim() === "") {
      alert("Please provide a question and an answer.");
    } else {
      try {
        let decks = await AsyncStorage.getItem("Decks");

        if (decks === null) {
          alert("Error, no decks found.");
        } else {
          decks = JSON.parse(decks).filter(d => d.id !== deck.id);

          if (!deck) {
            alert("Error, invalid deck found.");
          }

          let cards = deck.cards;
          cards.push({ question, answer });
          deck.cards = cards;

          decks.push(deck);

          await AsyncStorage.setItem("Decks", JSON.stringify(decks));

          this.props.navigation.dispatch(NavigationActions.back());

          DeviceEventEmitter.emit("AddedNewCard");
        }
      } catch (error) {
        alert(`Could not create deck ${error}`);
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 8 }}>
        <Text style={styles.text}>What is the question of your new card?</Text>

        <TextInput
          value={this.state.question}
          onSubmitEditing={Keyboard.dismiss}
          style={{
            marginTop: 8,
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={question => this.setState({ question })}
        />

        <Text style={styles.text}>What is the answer of your new card?</Text>

        <TextInput
          value={this.state.answer}
          onSubmitEditing={Keyboard.dismiss}
          style={{
            marginTop: 8,
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={answer => this.setState({ answer })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressAddCard}
          color="gray"
          accessibilityLabel="Add new card button"
        >
          <Text
            style={{ flex: 1, fontSize: 22, marginTop: 8, textAlign: "center" }}
          >
            Add card
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 2 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    height: 48,
    borderColor: "blue",
    backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 10
  },
  text: {
    fontSize: 32,
    marginTop: 8,
    textAlign: "center"
  }
});

export default NewCard;
