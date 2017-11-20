
if (process.env.BROWSER) require('../styles/global.css');

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header/Header';
import { Link, Route, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Footer from '../components/Footer/Footer';
// import CustomModal from '../components/core/CustomModal/CustomModal';

@connect(state => {
    const {auth, router, user, ui} = state;

    return {auth, router, user, ui};
  },
  {

  })
class App extends React.Component {


  render () {
    const { auth, dispatch, params, user, ui, route } = this.props;

    return (
      <div>
        {/*        <Header
          loggedIn={!!auth.token}
          router={this.context.router}
          params={params}
          dispatch={dispatch}
          user={user}
          auth={auth}
          ui={ui}
          {...bindActionCreators({ logout }, dispatch)}
        />*/}
        <div style={{minHeight: '800px'}}>

          {renderRoutes(route.routes)}
        </div>

        <Footer {...this.props.children} />



      </div>
    );
  }
}

App.propTypes = {
  error: PropTypes.string,
  user: PropTypes.object,
  ui: PropTypes.object
};

App.defaultProps = {
  // route: {},
};

export default App;
