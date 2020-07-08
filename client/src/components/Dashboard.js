import React from "react";
import { Link } from "react-router-dom";

//components
import SurveyList from "./Survey/SurveyList";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <SurveyList />
        <div className="fixed-action-btn">
          <Link
            to="/panel/yeni"
            className="btn-floating btn-large waves-effect waves-light teal lighten-2"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
