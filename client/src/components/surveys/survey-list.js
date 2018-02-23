import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card mb-3 bg-light" key={survey.dateSent}>
          <div className="card-body">
            <h5 className="card-title">{survey.title}</h5>
            <p className="card-text">{survey.body}</p>

            <div className="card-footer">
              <a href="" className="card-link text-success">
                Yes: {survey.yes}
              </a>
              <a href="" className="card-link text-warning">
                No: {survey.no}
              </a>
              <p className="float-right ">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return <div>{this.renderSurveys()}</div>
  }
}

function mapStateToProps({ surveys }) {
  return { surveys }
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList)
