import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';

import * as styled from './styled';

const modeIconLookup = {
  'WALKING': 'walk',
  'TRANSIT': 'transit',
  'BICYCLING': 'bike',
  'DRIVING': 'car'
};

const ICON_SIZE = 30;

const renderBold = (node, index, siblings, parent, defaultRenderer) => {
  if (node.name === 'b') {
    return <Text key={index} style={{color: '#818181'}}>{defaultRenderer(node.children, node)}</Text>;
  }
};

const transitIconSummary = direction => {
  return direction['legs'].map((leg, idxLeg) => {
    return leg['steps'].map((step, idxStep) =>{
      return (
        <Icon
          key={`${idxLeg}-${idxStep}`}
          name={`directions-${modeIconLookup[step.travel_mode]}`}
          size={ICON_SIZE}
          color='#008fff'/>
      );
    });
  });
};

class DirectionCard extends React.Component {
  _renderDirections() {
    const {direction} = this.props;

    return direction['legs'].map((leg, idxLeg) => {
      return leg['steps'].map((step, idxStep) => {
        return (
          <HTMLView
            key={`${direction._mode}-${idxLeg}-${idxStep}`}
            value={`<p>${step['html_instructions']}</p>`}
            renderNode={renderBold}/>
        );
      });
    });
  }

  render() {
    const {width, height, direction, onDirectionSelect} = this.props;

    const summary = direction.summary || transitIconSummary(direction) || 'Summary';

    return (
      <styled.Card height={height} width={width}>
        <styled.TextContent>
          <styled.CardHeader height={40} onPress={() => onDirectionSelect(direction._id)}>
            {typeof summary === 'string' &&
            <Icon
              name={`directions-${modeIconLookup[direction._mode.toUpperCase()]}`}
              size={ICON_SIZE}
              color='#008fff'/>
            }
            <styled.CardTitle numberOfLines={1}>{summary}</styled.CardTitle>
          </styled.CardHeader>
          <styled.CardBody>
            <styled.CardDescription>
              <styled.CardText>
                {`${direction.legs[0].duration.text} | ${direction.legs[0].distance.text} | ${direction._priority}`}
                </styled.CardText>
              {/*{direction._priority}*/}
            </styled.CardDescription>
          </styled.CardBody>
        </styled.TextContent>
      </styled.Card>
    );
  }
}

export default DirectionCard;