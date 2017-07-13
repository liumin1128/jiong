import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Waypoint from 'react-waypoint';
import './style.css';
// import './Index.less';

// import styles from './Index.less';

class C extends Component {
  constructor(props) {
    super(props);
    this.more = () => {
      this.props.dispatch({
        type: 'reader/loadmore',
        payload: {
          page: (this.props.list.length / 30) + 1,
        },
      });
    };
  }
  render() {
    const { list } = this.props;
    return (<div>
      <ul>
        {list.map(({ img, text, id }) => (<li>
          <Link to={`detail?id=${id}`}>
            <img src={img} alt="" />
            <p>{text}</p>
          </Link>
        </li>))}
        <Waypoint
          onEnter={this.more}
          onLeave={() => {
            console.log('onLeave');
          }}
        >
          <span>加载中</span>
        </Waypoint>
      </ul>

    </div>);
  }
}

function mapStateToProps(state) {
  const { title } = state.common;
  const { list } = state.reader;
  return {
    title,
    list,
  };
}

export default connect(mapStateToProps)(C);

