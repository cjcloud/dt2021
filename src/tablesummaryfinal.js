import React from "react";

/* This app builds the manager summary table to display the weekly rankings of the managers */

const TableHead = (data) => {
  console.log("TableHead -> data", data);

  let datastring = JSON.stringify(data);
  console.log("datastring", datastring);

  let dateStr = datastring;

  let dateLast = dateStr.slice(9, 27);

  return (
    <thead className="prem">
      <th id="tablecaption" colSpan={4}>
        All points for the Season
      </th>
      <tr>
        <th>Previous Update </th>
        <th>Position Now</th>
        <th>Manager Name</th>
        <th>Total Pts</th>
      </tr>
    </thead>
  );
};

const TableHeadPL = (data) => {
  console.log("TableHead -> data", data);

  let datastring = JSON.stringify(data);
  console.log("datastring", datastring);

  let dateStr = datastring;

  let dateLast = dateStr.slice(9, 27);

  return (
    <thead className="prem">
      <tr>
        <th>Previous Update </th>
        <th>Position Now</th>
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
        <td className="td-total">{team.managerPoints}</td>
      </tr>
    );
  });
  return result;
};

const FinalTable = (source1, source2, dateLastUpdated) => {
  const result = (source1, source2) => {
    return (
      <div class="container" id="fullwidth-2">
        <p class="pagetitle">
          <h3 id="toptitle1">Final Tables</h3>
          <h6>Top 3 positions</h6>
          <h6>Last updated: {dateLastUpdated}</h6>
        </p>

        <div class="" id="cardtblFinal">
          <table class="mx-auto table table-bordered table-striped table-summary neomorph-2">
            <TableHead data={dateLastUpdated} />
            <tbody>
              <TableRow rowData={source1} />
            </tbody>
          </table>
        </div>
        <div id="bottom-1"></div>

        <div class="" id="cardtblFinal final1">
          <table class="mx-auto table table-bordered table-striped table-summary neomorph-2">
            <TableHead data={dateLastUpdated} />
            <tbody>
              <TableRow rowData={source2} />
            </tbody>
          </table>
        </div>
        <div id="bottom-1"></div>
      </div>
    );
  };
  return result(source1, source2);
};

export default FinalTable;
