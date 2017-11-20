'use strict';

const {
  HAS_TAG_REQUEST,
  HAS_TAG_SUCCESS,
  HAS_TAG_FAILURE,


  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE

} = require('../../lib/constants').default;

const BackendFactory = require('../../lib/BackendFactory').default;
import {appAuthToken} from '../../lib/AppAuthToken'
import _ from 'lodash';
import * as helpers from '../../lib/helpers'
import CONFIG from '../../lib/config'

export function updateEpisodesHasTagsSuccess(json) {
  return {
    type: UPDATE_EPISODES_HAS_TAGS_SUCCESS,
    payload: json
  }
}
export function hasTagRequest () {
  return {
    type: HAS_TAG_REQUEST
  }
}
export function hasTagSuccess (json) {
  return {
    type: HAS_TAG_SUCCESS,
    payload: json
  }
}
export function hasTagFailure (err) {
  return {
    type: HAS_TAG_FAILURE,
    payload: err
  }
}

export function getTagsRequest () {
  return {
    type: GET_TAGS_REQUEST
  }
}
export function getTagsSuccess (json) {
  return {
    type: GET_TAGS_SUCCESS,
    payload: json
  }
}
export function getTagsFailure (err) {
  return {
    type: GET_TAGS_FAILURE,
    payload: err
  }
}

export function hasTagOld (url) {
  return dispatch => {
    dispatch(hasTagRequest())
    return BackendFactory().hasTag(url)
      .then((json) => {
        dispatch(hasTagSuccess(json))

        // GOTO SOME PAGE
        // Actions.somePage()
      })
      .catch((error) => {
        dispatch(hasTagFailure(error))
      })
  }
}



export function getTaggedShowsOld () {
  return dispatch => {
    dispatch(getTaggedShowsRequest())
    return BackendFactory().getTaggedShows()
      .then((json) => {
        dispatch(getTaggedShowsSuccess(json))

        // GOTO SOME PAGE
        // Actions.somePage()
      })
      .catch((error) => {
        dispatch(getTaggedShowsFailure(error))
      })
  }
}


export function hasTag (rss) {
  return dispatch => {
    dispatch(hasTagRequest());

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(hasTagFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).hasTag(rss);
    }).then((data) => {
      let json = (typeof data === 'string') ? JSON.parse(data): data;
      let result = _.map(json.tags, (tag) => {
        return {
          seconds: helpers.hmsToSecondsOnly(tag.time),
          ...tag
        }
      });
      (json.status == 1) ?
        dispatch(hasTagSuccess(_.sortBy(result, 'seconds'))) :
        dispatch(hasTagFailure({error: 'err: server status 0'}));

      // GOTO SOME PAGE
      // Actions.somePage()
    })
      .catch((error) => {
        dispatch(hasTagFailure(error))
      })
  }
}

export function getTags (id) {
  return dispatch => {
    dispatch(getTagsRequest());

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getTagsFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).getTags(id)
    }).then((data) => {
      let json = (typeof data === 'string') ? JSON.parse(data): data;
      var result = _.map(json.result, (tag) => {
        tag.formattedContent = helpers.linkify((tag.content || '').replace(/(\r\n|\n|\r)/gm, "<br>"));
        var embeddedLink = (tag.youtube_location || '').replace('youtu.be', 'www.youtube.com/embed');
        embeddedLink = (embeddedLink || '').replace('www.youtube.com/watch?v=', 'www.youtube.com/embed/');
        embeddedLink = embeddedLink.replace('https', 'http');
        // tag.video_location = $sce.trustAsResourceUrl(embeddedLink);
        tag.video_location = embeddedLink;

        return tag;
      });

      (json.status == 1) ?
        dispatch(getTagsSuccess(_.sortBy(result, 'seconds'))) :
        dispatch(getTagsFailure({error: 'err: server status 0'}));

      // GOTO SOME PAGE
      // Actions.somePage()
    })
      .catch((error) => {
      console.log('getTags catch: ', error);
        dispatch(getTagsFailure(error))
      })
  }
}

