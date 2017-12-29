import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Html extends Component {
  render() {
    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nexcast</title>

        <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />


        <link rel="stylesheet" href="/css/app.css" />
        <link rel="stylesheet" href="/css/main.css" />

      </head>
        <body>
          <div id="app"></div>
          <script id="initial-data" type="text/plain" data-json={this.props.initialData}></script>
        </body>
      </html>
    );
  }
}

Html.propTypes = {};
Html.defaultProps = {};

export default Html;
