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

    this._logout = this._logout.bind(this);
  }

  _logout() {
    this.props.dispatchLogout();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.navigation.navigate('AuthLoading');
  }

  render() {
    const {show, username} = this.props;
    return (
      <styled.Container>
        <Header title='Settings'/>
        <styled.SettingsContainer bounces={false}>

          <styled.Row style={{marginBottom: 10}}>
            <Icon name='user-circle-o' size={25}/>
            <TextInput value={username} style={{marginLeft: 15}}/>
          </styled.Row>

          <styled.Row>
            <Text>Show bike directions</Text>
            <Switch value={show.bike} onValueChange={this.props.dispatchToggleBike}/>
          </styled.Row>
          <styled.Row>
            <Text>Bicycle Timings</Text>
          </styled.Row>
          <styled.Row style={{marginBottom: 10}}>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
          </styled.Row>

          <styled.Row>
            <Text>Show driving directions</Text>
            <Switch value={show.car} onValueChange={this.props.dispatchToggleCar}/>
          </styled.Row>
          <styled.Row>
            <Text>Drive Timings</Text>
          </styled.Row>
          <styled.Row style={{marginBottom: 10}}>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
          </styled.Row>

          <styled.Row>
            <Text>Show walking directions</Text>
            <Switch value={show.walk} onValueChange={this.props.dispatchToggleWalk}/>
          </styled.Row>
          <styled.Row>
            <Text>Walk Timings</Text>
          </styled.Row>
          <styled.Row style={{marginBottom: 10}}>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
          </styled.Row>

          <styled.Row>
            <Text>Show transit directions</Text>
            <Switch value={show.transit} onValueChange={this.props.dispatchToggleTransit}/>
          </styled.Row>
          <styled.Row>
            <Text>Transit Timings</Text>
          </styled.Row>
          <styled.Row style={{marginBottom: 10}}>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
          </styled.Row>

          <styled.Row style={{marginBottom: 20, backgroundColor: '#f7f7f7'}}>
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
    username: settings.get('username'),
    show: settings.get('show').toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchToggleWalk: () => dispatch(toggleWalk()),
    dispatchToggleBike: () => dispatch(toggleBike()),
    dispatchToggleCar: () => dispatch(toggleCar()),
    dispatchToggleTransit: () => dispatch(toggleTransit()),
    dispatchLogout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
