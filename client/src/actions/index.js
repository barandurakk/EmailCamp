import axios from "axios";

import {
  FETCH_USER,
  SUBMIT_SURVEY,
  FETCH_SURVEYS,
  SELECT_SURVEY,
  SUBMIT_NEWSLETTER,
  FETCH_NEWSLETTERS,
  SELECT_NEWSLETTER,
  DELETE_SURVEY,
  DELETE_NEWSLETTER,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/currentUser");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handlePaymentToken = (token, amount) => async (dispatch) => {
  const paymentInfos = {
    token: token,
    amount: amount,
  };
  const res = await axios.post("/api/stripe", paymentInfos);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const uploadImage = (file) => async (dispatch) => {
  console.log("action file: ", file);

  const res = await axios.post("/api/uploadImg", file);

  dispatch({ type: FETCH_USER, payload: res.data });
};

//--SURVEYS

export const submitSurvey = (values, history) => async (dispatch) => {
  const formValues = {
    ...values,
    drafted: false,
  };

  const res = await axios.post("/api/surveys", formValues);

  history.push("/panel");
  dispatch({ type: SUBMIT_SURVEY, payload: res.data });
};

export const draftSurvey = (values, history) => async (dispatch) => {
  const formValues = {
    ...values,
    drafted: true,
  };
  const res = await axios.post("/api/surveys", formValues);

  history.push("/panel");
  dispatch({ type: SUBMIT_SURVEY, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchASurvey = (id) => (dispatch) => {
  dispatch({ type: SELECT_SURVEY, payload: id }); //spesific fetch route is exist but for now we do it in reducers
};

//delete survey
export const deleteASurvey = (id) => async (dispatch) => {
  const res = await axios.get(`/api/surveys/${id}/delete`);

  dispatch({ type: DELETE_SURVEY, payload: id });
};

//---NEWSLETTER

export const submitNewsletter = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/newsletter", values);

  history.push("/panel");
  dispatch({ type: SUBMIT_NEWSLETTER, payload: res.data });
};

export const fetchNewsletters = () => async (dispatch) => {
  const res = await axios.get("/api/newsletter");

  dispatch({ type: FETCH_NEWSLETTERS, payload: res.data });
};

export const fetchANewsletter = (id) => (dispatch) => {
  dispatch({ type: SELECT_NEWSLETTER, payload: id });
};

export const deleteANewsletter = (id) => async (dispatch) => {
  const res = await axios.get(`/api/newsletter/${id}/delete`);
  dispatch({ type: DELETE_NEWSLETTER, payload: id });
};
