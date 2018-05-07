import React from 'react';
import {connect} from 'react-redux';
import {Text, Switch, View, LayoutAnimation} from 'react-native';
import * as styled from './styled';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import {toggleBike, toggleCar, toggleTransit, toggleWalk, logout} from './actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changed: false
    };

    this._logout = this._logout.bind(this);
  }

  _logout() {
    this.props.dispatchLogout();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.navigation.navigate('AuthLoading');
  }

  _renderModeSettings(mode, ctrl, onValueChange) {
    return (
      <View>
        <styled.Row dark={!ctrl.show} style={!ctrl.show && {marginBottom: 10}}>
          <Text>{`Show ${mode} directions`}</Text>
          <Switch value={ctrl.show} onValueChange={onValueChange}/>
        </styled.Row>
        {ctrl.show &&
          <View>
            <styled.Row>
              <Text style={{flex: 2}}>Distance (km)</Text>
              <TextInput value={`${Math.ceil(ctrl.distance[0] / 1000)}`} keyboardType='numeric'/>
              <TextInput value={`${Math.ceil(ctrl.distance[1] / 1000)}`} keyboardType='numeric'/>
            </styled.Row>
            <styled.Row style={{marginBottom: 10}}>
              <Text style={{flex: 2}}>Duration (mins)</Text>
              <TextInput value={`${Math.ceil(ctrl.duration[0] / 60)}`} keyboardType='numeric'/>
              <TextInput value={`${Math.ceil(ctrl.duration[1] / 60)}`} keyboardType='numeric'/>
            </styled.Row>
          </View>
        }
      </View>
    );
  }

  render() {
    return (
      <styled.Container>
        <Header title='Settings'/>
        <styled.SettingsContainer bounces={false}>

          <styled.Row style={{marginBottom: 10}}>
            <Icon name='user-circle-o' size={25}/>
            <Text style={{flex: 1, marginLeft: 15}}>{this.props.username}</Text>
          </styled.Row>

          {this._renderModeSettings('bike', this.props.bike, this.props.dispatchToggleBike)}
          {this._renderModeSettings('driving', this.props.car, this.props.dispatchToggleCar)}
          {this._renderModeSettings('walking', this.props.walk, this.props.dispatchToggleWalk)}
          {this._renderModeSettings('transit', this.props.transit, this.props.dispatchToggleTransit)}

          {this.state.changed &&
            <styled.Row style={{backgroundColor: '#eaeaea'}}>
              <Button mode='primary' title='Reset' onPress={() => {}} style={{marginRight: 10}}/>
              <Button mode='success' title='Save' onPress={() => {}} style={{marginLeft: 10}}/>
            </styled.Row>
          }

          <styled.Row style={{marginBottom: 20, backgroundColor: '#eaeaea'}}>
            <Button mode='danger' title='Logout' onPress={this._logout}/>
          </styled.Row>

        </styled.SettingsContainer>
      </styled.Container>
    );
  }
}

const mapStateToProps = (state) => {
  const settings = state.get('settings');
  return {
    username: 'Testing Account',
    walk: settings.get('WALKING').toJS(),
    bike: settings.get('BICYCLING').toJS(),
    car: settings.get('DRIVING').toJS(),
    transit: settings.get('TRANSIT').toJS()
  };
};

function mapDispatchToProps(dispatch) {
  const animate = (action) => {
    return () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(action())
    };
  };

  return {
    dispatchToggleWalk: animate(toggleWalk),
    dispatchToggleBike: animate(toggleBike),
    dispatchToggleCar: animate(toggleCar),
    dispatchToggleTransit: animate(toggleTransit),
    dispatchLogout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
