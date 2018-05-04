import React, {Component} from 'react';
import ReactLoading from 'react-loading';

export default class Loader extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <ReactLoading type={'spokes'} color={'black'} height={50} width={50} />
      </div>
    );
  }
}