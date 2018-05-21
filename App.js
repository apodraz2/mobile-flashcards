import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { StyleSheet, Text, View, Platform } from "react-native";
import Decks from "./src/Decks";
import NewDeck from "./src/NewDeck";
import Deck from "./src/Deck";
import NewCard from "./src/NewCard";
import Quiz from "./src/Quiz";
import * as Notifications from "./src/utils/Notifications";

const MainScreen =
  Platform.OS === "ios"
    ? createBottomTabNavigator({
        Decks: {
          screen: Decks
        },
        NewDeck: {
          screen: NewDeck
        }
      })
    : createMaterialTopTabNavigator({
        Decks: {
          screen: Decks
        },
        NewDeck: {
          screen: NewDeck
        }
      });

const QuizApp = createStackNavigator(
  {
    Home: {
      screen: MainScreen,
      navigationOptions: {
        title: "Home",
        header: false
      }
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: {
        title: "New Card"
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: "Quiz"
      }
    },
    Deck: {
      screen: Deck,
      navigationOptions: {
        title: "Deck"
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  componentDidMount() {
    let date = new Date();
    date.setHours(20);
    date.setMinutes(0);

    Notifications.setLocalNotification(date);
  }

  render() {
    return <QuizApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
