import React from 'react';
import {
  BrowserRouter as Router,
  Route,   // 这是基本的路由块
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Index from './routes/Index';
import Detail from './routes/Detail';
import store from './store';

const RouterConfig = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/detail" exact component={Detail} />
      </div>
    </Router>
  </Provider>
);

export default RouterConfig;
