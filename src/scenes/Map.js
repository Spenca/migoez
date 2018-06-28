import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { MapView, Location, Permissions } from "expo";
import { getAllEvents } from "../api/events.js";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      location: null
    };
    this._sub = 0
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission is not granted");
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  handleTabFocus = () => {
    const callback = markers => {
      this.setState({ markers });
    };
    getAllEvents(callback);
    this.getLocationAsync();
  }

  componentDidMount() {  
    const willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.handleTabFocus();
      }
    );
  }

  render() {
    return this.state.location === null ? null : (
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={{
                latitude: marker.coords.lat,
                longitude: marker.coords.lng
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  map: {
    flex: 1
  }
});

export default Map;
