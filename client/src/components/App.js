import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Landing from "./Landing";
import UserProfile from "./UserProfile";
import Dashboard from "./Dashboard";
import NewSurvey from "./Survey/NewSurvey.js";

//actions
import { fetchUser } from "../actions/index";
import NewNewsletter from "./Newsletter/NewNewsletter";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Header />

        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/panel" component={Dashboard} />
            <Route exact path="/panel/anket/yeni" component={NewSurvey} />
            <Route exact path="/panel/newsletter/yeni" component={NewNewsletter} />
            <Route exact path="/profile" component={UserProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
