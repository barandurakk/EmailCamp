import axios from "axios";
import { FETCH_USER, SUBMIT_SURVEY, FETCH_SURVEYS, SELECT_SURVEY } from "./types";

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

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/panel");
  dispatch({ type: SUBMIT_SURVEY, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchASurvey = (id) => (dispatch) => {
  dispatch({ type: SELECT_SURVEY, payload: id });
};
