import { FETCH_SURVEYS, SELECT_SURVEY, DELETE_SURVEY } from "../actions/types";

const initialState = {
  surveyList: [],
  survey: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return {
        ...state,
        surveyList: action.payload,
      };

    case SELECT_SURVEY:
      let survey = state.surveyList.filter((survey) => survey._id === action.payload);

      return {
        ...state,
        survey: survey,
      };

    case DELETE_SURVEY:
      let surveys = state.surveyList.filter((survey) => survey._id !== action.payload);

      return {
        survey: {},
        surveyList: surveys,
      };

    default:
      return state;
  }
};
