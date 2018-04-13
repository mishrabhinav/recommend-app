import React from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, LayoutAnimation } from 'react-native';

import Autocomplete from '../../components/Autocomplete';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import * as styled from './styled';

import { setLocation, fetchDirectionsRequest } from './actions';
import { DESTINATION, START_LOCATION } from './constants';
import { listData } from './data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch.bind(this);
    this._setLocation = this._setLocation.bind(this);
    this._setStartLocation = this._setStartLocation.bind(this);
    this._setDestination = this._setDestination.bind(this);
    this._getDirections = this._getDirections.bind(this);
  }
  componentDidMount() {
    // this.props.navigation.navigate('DrawerOpen');
  }

  _setLocation(data, details, location) {
    if (details) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      const { lat, lng } = details.geometry.location;
      this.dispatch(setLocation(lat, lng, location));
    }
  }

  _setStartLocation(data, details=null) {
    this._setLocation(data, details, START_LOCATION);
  }

  _setDestination(data, details=null) {
    this._setLocation(data, details, DESTINATION);
  }

  _getDirections() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.dispatch(fetchDirectionsRequest());
  }

  render() {
    const { start, destination, directions } = this.props;
    const active = start.lat && start.lng && destination.lat && destination.lng;

    return (
      <styled.Container>
        <styled.FormContainer>
          <styled.StartRow>
            <Autocomplete placeholder='Start Location' onPress={this._setStartLocation} />
          </styled.StartRow>
          <styled.Row>
            <Autocomplete placeholder='Destination' onPress={this._setDestination} />
          </styled.Row>
          <styled.DestRow>
            <Button title='Get Directions' onPress={this._getDirections} active={active}/>
          </styled.DestRow>
        </styled.FormContainer>
        <styled.PastContainer>
          <styled.List
            // data={listData}
            data={(directions.data && directions.data['directions']) || []}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <ListItem data={item} mode={item._mode}/>}
          />
        </styled.PastContainer>
      </styled.Container>
    );
  }
}

const mapStateToProps = (state) => {
  const app = state.get('app');
  return {
    start: app.get('start').toJS(),
    destination: app.get('destination').toJS(),
    directions: app.get('directions').toJS(),
    currentLocation: app.get('current').toJS()
  };
};

function mapDispatchToProps (dispatch) {
  return {
      dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
