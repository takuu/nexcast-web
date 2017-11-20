'use strict'

import {Record} from 'immutable'

var PodcastRecord = Record({

  "ranking_sid": "",
  "title": "",
  "rss_feed_id": "",
  "feed_url": "",
  "description": "",
  "image_url": "",
  "ranking": "",
  "genre_id": "",
  "genre_name": "",
  "created_at": "",
  "updated_at": "",
  "tag": ""

});

class PodcastInitial extends PodcastRecord {
  isDone() {
    return this.get('done');
  }

  getLabel() {
    return this.get('label') || 'New Task';
  }
}
export default PodcastInitial
