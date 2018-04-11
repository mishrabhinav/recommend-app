import React from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList } from 'react-native';

import Autocomplete from '../../components/Autocomplete';
import ListItem from '../../components/ListItem';
import * as styled from './styled';

import { setLocation } from './actions';
import { DESTINATION, START_LOCATION } from './constants';
import { listData } from './data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch.bind(this);
    this._setStartLocation = this._setStartLocation.bind(this);
    this._setDestination = this._setDestination.bind(this);
  }
  componentDidMount() {
    // this.props.navigation.navigate('DrawerOpen');
  }

  _setStartLocation(data, details=null) {
    if (details) {
      const { lat, lng } = details.geometry.location;
      this.dispatch(setLocation(lat, lng, START_LOCATION));
    }
  }

  _setDestination(data, details=null) {
    if (details) {
      const { lat, lng } = details.geometry.location;
      this.dispatch(setLocation(lat, lng, DESTINATION));
    }
  }

  render() {
    return (
      <styled.Container>
        <styled.FormContainer>
          <styled.StartRow>
            <Autocomplete placeholder='Start Location' onPress={this._setStartLocation} />
          </styled.StartRow>
          <styled.DestRow>
            <Autocomplete placeholder='Destination' onPress={this._setDestination} />
          </styled.DestRow>
        </styled.FormContainer>
        <styled.PastContainer>
          <styled.List
            data={listData}
            renderItem={({ item }) => <ListItem data={item} mode={item._mode} keyExtractor={item => item._id}/>}
          />
        </styled.PastContainer>
      </styled.Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    st: state.toJS()
  };
};

function mapDispatchToProps (dispatch) {
  return {
      dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
