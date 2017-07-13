import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseQueryString } from '../utils/common.js';
import './style.css';

class C extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'reader/detail',
      payload: parseQueryString(this.props.location.search),
    });
  }
  render() {
    const { detail = {} } = this.props;
    return (<div>
      <h1>{detail.gallery_title}</h1>
      {
        detail.picInfo && detail.picInfo.map(({ url, add_intro: info }) => (<div>
          <img src={url} alt="" />
          <h3>{info}</h3>
        </div>))
      }
    </div>);
  }
}

function mapStateToProps(state) {
  const { detail } = state.reader;
  return {
    detail,
  };
}

export default connect(mapStateToProps)(C);

