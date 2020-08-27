import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { connect } from "react-redux";

import Header from "./Header";
import Landing from "./Landing";
import UserProfile from "./UserProfile";
import Dashboard from "./Dashboard";
import NewSurvey from "./Survey/NewSurvey.js";
import NewNewsletter from "./Newsletter/NewNewsletter";
import UpdateSurvey from "./Survey/UpdateSurvey/UpdateSurvey";

//actions
import { fetchUser } from "../actions/index";

export const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={history}>
        <Header />

        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/panel" component={Dashboard} />
            <Route exact path="/panel/anket/yeni" component={NewSurvey} />
            <Route exact path="/panel/anket/guncelle" component={UpdateSurvey} />
            <Route exact path="/panel/newsletter/yeni" component={NewNewsletter} />
            <Route exact path="/profile" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, { fetchUser })(App);
