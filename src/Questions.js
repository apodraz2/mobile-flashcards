import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

class Questions extends React.Component {
  render() {
    const {
      question,
      answer,
      showQuestion,
      toggleShowQuestion,
      index,
      total,
      nextQuestion
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>{`${index + 1}/${total}`}</Text>

        <Text style={{ fontSize: 32, marginTop: 8, textAlign: "center" }}>
          {showQuestion ? question : answer}
        </Text>

        <TouchableOpacity
          style={{ margin: 8, height: 40 }}
          onPress={toggleShowQuestion}
        >
          <Text style={styles.textLink}>
            {showQuestion ? "Answer" : "Question"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCorrect}
          onPress={() => nextQuestion(true)}
          accessibilityLabel="Mark question as correct"
        >
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonIncorrect}
          onPress={() => nextQuestion(false)}
          accessibilityLabel="Mark question as incorrect"
        >
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "left"
  },
  textLink: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    color: "#3498db"
  },
  textResults: {
    fontSize: 32,
    textAlign: "center",
    color: "#3498db"
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
  },
  buttonCorrect: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    height: 48,
    borderColor: "blue",
    backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 10
  },
  buttonIncorrect: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    height: 48,
    borderColor: "blue",
    backgroundColor: "gray",
    borderWidth: 1,
    borderRadius: 10
  },
  buttonText: {
    flex: 1,
    fontSize: 22,
    marginTop: 8,
    textAlign: "center",
    color: "black"
  }
});

Questions.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  showQuestion: PropTypes.bool.isRequired,
  toggleShowQuestion: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired
};

export default Questions;
