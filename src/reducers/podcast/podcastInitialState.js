'use strict'

import {Record} from 'immutable'

var ShowDetailRecord = Record({


  "id": "",
  "podcast_id": "",
  "title": "",
  "feed_url": "",
  "image_url": "",
  "release_date": "",
  "language": "",
  "artist_name": "",
  "keywords": "",
  "owner_email": "",
  "owner_name": "",
  "long_desc": "",

});

class ShowDetailInitial extends ShowDetailRecord {
  isDone() {
    return this.get('done');
  }

}
export default ShowDetailInitial
