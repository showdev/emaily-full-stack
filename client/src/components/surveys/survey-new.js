import React, { Component } from 'react'
import SurveyForm from './survey-form'
import SurveyFormReview from './survey-form-review'
import { reduxForm } from 'redux-form'

class SurveyNew extends Component {
  state = { showFormReview: false }

  renderContent() {
    return this.state.showFormReview ? (
      <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}
      />
    ) : (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    )
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew)
