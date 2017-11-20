'use strict'

import {Record} from 'immutable'

var SearchRecord = Record({

  "wrapperType": "",
  "kind": "",
  "artistId": "",
  "collectionId": "",
  "trackId": "",
  "artistName": "",
  "collectionName": "",
  "trackName": "",
  "collectionCensoredName": "",
  "trackCensoredName": "",
  "artistViewUrl": "",
  "collectionViewUrl": "",
  "feedUrl": "",
  "trackViewUrl": "",
  "artworkUrl30": "",
  "artworkUrl60": "",
  "artworkUrl100": "",
  "collectionPrice": "",
  "trackPrice": "",
  "trackRentalPrice": "",
  "collectionHdPrice": "",
  "trackHdPrice": "",
  "trackHdRentalPrice": "",
  "releaseDate": "",
  "collectionExplicitness": "",
  "trackExplicitness": "",
  "trackCount": "",
  "country": "",
  "currency": "",
  "primaryGenreName": "",
  "artworkUrl600": "",
  "genreIds": [],
  "genres": []
});

class SearchInitial extends SearchRecord {
  isDone() {
    return this.get('done');
  }

}
export default SearchInitial

