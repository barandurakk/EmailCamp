import { SUBMIT_SURVEY, SUBMIT_NEWSLETTER } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SUBMIT_SURVEY:
      return action.payload || false;
    case SUBMIT_NEWSLETTER:
      return action.payload || false;
    default:
      return state;
  }
};
