import React from "react";
import { View } from "react-native";
import { NavigationActions } from "react-navigation";
import * as Notifications from "./utils/Notifications";
import Results from "./Results";
import Questions from "./Questions";

class Quiz extends React.Component {
  state = { cardIndex: 0, showQuestion: true, points: 0 };

  nextQuestion(correct) {
    this.setState(state => ({
      cardIndex: state.cardIndex + 1,
      showQuestion: true,
      points: state.points + (correct ? 1 : 0)
    }));
  }

  restartQuiz() {
    this.setState({ cardIndex: 0, showQuestion: true, points: 0 });
  }

  toggleShowQuestion() {
    this.setState(state => ({ showQuestion: !state.showQuestion }));
  }

  render() {
    const { deck } = this.props.navigation.state.params;
    const { cardIndex, showQuestion } = this.state;

    let question = "";
    let answer = "";

    try {
      question = deck.cards[this.state.cardIndex].question;
      answer = deck.cards[this.state.cardIndex].answer;
    } catch (e) {}

    if (cardIndex < deck.cards.length) {
      Notifications.clearLocalNotification();

      let date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(20);
      date.setMinutes(0);
      Notifications.setLocalNotification(date);
    }

    return (
      <View style={{ flex: 1, margin: 8 }}>
        {this.state.cardIndex < deck.cards.length ? (
          <Questions
            answer={answer}
            index={cardIndex}
            nextQuestion={correct => this.nextQuestion(correct)}
            question={question}
            showQuestion={showQuestion}
            toggleShowQuestion={() => this.toggleShowQuestion()}
            total={deck.cards.length}
          />
        ) : (
          <Results
            back={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
            deck={deck}
            points={this.state.points}
            restartQuiz={() => this.restartQuiz()}
          />
        )}
      </View>
    );
  }
}

export default Quiz;
