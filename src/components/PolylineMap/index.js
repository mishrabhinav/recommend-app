import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";

import MapView, {PROVIDER_GOOGLE, Polyline} from "react-native-maps";
import MBPolyline from '@mapbox/polyline';

import * as styled from './styled';
import DirectionCard from '../../components/DirectionCard';

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 20;

class PolylineMap extends Component {
  constructor(props) {
    super(props);

    this.animation = new Animated.Value(0);

    this.state = {
      currentIndex: 0,
      region: {
        latitude: 51.4987282,
        longitude: -0.1785683,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          ...this.state,
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
        });
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    this._onRegionChange = this._onRegionChange.bind(this);
    this._renderPolylines = this._renderPolylines.bind(this);
    this._polylineComponent = this._polylineComponent.bind(this);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.props.directions.length) {
        index = this.props.directions.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.state.currentIndex !== index) {
          this.setState({...this.state, currentIndex: index});
          const {bounds: {northeast, southwest}} = this.props.directions[index];
          const latitude = (northeast.lat + southwest.lat) / 2 - 0.01;
          const longitude = (northeast.lng + southwest.lng) / 2;
          this.map.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: northeast.lat - latitude + 0.02,
              longitudeDelta: northeast.lng - longitude + 0.01,
            },
            350
          );
        }
      }, 10);
    });
  }

  componentDidUpdate() {
    if (this.props.directions.length > 0 && this.state.currentIndex === 0) {
      const {bounds: {northeast, southwest}} = this.props.directions[0];
      const latitude = (northeast.lat + southwest.lat) / 2 - 0.01;
      const longitude = (northeast.lng + southwest.lng) / 2;
      this.map.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: northeast.lat - latitude + 0.02,
          longitudeDelta: northeast.lng - longitude + 0.01,
        },
        350
      );
    }
  }

  _onRegionChange(region) {
    this.setState({...this.state, region});
  }

  _polylineComponent(direction, index) {
    const {currentIndex} = this.state;
    const points = MBPolyline.decode(direction.overview_polyline.points);
    const coords = points.map((point) => {
      return {
        latitude: point[0],
        longitude: point[1]
      }
    });

    return (
      <View key={index}>
        <Polyline coordinates={coords} strokeWidth={currentIndex === index ? 6 : 0} strokeColor='#0064b3'/>
        <Polyline coordinates={coords} strokeWidth={3} strokeColor={currentIndex === index ? '#008fff' : '#c6c6c6'}/>
      </View>
    );
  }

  _renderPolylines() {
    const {currentIndex} = this.state;
    const {directions} = this.props;

    const polylines = directions.map((direction, index) => {
      if (currentIndex !== index) {
        return this._polylineComponent(direction, index);
      }
    });

    if (directions.length > 0) {
      polylines.push(this._polylineComponent(directions[currentIndex], currentIndex));
    }

    return polylines;
  }

  render() {
    return (
      <styled.Container>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          showsUserLocation={true}
          showsMyLocationButton={this.props.directions.length === 0}
          onRegionChange={this._onRegionChange}
        >
          {this._renderPolylines()}
        </MapView>
        <styled.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={width}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: this.animation},
                },
              },
            ],
            {useNativeDriver: true}
          )}
        >
          {this.props.directions.map((direction, index) => (
            <DirectionCard height={CARD_HEIGHT} width={CARD_WIDTH} direction={direction} key={index}/>
          ))}
        </styled.ScrollView>
      </styled.Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: '100%'
  }
});

export default PolylineMap;
