import { connect } from 'react-redux'
import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

import { fields } from './form-fields'
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(fields, field => {
    return (
      <div key={field.id} className="mb-4">
        <small className="text-muted">{field.label}</small>
        <div>{formValues[field.name]}</div>
      </div>
    )
  })

  return (
    <div className="card p-4">
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <div className="d-flex justify-content-between">
        <button className="btn btn-danger" onClick={onCancel}>
          bACK
        </button>
        <button
          className="btn btn-primary"
          onClick={() => submitSurvey(formValues, history)}
        >
          sEND SURVEY
          <i className="material-icons small ml-2">email</i>
        </button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  console.log('State ', state.form.surveyForm)
  return {
    formValues: state.form.surveyForm.values,
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
