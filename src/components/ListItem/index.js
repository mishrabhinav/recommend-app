import React from 'react';
import { Text, View, Dimensions, LayoutAnimation } from 'react-native';
import * as styled from './styled';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';

const modeIconLookup = {
  'WALKING': 'walk',
  'TRANSIT': 'transit',
  'BICYCLING': 'bike',
  'DRIVING': 'car'
};

const renderBold = (node, index, siblings, parent, defaultRenderer) => {
  if (node.name === 'b') {
    return <Text key={index} style={{color: '#818181'}}>{defaultRenderer(node.children, node)}</Text>;
  }
};

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

  _toggleDescription() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState(previousState => {
      return {
        ...previousState,
        showDescription: !previousState.showDescription
      }
    });
  }

  _renderDirections() {
    const { mode, data } = this.props;

    return data['legs'].map((leg, idxLeg) => {
      return leg['steps'].map((step, idxStep) => {
        return (
          <HTMLView
            key={`${mode}-${idxLeg}-${idxStep}`}
            value={`<p>${step['html_instructions']}</p>`}
            // style={{flexDirection: 'row', margin: 25}}
            renderNode={renderBold} />);
      });
    });
  }

  render() {
    const height = 50, iconPadding = 20;
    const { mode } = this.props;
    const { showDescription } = this.state;
    const { width } = Dimensions.get('window');

    const description = showDescription && (
      <styled.Information width={width}>
        {this._renderDirections()}
      </styled.Information>
    );

    return (
      <View>
        <styled.Headline
          height={height}
          showDescription={showDescription}
          activeOpacity={0.7}
          onPress={this._toggleDescription}>
          <styled.Mode height={height}>
            <Icon name={`directions-${modeIconLookup[mode]}`} size={height - iconPadding} color='#adadad'/>;
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