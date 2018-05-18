import React, { Component } from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Map from "./Map.js";
import Profile from "./Profile.js";
import AddEvent from "./AddEvent/AddEvent";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
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
          screen: props => {
            return <Profile onLogout={this.props.onLogout} />;
          }
        }
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: () => {
            const { routeName } = navigation.state;
            switch (routeName) {
              case "Home":
                break;
              case "AddEvent":
                break;
              case "Profile":
                break;
            }
          },
          tabBarOnPress: ({ scene, jumpToIndex }) => {
            console.log('onPress:', scene.route);
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
