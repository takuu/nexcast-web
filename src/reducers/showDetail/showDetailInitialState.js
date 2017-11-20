'use strict'

import {Record} from 'immutable'

var ShowDetailRecord = Record({

  "id": "",
  "title": "",
  "rss": "",
  "imageurl": "",
  "published_date": "",
  "language": "",
  "author": "",
  "keywords": "",
  "owner_email": "",
  "owner_name": "",
  "long_desc": "",
  "episodes": []

});

class ShowDetailInitial extends ShowDetailRecord {
  isDone() {
    return this.get('done');
  }

}
export default ShowDetailInitial
