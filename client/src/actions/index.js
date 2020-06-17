import axios from "axios";
import { FETCH_USER, UPLOAD_IMAGE } from "./types";

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
