'use strict'

import {Record} from 'immutable'

var TagRecord = Record({

  "cards_sid": "",
  "podcast_sid": "",
  "podcast_key": "",
  "podcast_rssurl": "",
  "episode_key": "",
  "media_location": "",
  "time": "",
  "content": "",
  "button1_text": "",
  "button1_link": "",
  "image_location": "",
  "youtube_location": "",
  "status": "",
  "created_at": "",
  "updated_at": ""

});

class TagInitial extends TagRecord {
  isDone() {
    return this.get('done');
  }

}
export default TagInitial
