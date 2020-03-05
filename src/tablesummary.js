import React from 'react'


/* This app builds the manager summary table to display the weekly rankings of the managers */

const TableHead = (data) => {

    console.log(data)

    let datastring = JSON.stringify(data)
    console.log(datastring)

    let dateStr = datastring

    let dateLast = dateStr.slice(9, 27);


    return (

        <thead className="prem">
            <tr>
                <th>Position as of Previous Update </th>
                <th>Position Now</th>
                <th>Manager Name</th>
                <th>Total Pts</th>
            </tr>
        </thead>
    );
}

const TableRow = (teams) => {

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

    const result = (source) => {

        return (
            <div class="container tbl-summary">
                <h3>Manager Summary Table</h3><h6>Last updated: {dateLastUpdated}</h6>

                <table class="mx-auto table table-bordered table-striped table-summary" >
                    <TableHead data={dateLastUpdated} />
                    <tbody >
                        <TableRow rowData={source} />
                    </tbody>
                </table>

            </div>
        )
    }
    return result(source)
}

export default ManagerSummaryTable;