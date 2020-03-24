import React from "react";
import { GridList } from "@material-ui/core";

const Manager = ({ data }) => {
  console.log("data = ");
  console.log(data);

  return (
    <tbody>
      <TableRow rowData={data} />
    </tbody>
  );
};

const TableHead = () => {
  return (
    <thead class="prem neomorph-1">
      <tr id="tablehead">
        <th class="tbl-left nobgrnd">Player Name</th>
        <th>Club</th>
        <th>Pts</th>
        <th id="lasthead">Total</th>
      </tr>
    </thead>
  );
};

const TableRow = teams => {
  console.log("teams");
  console.log(teams);

  console.log("teams.rowData");
  console.log(teams.rowData);

  let result = teams.rowData.teamDetails.map(team => {
    return (
      <tr class="border_bottom">
        <td class="tbl-left">{team.playerDetails.playerName}</td>
        <td>{team.playerDetails.playerClub}</td>
        <td>{team.gwData.gwPts}</td>
        <td>{team.gwData.gwTotalPts}</td>
      </tr>
    );
  });
  return result;
};

const LatestTeamTable = managerObj1 => {
  let result = managerObj1.managers.map(manager => {
    let playertotalpts = manager.teamDetails.reduce(function(sum, elem) {
      return sum + elem.gwData.gwTotalPts;
    }, 0);

    let thisGWpts = manager.teamDetails.reduce(function(sum, elem) {
      return sum + elem.gwData.gwPts;
    }, 0);

    return (
      <>
        <div class=" mx-auto card neomorph-1">
          <div className="table">
            <div class="card-header">
              {" "}
              Manager: <span>{manager.manager}</span>
            </div>
            <table class="table table-bordered table-striped" id="teamtable">
              <TableHead />
              <Manager data={manager} />
            </table>
            <div class="card-footer neomorph-2" id="totalpts">
              <div class="bf-500">
                <tr>
                  <td>
                    <div className="">
                      <span class="cf-grn">GW Total Points</span>
                      <span> {thisGWpts}</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <div>
                      <span class="cf-grn footer-left">Season Points</span>
                      <span class="footer-left"> {playertotalpts}</span>
                    </div>
                  </td>
                </tr>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  return result;
};

const TeamTable = (managers, dateLastUpdated) => (
  <div id="fullwidth">
    <div
      class="container banner card card-body justify-content-left"
      id="banner-tablesummary"
    >
      <p>
        {" "}
        <img
          src={process.env.PUBLIC_URL + "/UDT Members.svg"}
          alt="DT"
          style={{ width: 60 }}
        ></img>
        <div className="banner-text">
          <h3>Team Tables</h3>
          <h6>Last Updated: {dateLastUpdated} </h6>
          <span>
            <p class="smalltxt">GW points are calculated from Fri to Fri</p>
          </span>
        </div>
      </p>
    </div>
    <container id="info-2">
      <div id="info-1"> Scroll down to see your table</div>
    </container>

    <GridList cellHeight={360} cols={3} id="grid-1">
      <LatestTeamTable managers={managers} />
    </GridList>
  </div>
);

export default TeamTable;
