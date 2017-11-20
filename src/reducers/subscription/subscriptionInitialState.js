'use strict'

import {Record} from 'immutable'

// TODO: This is the exact same as showDetailInitialState

var SubscriptionRecord = Record({
  "description": "",
  "description_clean": "",
  "duration": "",
  "episode_key": "",
  "image_location": "",
  "keywords": "",
  "media_location": "",
  "pub_date": "",
  "rss": "",
  "title": "",

});

class SubscriptionInitial extends SubscriptionRecord {
  isDone() {
    return this.get('done');
  }
}
export default SubscriptionInitial
