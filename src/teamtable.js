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

        <thead className="prem">
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

    console.log("managerObj1  === ")
    console.log(managerObj1)

    let result = managerObj1.managers.map(manager => {

        console.log("manager  === ")
        console.log(manager)

        let playertotalpts = manager.teamDetails.reduce(function (sum, elem) {
            console.log(elem)
            return sum + elem.gwData.gwTotalPts;
        }, 0);


        return (
            <>
                <div class="mx-auto card">

                    <div class="card-header" > Manager: <span>{manager.manager}</span></div>
                    <table class="table table-bordered table-striped">
                        <TableHead />
                        <Manager data={manager} />
                    </table>
                    <div class="card-footer" id='totalpts'>
                        Total =  <span >{playertotalpts}</span>
                    </div>
                    <div className="spacer"></div>

                </div>

            </>
        )
    })
    return result
}

const TeamTable = (managers, dateLastUpdated) =>
    <div>
        <h3 className="pagetitle">Team Tables</h3><h6>Last Updated: {dateLastUpdated} </h6><p className="sub">GW points are calculated from Fri to Fri each week</p>
        <GridList cellHeight={360} cols={3}>

            <LatestTeamTable managers={managers} />

        </GridList>
    </div>

export default TeamTable;