import React from "react";

/* This app builds the manager summary table to display the weekly rankings of the managers */

const TableHead = (data) => {
  console.log(data);

  let datastring = JSON.stringify(data);
  console.log(datastring);

  let dateStr = datastring;

  let dateLast = dateStr.slice(9, 27);

  return (
    <thead className="prem">
      <tr>
        <th id="firsthead">Position Season </th>
        <th>Position Lockdown</th>
        <th>Manager Name</th>
        <th id="lasthead">Total Pts</th>
      </tr>
    </thead>
  );
};

const TableRow = (teams) => {
  let result = teams.rowData.map((team) => {
    return (
      <tr>
        <td className="td-number">{team.managerPosLast}</td>
        <td className="td-number">{team.managerPosNow}</td>
        <td className="td-name">{team.managerName}</td>
        <td className="td-total">{team.managerPointsLockdown}</td>
      </tr>
    );
  });
  return result;
};

const ManagerSummaryTableLockDown = (source, dateLastUpdated) => {
  const result = (source) => {
    return (
      <div class="container" id="fullwidth-2">
        <p class="pagetitle">
          <h3 id="toptitle1">Manager Summary Table</h3>
          <h3>Points gained Post Lockdown</h3>

          <h6>Last updated: {dateLastUpdated}</h6>
        </p>

        <div class="" id="cardtblsummary">
          <table class="mx-auto table table-bordered table-striped table-summary neomorph-2">
            <TableHead data={dateLastUpdated} />
            <tbody>
              <TableRow rowData={source} />
            </tbody>
          </table>
        </div>
        <div id="bottom-1"></div>
      </div>
    );
  };
  return result(source);
};

export default ManagerSummaryTableLockDown;
