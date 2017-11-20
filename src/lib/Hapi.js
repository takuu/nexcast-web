/**
 * # Hapi.js
 *
 * This class interfaces with Hapi.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 * Singleton module see: https://k94n.com/es6-modules-single-instance-pattern
 */
'use strict'

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from './config'
import _ from 'underscore'
import Backend from './Backend'

let token = '';

export class Hapi extends Backend {
  /**
   * ## Hapi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize (token) {
    if (!_.isNull(token) && _.isUndefined(token)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token

    this.API_BASE_URL = CONFIG.backend.hapiLocal
          ? CONFIG.HAPI.local.url
          : CONFIG.HAPI.remote.url
  }
  /**
   * ### signup
   *
   * @param data object
   *
   * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/register',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw res.json
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * username: "barton"
   *
   */
  async login (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/login',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */
  async logout () {
    return await this._fetch({
      method: 'POST',
      url: '/account/logout',
      body: {}
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
            (res.status === 400 && res.code === 209)) {
          return {}
        } else {
          throw new Error({code: res.statusCode, error: res.message})
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/resetPasswordRequest',
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {}
        } else {
          var res = JSON.parse(response._bodyInit)
          throw (res)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile () {
    return await this._fetch({
      method: 'GET',
      url: '/account/profile/me'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async getPopular() {
    console.log('Hapi.getPopular()');
    // url: API_URL + 'popular?category=All&max=200&order_type=asc'
    return await this._fetch({
      // method: 'POST',
      method: 'GET',
      // url: '/popular?category=All&max=200&order_type=asc'
      url: '/toppodcasts/popular?category_id=1303'
    })
      .then((res) => {
        // console.log('getPopular (GET) raw results: ', res)
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async getCategories() {
    // url: API_URL + 'categorylist'
    return await this._fetch({
      method: 'GET',
      // url: '/categorylist'
      url: '/genres/all'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async getCategory(id) {
    // url: API_URL + 'popular?category='+id+'&max=200&order_type=asc'
    return await this._fetch({
      method: 'GET',
      url: `/toppodcasts/popular?category_id=${id}`
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async getEpisodes(rss, limit) {
    // url: API_URL + 'getEpisodesByRss?rss=' + rss;
    console.log('Hapi getEpisodes params (rss): ', rss);
    const url = (limit) ? `/episodes/episodeByRSS?rss=${rss}&limit=${limit}`: `/episodes/episodeByRSS?rss=${rss}`;
    return await this._fetch({
      // method: 'POST',
      // url: `/getEpisodesByRss?rss=${rss}`
      method: 'GET',
      url
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async getPodcast(rss) {
    console.log('Hapi getPodcast params (rss): ', rss);
    return await this._fetch({
      // method: 'POST',
      // url: `/getEpisodesByRss?rss=${rss}`
      method: 'GET',
      url: `/podcasts/getByRSS?rss=${rss}`
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async hasTag(url) {
    // url: API_URL + 'hastag?rssurl=' + url
    return await this._fetch({
      method: 'GET',
      // method: 'POST',
      // url: `/hastag?rssurl=${url}`
      // url: `/episodes/hastags?podcast_id=788236947`
      url: `/episodes/hastagsByRSS?rss=${url}`
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async registerThisDevice(id) {
    // url: API_URL + 'register_device/' + id
    console.log('Hapi: registerThisDevice: ', id)

    let result;

    if(token) {
      console.log('================ALREADY HAVE TOKEN!!! USING STORED TOKEN==================');
      result = { token: token, status: 1};
    } else {
      result =  await this._fetch({
        method: 'GET',
        url: `/register_device/${id}`
      })
        .then((res) => {
          console.log('registerDevice: (GET) res: ', res);
          if ((res.status === 200 || res.status === 201)) {
            token = res.json.token;
            return res.json
          } else {
            throw (res.json)
          }
        })
        .catch((error) => {
          throw (error)
        })
    }







    return result;
  }
  async searchShows(key) {
    // url: API_URL + 'search/' + key
    return await this._fetch({
      method: 'GET',
      // url: `/search/${key}`
      url: `/podcasts/search?term=${key}`
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async subscribeRSS(rss) {
    // url: API_URL + 'subscribe?rssurl=' + rss
    return await this._fetch({
      method: 'GET',
      url: `/subscribe?rssurl=${rss}`
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async getTaggedShows() {
    // url: API_URL + 'taggedShow'
    return await this._fetch({
      method: 'GET',
      // url: '/taggedShows'
      url: '/podcasts/hastags'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  async getTags(id) {
    // url: API_URL + 'tags/' + id
    return await this._fetch({
      method: 'GET',
      // url: `/tags/${id}`
      url: `/cards/all?episode_id=${id}`
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  async updateProfile (userId, data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/profile/' + userId,
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch (opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {
      }
    }

    if (this._sessionToken) {
      // reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken
      reqOpts.headers['X-Token'] = this._sessionToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }

    let url = this.API_BASE_URL + opts.url
    let res = {}

    let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json()
      .then((json) => {
        res.json = json
        return res
      })
  }
}
// The singleton variable
export let hapi = new Hapi()
