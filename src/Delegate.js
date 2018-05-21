import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

class Delegate extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{ flex: 1, margin: 8 }}
        onPress={() => this.props.navigate("Deck", { deck: this.props.deck })}
      >
        <Text style={styles.largeText}>{this.props.deck.name}</Text>
        <Text style={styles.text}>{this.props.deck.cards.length} cards</Text>
      </TouchableOpacity>
    );
  }
}

Delegate.propTypes = {
  deck: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: "center"
  },
  largeText: {
    flex: 1,
    fontSize: 20,
    textAlign: "center"
  }
});

export default Delegate;
