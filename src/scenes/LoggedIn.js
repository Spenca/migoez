import React, { Component } from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Map from "./Map.js";
import Profile from "./Profile.js";
import AddEvent from "./AddEvent/AddEvent";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  handleTabFocus = () => {

  }

  render() {
    const TabNavigation = TabNavigator(
      {
        Home: {
          screen: Map
        },
        AddEvent: {
          screen: AddEvent
        },
        Profile: {
          screen: props => <Profile {...props} onLogout={this.props.onLogout} />
        }
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarOnPress: ({ scene, jumpToIndex }) => {
            // console.log('onPress:', navigation.state.params);
            console.log('onPress:', scene.route);
            if (scene.focused) {
              console.log('yeet');
            }
            jumpToIndex(scene.index);
          },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: "bottom",
        animationEnabled: true,
        swipeEnabled: true
      }
    );

    return <TabNavigation />;
  }
}

export default LoggedIn;
