import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Landing from "./Landing";
import UserProfile from "./UserProfile";

//actions
import { fetchUser } from "../actions/index";

const Dashboard = () => <h2>Panel(Anketler)</h2>;
const SurveyNew = () => <h2>Yeni Anket</h2>;

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
            <Route exact path="/anketler" component={Dashboard} />
            <Route exact path="/anketler/yeni" component={SurveyNew} />
            <Route exact path="/profile" component={UserProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
