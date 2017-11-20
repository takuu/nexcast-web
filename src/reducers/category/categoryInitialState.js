'use strict'

import {Record} from 'immutable'

var CategoryRecord = Record({

  "genre_id": "",
  "genre_name": ""

});

class CategoryInitial extends CategoryRecord {
  isDone() {
    return this.get('done');
  }

}
export default CategoryInitial
