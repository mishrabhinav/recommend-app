import React from 'react';
import {connect} from 'react-redux';
import {Text, LayoutAnimation} from 'react-native';
import * as styled from './styled';

import Header from '../../components/Header';
import HistoryItem from "../../components/HistoryItem";

import {fetchHistoryRequest} from "./actions";

class History extends React.Component {
  constructor(props) {
    super(props);

    props.dispatch(fetchHistoryRequest());

    this._fetchHistory = this._fetchHistory.bind(this);
  }

  _fetchHistory() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.props.dispatch(fetchHistoryRequest());
  }

  render() {
    const {data, loading} = this.props;

    return (
      <styled.Container>
        <Header title='History'/>
        <styled.HistoryContainer>
          <styled.List
            data={data}
            refreshing={loading}
            onRefresh={this._fetchHistory}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              <HistoryItem data={item.directions} timestamp={item.timestamp}/>}
          />
        </styled.HistoryContainer>
      </styled.Container>
    );
  }
}

const mapStateToProps = (state) => {
  const history = state.get('history');
  return {
    data: history.get('data').toJS(),
    loading: history.get('loading')
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
