import React, { Component, Fragment } from "react";
import "materialize-css";
import { Button, Modal } from "react-materialize";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../css/header.css";

import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    const { auth } = this.props;
    switch (auth) {
      case null:
        return <li>Loading</li>;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google </a>
          </li>
        );
      default:
        return (
          <Fragment>
            <li>
              <Modal
                actions={[
                  <Button flat modal="close" node="button" waves="green">
                    İptal
                  </Button>,
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header="Kredi Miktarını Seçiniz"
                id="Modal-0"
                open={false}
                options={{
                  dismissible: true,
                  endingTop: "10%",
                  inDuration: 250,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  opacity: 0.5,
                  outDuration: 250,
                  preventScrolling: true,
                  startingTop: "4%",
                }}
                trigger={<Button node="button">KREDİ YÜKLE</Button>}
              >
                <Payments />
              </Modal>
            </li>
            <li style={{ margin: "0 10px" }}>Kredi: {auth.credits}</li>
            <li>
              <a href="/profile">
                <img
                  src={auth.pictureUrl}
                  alt=""
                  className="circle responsive-img"
                  style={{ width: 50, verticalAlign: "middle", paddingRight: 10 }}
                />

                {auth.displayName}
              </a>
            </li>
            <li>
              <a href="/api/logout">Çıkış Yap</a>
            </li>
          </Fragment>
        );
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <Fragment>
        <nav>
          <div className="nav-wrapper blue-grey">
            <Link to={auth ? "/anketler" : "/"} className="left brand-logo">
              EmailCamp
            </Link>

            <ul id="nav-mobile" className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Header);
