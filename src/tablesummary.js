import React from 'react'
import { Table } from '../node_modules/bootstrap/dist/css/bootstrap.css'

/* This app builds the manager summary table to display the weekly rankings of the managers */

const TableHead = () => {

    return (

        <thead className="prem">
            <tr>
                <th>Position Last Week</th>
                <th>Position This Week</th>
                <th>Manager Name</th>
                <th>Total Pts</th>
            </tr>
        </thead>
    );
}

const TableRow = (teams) => {

    console.log("teams in Table Row TS")
    console.log(teams)


    let result = teams.rowData.map(team => {

        return (
            <tr>
                <td className='td-number'>{team.managerPosLast}</td>
                <td className='td-number'>{team.managerPosNow}</td>
                <td className='td-name'>{team.managerName}</td>
                <td className='td-total'>{team.managerPoints}</td>
            </tr>
        );
    })
    return result
}

const ManagerSummaryTable = (source, dateLastUpdated) => {

    console.log("source from ManagerSummarytable")
    console.log(source)

    const result = (source) => {

        console.log("source in result of MST === ")
        console.log(source)

        return (
            <>
                <span id="container"><h3>Manager Summary Table</h3><h6>Last updated: {dateLastUpdated}</h6></span>

                <table class="mx-auto table table-bordered table-striped table-summary" >
                    <TableHead />
                    <tbody >
                        <TableRow rowData={source} />
                    </tbody>
                </table>

            </>
        )
    }
    return result(source)
}

export default ManagerSummaryTable;