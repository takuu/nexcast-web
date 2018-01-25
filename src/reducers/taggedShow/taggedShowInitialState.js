'use strict'

import {Record} from 'immutable'

var TaggedShowRecord = Record({
  "id": "",
  "podcast_sid": "",
  "users_sid": "",
  "title": "",
  "image_url": "",
  "published_date": "",
  "language": "",
  "author": "",
  "artist_name": "",
  "keywords": "",
  "email": "",
  "owner_name": "",
  "pc_desc": "",
  "feed_url": "",
  "description": "",
  "created_at": "",
  "updated_at": ""

});

class TaggedShowInitial extends TaggedShowRecord {
  isDone() {
    return this.get('done');
  }

}
export default TaggedShowInitial
