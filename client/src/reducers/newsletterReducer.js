import { FETCH_NEWSLETTERS, SELECT_NEWSLETTER, DELETE_NEWSLETTER } from "../actions/types";

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

    case DELETE_NEWSLETTER:
      let newsletterList = state.newsletterList.filter(
        (newsletter) => newsletter._id !== action.payload
      );

      return {
        newsletter: {},
        newsletterList,
      };

    default:
      return state;
  }
};
