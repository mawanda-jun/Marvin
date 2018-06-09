import React from "react";
import * as data from '../../utils/adminData'
// import './Loading.scss'
// import loadingGif from '../../../public/media/loading.gif'
// taking year as parameter
import addNewAcademicYear from '../../redux/actions/Admin/AddAcademicYear'
// taking degreeCourse, year
import AddDegreeCourse from '../../redux/actions/Admin/AddDegreeCourse'
import store from '../../store'
import { browserHistory } from 'react-router'

// Not found page component
export default class FillBlockchain extends React.Component {
    constructor(props) {
        super(props)
        this.handleSave = this.handleSave.bind(this)
    }
    handleSave(event) {
        event.preventDefault()
        for (let i of data.academicYears) {
            // this.props.addAcademicYear(i.year)
            store.dispatch(addNewAcademicYear(i.year))
        }
        for(let i of data.degreeCourses) {
            store.dispatch(AddDegreeCourse(i.name, i.year))
        }
        browserHistory.push('/profile')
    }
    render() {
        return (
            <main className='container' onSubmit={this.handleSave}>
                <div className="pure-u-1-1">
                    <h1>So few data...</h1>
                    <p>Let me insert some data for you.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <div className="div-buttons">
                                <input type="submit" value="Fill it!" />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}