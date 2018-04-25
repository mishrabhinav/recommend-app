import React from 'react';
import {connect} from 'react-redux';
import {Text, Switch, View} from 'react-native';
import * as styled from './styled';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import TextInput from "../../components/TextInput";

import {setUsername, toggleBike, toggleCar, toggleTransit, toggleWalk} from "./actions";

class Settings extends React.Component {
  render() {
    const {dispatch, show, username} = this.props;
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
            <Switch value={show.bike} onValueChange={() => dispatch(toggleBike())}/>
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
            <Switch value={show.car} onValueChange={() => dispatch(toggleCar())}/>
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
            <Switch value={show.walk} onValueChange={() => dispatch(toggleWalk())}/>
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
            <Switch value={show.transit} onValueChange={() => dispatch(toggleTransit())}/>
          </styled.Row>
          <styled.Row>
            <Text>Transit Timings</Text>
          </styled.Row>
          <styled.Row style={{marginBottom: 10}}>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
            <TextInput value={username} keyboardType='numeric'/>
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
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
