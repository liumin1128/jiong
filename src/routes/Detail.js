import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { parseQueryString } from '../utils/common.js';
import styles from './Detail.less';

class C extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'reader/detail',
      payload: parseQueryString(this.props.location.search),
    });
  }
  render() {
    const { detail = {} } = this.props;
    return (<div className={styles.box}>
      <h1>{detail.gallery_title}</h1>
      {
        detail.picInfo && detail.picInfo.map(({
          url,
          add_intro: info,
          file_height: height,
        }) => (<div className={styles.item}>
          <LazyLoad height={200} offset={300}>
            <img src={url} alt="" />
          </LazyLoad>
          <p>{height}{info}</p>
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

