import React from 'react';
import { Text, View, Dimensions, LayoutAnimation } from 'react-native';
import * as styled from './styled';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      mode: props.mode,
      showDescription: !!props.showDescription
    };

    this._toggleDescription = this._toggleDescription.bind(this);
  }

  _getModeIcon(mode, height, iconPadding) {
    switch (mode) {
      case 'WALKING':
        return <Icon name='directions-walk' size={height - iconPadding} color='#adadad'/>;
      case 'TRANSIT':
        return <Icon name='directions-transit' size={height - iconPadding} color='#adadad'/>;
      case 'BICYCLING':
        return <Icon name='directions-bike' size={height - iconPadding} color='#adadad'/>;
      case 'DRIVING':
        return <Icon name='directions-car' size={height - iconPadding} color='#adadad'/>;
    }
  }

  _toggleDescription() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState(previousState => {
      return {
        ...previousState,
        showDescription: !previousState.showDescription
      }
    });
  }

  render() {
    const { mode } = this.props;
    const { showDescription } = this.state;
    const height = 50;
    const { width } = Dimensions.get('window');
    const iconPadding = 20;

    const description = (
      <styled.Information height={height} width={width}>
        <Text>Description</Text>
      </styled.Information>
    );

    return (
      <View>
        <styled.Headline
          height={height}
          showDescription={showDescription}
          onPress={this._toggleDescription}>
          <styled.Mode height={height}>
            {this._getModeIcon(mode, height, iconPadding)}
          </styled.Mode>
          <styled.Summary>
            <Text>Summary, Distance and Duration</Text>
          </styled.Summary>
        </styled.Headline>
        { showDescription && description }
      </View>
    );
  }
}

export default ListItem;