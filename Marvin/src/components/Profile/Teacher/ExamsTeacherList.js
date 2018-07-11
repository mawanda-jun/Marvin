import React from 'react';
// import { Link } from 'react-router'
import LoadingData from '../../Loading/LoadingData'
import LoadingIPFSData from '../../Loading/LoadingIpfs'
import EmptyData from '../../Loading/EmptyData'

// var arrayData = [
//     { year: "2017-2018", degree: "Informatica" },
//     { year: "2017-2018", degree: "Matematica" },
//     { year: "2017-2018", degree: "Psicologia" },
//     { year: "2017-2018", degree: "Ingegneria" },
//     { year: "2017-2018", degree: "Giurisprudenza" },
//     { year: "2016-2017", degree: "Informatica" },
//     { year: "2016-2017", degree: "Matematica" },
//     { year: "2016-2017", degree: "Psicologia" },
// ]

const Row = ({ examUnicode, load }) => (
    <tr className="clickable-row">
        <td>{examUnicode}</td>
        {/* <td>{teacher}</td> */}
        <td>{load && load.type}</td>
        <td>{load && load.place}</td>
        <td>{load && load.date}</td>
        <td>{load && load.time}</td>
    </tr>
);

const Options = ({ classUnicode }) => (
    <option value={classUnicode}> {classUnicode} </option>
);

class ExamsTeacherList extends React.Component {
    constructor(props) {
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            selectedClass: ''
        }
    }

    onSelectChange(event) {
        this.setState({ selectedClass: event.target.value })

        this.props.readExamsData(event.target.value)
    }

    componentDidMount() {
        this.props.readClassesData();
    }

    render() {
        const load = this.props.loadingExams || this.props.loadingClasses ? <LoadingData label='Loading...' /> : <div />;
        const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.emptyExams ? <EmptyData label='no data found on blockchain' /> : <div />
        console.error(this.props.emptyExams)
        return (
            <div>
                {load}
                {ipfsLoad}
                {empty}
                {/* {console.log('loadingClasses: ' + this.props.loadingClasses + '\nloadingDegree: ' + this.props.loadingExams } */}
                {((this.props.loadingClasses === false && this.props.loadingExams === false && this.props.ipfsLoading !== true) || this.state.selectedClass === "") &&
                    <div>
                        <main className='container'>
                            <div className="pure-u-1-1">
                                <h1>Exams</h1>
                                <p className="text-center">This is the list of the exams associated to the selected class.</p>
                                <form className="pure-form-stacked pure-form">
                                    <fieldset>
                                        <label htmlFor="classes"> Select class</label>
                                        <select type="text" name="classes" value={this.state.selectedClass} onChange={this.onSelectChange}>
                                            {<option value="select class" disabled={this.state.selectedClass === "" ? false : true}> -- select a class -- </option>}
                                            {this.props.emptyClasses === false &&
                                                this.props.classes.map((rowData, index) => <Options key={index} {...rowData} />)}
                                        </select>
                                    </fieldset>
                                </form>
                                {this.state.selectedClass !== "" &&
                                    this.props.emptyExams === false && this.props.success === true &&
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="title-column">Exam unicode</th>
                                                <th className="title-column">Type</th>
                                                <th className="title-column">Place</th>
                                                <th className="title-column">Date</th>
                                                <th className="title-column">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.exams.map((rowData, index) => <Row key={index} {...rowData} />)}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </main>
                    </div>
                }
                {error}
            </div>
        )
    }
}

export default ExamsTeacherList;

// import React from 'react';
// import Row from '../Commons/ExamList';

// var arrayData = [
//     { degree: "informatica", class: "Analisi", typology: "scritto", date: "20-06-2018" },
//     { degree: "informatica", class: "Analisi", typology: "orale", date: "22-06-2018" },
//     { degree: "informatica", class: "Calcolo numerico", typology: "scritto", date: "28-07-2018" },
//     { degree: "informatica", class: "Calcolo numerico", typology: "laboratorio", date: "01-08-2018" },
//     { degree: "ingegneria", class: "Calcolo numerico", typology: "scritto", date: "25-07-2018" },
//     { degree: "ingegneria", class: "Calcolo numerico", typology: "laboratorio", date: "27-08-2018" },
// ]

// class ExamsTeacherList extends React.Component {
//     render() {

//         const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

//         return (
//             <main className='container'>
//                 <h1>Exams associated to you</h1>
//                 <p className="text-center">Here there are the list of exams associated to you</p>
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Degree</th>
//                             <th>Class</th>
//                             <th>Typology</th>
//                             <th>Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {rows}
//                     </tbody>
//                 </table>
//             </main>
//         )
//     }
// }

// export default ExamsTeacherList;