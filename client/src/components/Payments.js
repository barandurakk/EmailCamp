import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handlePaymentToken } from "../actions/index";
import styles from "./Payments.css";

class Payments extends Component {
  render() {
    return (
      <div className={styles.buttonWrapper}>
        <StripeCheckout
          name="EmailCamp Ödeme"
          description="5 mail gönderebilmek için 5 USD."
          amount={500} //5 dollars
          token={(token) => {
            this.props.handlePaymentToken(token, 500);
          }}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn blue-grey darken-3">5 Kredi Yükle</button>
        </StripeCheckout>

        <StripeCheckout
          name="EmailCamp Ödeme"
          description="25 mail gönderebilmek için 25 USD."
          amount={2500} //25 dollars
          token={(token) => {
            this.props.handlePaymentToken(token, 2500);
          }}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn blue-grey darken-3">25 Kredi Yükle</button>
        </StripeCheckout>

        <StripeCheckout
          name="EmailCamp Ödeme"
          description="50 mail gönderebilmek için 50 USD."
          amount={5000} //50 dollars
          token={(token) => {
            this.props.handlePaymentToken(token, 5000);
          }}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn blue-grey darken-3">50 Kredi Yükle</button>
        </StripeCheckout>
      </div>
    );
  }
}

export default connect(null, { handlePaymentToken })(Payments);
