import { SUBMIT_SURVEY } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SUBMIT_SURVEY:
      return action.payload || false;

    default:
      return state;
  }
};
