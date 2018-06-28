import React, { Component } from "react";
import { StyleSheet, View, Button, SafeAreaView, Text, FlatList } from "react-native";
import { getUserEvents, deleteEvent } from "../api/events.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: []
    };
  }

  handleTabFocus = () => {
    const callback = userEvents => {
      this.setState({ userEvents });
    };
    getUserEvents(callback);
  }

  handleDelete = (eventId) => {
    deleteEvent(eventId);
    this.props.navigation.navigate("Map");
  }

  componentDidMount() {
    const willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        console.log("profile loaded");
        this.handleTabFocus();
      }
    );
  }

  componentWillReceiveProps() {
    console.log("rerender here");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.userEvents}
          renderItem={({item}) => <Button title={item.title} onPress={() => this.handleDelete(item.id)} />}
          keyExtractor={(item, index) => item.title}
        />
        <Button style={styles.button} onPress={this.props.onLogout} title="Log Out" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  button: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default Profile;
