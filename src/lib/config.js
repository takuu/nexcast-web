module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    hapiRemote: true,
    hapiLocal: false,
    parseRemote: false,
    parseLocal: false
  },
  baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:1337',
  baseAPI: process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:1337/api/v1',
  HAPI: {
    local: {
      url: 'http://localhost:5000'
    },
    remote: {
      // url: 'https://snowflakeserver-bartonhammond.rhcloud.com/'
      // url: 'http://dev.nexcast.co/mapi/v1'
      // url: 'http://www.nexcast.co/mapi/v1'
      url: 'http://localhost:1337/v1/api'
    }
  },
  PARSE: {
    appId: 'snowflake',                              // match APP_ID in parse-server's index.js
    local: {
      url: 'http://localhost:1337/parse'             // match SERVER_URL in parse-server's index.js
    },
    remote: {
      url: 'http://snowflake-parse.herokuapp.com/parse'   // match SERVER_URL in parse-server's index.js
    }
  }
}
