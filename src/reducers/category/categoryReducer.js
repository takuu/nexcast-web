const {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,

} = require('../../lib/constants').default
import Immutable from 'immutable';

import categoryInitial from './categoryInitialState'

const CategoryList = Immutable.List;

const initialState = new CategoryList();


const mergeEntities = (state, newCategoryList) =>
  state.merge(newCategoryList.map((category) => new categoryInitial(category)));

export default (state = initialState, action) => {
  switch(action.type) {

    // Handles some UI actions
    case GET_CATEGORIES_REQUEST:
    case GET_CATEGORIES_FAILURE:
    // Received pocasts data from an external API
    case GET_CATEGORIES_SUCCESS:
      if (!action.payload || !action.payload.length) { return state }

      return mergeEntities(state, Immutable.fromJS(action.payload));
  }
  return state;
}
