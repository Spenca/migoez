import React, { Component } from "react";
import { StyleSheet, View, Button, SafeAreaView, Text, FlatList } from "react-native";
import { getUserEvents, deleteEvent } from "../api/events.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: []
    };
    // this.props.navigation.setParams({
    //   onTabFocus: this.handleTabFocus
    // });
  }

  handleTabFocus = () => {
    const callback = userEvents => {
      this.setState({ userEvents });
    };
    getUserEvents(callback);
  }

  // onTabFocus = () => {
  
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.handleTabFocus();
  // }

  componentDidMount() {
    // this.handleTabFocus();
    // console.log(this.props);
    // this.props.navigation.setParams({
    //   onTabFocus: this.handleTabFocus
    // });
  }

  render() {
    // if (typeof this.props.navigation.state.params === 'undefined') {
    //   return null;
    // }
    // this.handleTabFocus();
    // console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.userEvents}
          renderItem={({item}) => <Button title={item.title} onPress={() => deleteEvent(item.id)} />}
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
