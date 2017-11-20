'use strict'

import {Record} from 'immutable'

/*
PLAYING: 1,
PAUSED: 2,
LOADING: 3,
STOPPED: 4,
 */

var PlayerRecord = Record({
  "playerStatus": "",
  "playPosition": "",
  "playCount": "",
  "duration": "",
  "progress": "",
  "mediaUrl": "",
  "rss": "",
  "title": "",
  "episodeTitle": "",
  "description": "",
  "imageUrl": "",
  "episodeKey": ""
});

class PlayerInitial extends PlayerRecord {
  isDone() {
    return this.get('done');
  }
}
export default PlayerInitial
