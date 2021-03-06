import React from 'react';
import {connect} from 'react-redux';
import {Text, View, FlatList, LayoutAnimation, ActivityIndicator} from 'react-native';
import {PROVIDER_GOOGLE} from 'react-native-maps';

import Autocomplete from '../../components/Autocomplete';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import PolylineMap from '../../components/PolylineMap';
import * as styled from './styled';

import {setLocation, setGroup, fetchDirectionsRequest, selectDirectionRequest} from './actions';
import {DESTINATION, START_LOCATION} from './constants';
import TextInput from "../../components/TextInput";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDirectionsList: false,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      }
    };

    this.dispatch = props.dispatch.bind(this);
    this._setLocation = this._setLocation.bind(this);
    this._setStartLocation = this._setStartLocation.bind(this);
    this._setDestination = this._setDestination.bind(this);
    this._getDirections = this._getDirections.bind(this);
    this._renderDirectionsOrSpinner = this._renderDirectionsOrSpinner.bind(this);
    this._onRegionChange = this._onRegionChange.bind(this);
  }

  componentDidMount() {
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
  }

  _onRegionChange(region) {
    this.setState({...this.state, region});
  }

  _setLocation(data, details, location) {
    if (details) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      const {lat, lng} = details.geometry.location;
      this.dispatch(setLocation(lat, lng, location));
    }
  }

  _setStartLocation(data, details = null) {
    this._setLocation(data, details, START_LOCATION);
  }

  _setDestination(data, details = null) {
    this._setLocation(data, details, DESTINATION);
  }

  _getDirections() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.dispatch(fetchDirectionsRequest());
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  _renderDirectionsOrSpinner() {
    const {directions} = this.props;

    if (false && directions.data) {
      return (
        <styled.PastContainer>
          <styled.List
            data={directions.data['directions'] || []}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={({item}) =>
              <ListItem data={item} mode={item._mode} onSelect={() => {
                this.dispatch(selectDirectionRequest(directions.data['recommendation_id'], item._id));
              }}/>}
          />
        </styled.PastContainer>
      );
    }

    return (
      <styled.SpinnerView>
        <PolylineMap directions={(directions.data && directions.data.directions) || []} onDirectionSelect={(id) => {
          this.dispatch(selectDirectionRequest(directions.data['recommendation_id'], id, this.props.group));
        }}/>
      </styled.SpinnerView>
    );
  }

  render() {
    const {start, destination, directions} = this.props;
    const active = start.lat && start.lng && destination.lat && destination.lng;

    return (
      <styled.Container>
        <styled.FormContainer>
          <styled.StartRow>
            <Autocomplete placeholder='Start Location' onPress={this._setStartLocation}/>
          </styled.StartRow>
          <styled.Row>
            <Autocomplete placeholder='Destination' onPress={this._setDestination}/>
          </styled.Row>
          <styled.Row>
            <TextInput placeholder='Add companions' onChangeText={(val) => {this.dispatch(setGroup(val))}}/>
          </styled.Row>
          <styled.DestRow>
            <Button
              title={!directions.loading ? 'Get Directions' : <ActivityIndicator color="white"/>}
              onPress={!directions.loading ? this._getDirections : undefined}
              disabled={!active}
              mode={!active ? 'disabled' : 'primary'}/>
          </styled.DestRow>
        </styled.FormContainer>
        {this._renderDirectionsOrSpinner()}
      </styled.Container>
    );
  }
}

const mapStateToProps = (state) => {
  const app = state.get('app');
  return {
    start: app.get('start').toJS(),
    group: app.get('group'),
    destination: app.get('destination').toJS(),
    directions: app.get('directions').toJS(),
    currentLocation: app.get('current').toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
