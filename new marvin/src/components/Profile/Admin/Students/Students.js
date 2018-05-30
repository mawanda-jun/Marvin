import React from 'react';
import Row from '../../Admin/UserList';

var arrayData = [
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
]

class Students extends React.Component {
    render() {

        const rows = arrayData.map((rowData) => <Row {...rowData} />);

        return (
            <main className='container'>
                <h1>Students</h1>
                <p className="text-center">Here there is the list of the students.</p>
                <button className="float-right" href="#">Insert a student</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Badge number</th>
                            <th>Fiscal code</th>
                            <th>Univocal code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </main>
        )
    }
}

export default Students;