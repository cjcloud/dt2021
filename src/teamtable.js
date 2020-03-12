import React from 'react'
import { GridList } from '@material-ui/core';


const Manager = ({ data }) => {

    console.log("data = ")
    console.log(data)

    return (

        <tbody >
            <TableRow rowData={data} />
        </tbody>
    );
}

const TableHead = () => {

    return (

        <thead class="prem">
            <tr>
                <th class="tbl-left">Player Name</th>
                <th>Club</th>
                <th>GW Pts</th>
                <th>Total Pts</th>
            </tr>
        </thead>
    );
}

const TableRow = (teams) => {

    console.log("teams")
    console.log(teams)

    console.log("teams.rowData")
    console.log(teams.rowData)

    let result = teams.rowData.teamDetails.map(team => {

        return (
            <tr>
                <td class="tbl-left">{team.playerDetails.playerName}</td>
                <td>{team.playerDetails.playerClub}</td>
                <td>{team.gwData.gwPts}</td>
                <td>{team.gwData.gwTotalPts}</td>
            </tr>
        );
    })
    return result
}



const LatestTeamTable = (managerObj1) => {

    let result = managerObj1.managers.map(manager => {

        let playertotalpts = manager.teamDetails.reduce(function (sum, elem) {

            return sum + elem.gwData.gwTotalPts;
        }, 0);

        let thisGWpts = manager.teamDetails.reduce(function (sum, elem) {

            return sum + elem.gwData.gwPts;
        }, 0);


        return (
            <>
                <div class=" mx-auto card">

                    <div class="card-header" > Manager: <span>{manager.manager}</span></div>
                    <table class="table table-bordered table-striped">
                        <TableHead />
                        <Manager data={manager} />
                    </table>
                    <div class="card-footer" id='totalpts'>
                        <div class="bf-500" > <tr><td><span class="cf-grn">GW Total Points = </span> {thisGWpts}
                        </td>  <td>  <span class="footer-align"> <span class="cf-grn" >Season Points = </span>{playertotalpts}</span></td></tr>
                        </div>
                    </div>


                </div>

            </>
        )
    })
    return result
}

const TeamTable = (managers, dateLastUpdated) =>
    <div>
        <div class="container banner card card-body h-100 justify-content-left">
            <p> <img src={process.env.PUBLIC_URL + "/UDT Members.svg"} alt="DT" style={{ width: 60 }}></img>
                <h3>Team Tables</h3>
                <h6>Last Updated: {dateLastUpdated} </h6>
                <span>
                    <p class="smalltxt">GW points are calculated from Fri to Fri</p>
                </span>
            </p>

        </div>

        <GridList cellHeight={360} cols={3}>

            <LatestTeamTable managers={managers} />

        </GridList>
    </div>

export default TeamTable;