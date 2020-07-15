import { FETCH_NEWSLETTERS, SELECT_NEWSLETTER } from "../actions/types";

const initialState = {
  newsletterList: [],
  newsletter: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWSLETTERS:
      return {
        ...state,
        newsletterList: action.payload,
      };

    case SELECT_NEWSLETTER:
      return {
        ...state,
        newsletter: state.newsletterList.find((newsletter) => action.payload === newsletter._id),
      };

    default:
      return state;
  }
};
