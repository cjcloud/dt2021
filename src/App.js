import React from "react";
import "./srcCSS/App.css";
import "./srcCSS/cardtable.css";
import "./srcCSS/tablesummary.css";
import "./srcCSS/information.css";
import TeamTable from "./teamtable";
import ManagerSummaryTable from "./tablesummary";
import ManagerSummaryTableLockDown from "./tablesummarylockdown";
import Navigation from "./navigation";
import { BrowserRouter as Router, withRouter, Route } from "react-router-dom";

import dateUpdated from "./srcData/dateLastUpdated.json";

import managersJSON from "./srcData/managersData.json";
import managerSummaryJSON from "./srcData/managerSummary.json";
import managerSummaryLockdownJSON from "./srcData/managerSummaryLockdown.json";
import InfoCard from "./information";

let managers = managersJSON;
let managerSummary = managerSummaryJSON;
let managerSummaryLockdown = managerSummaryLockdownJSON;
let dateLastUpdated = dateUpdated[0].dateLastUpdated;

// Orignal Code from https://material-ui.com/components/tables/

const HeaderWithRouter = withRouter(Navigation);

function App() {
  return (
    <div className="App bg">
      <Router>
        <React.Fragment>
          <HeaderWithRouter />
          <Route
            path="/"
            exact
            render={() => TeamTable(managers, dateLastUpdated)}
          />
          <Route
            path="/managersummary"
            render={() => ManagerSummaryTable(managerSummary, dateLastUpdated)}
          />
          <Route
            path="/managersummarylockdown"
            render={() =>
              ManagerSummaryTableLockDown(
                managerSummaryLockdown,
                dateLastUpdated
              )
            }
          />
          <Route path="/information" render={() => InfoCard()} />
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
