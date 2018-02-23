import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './survey-field'
import validateEmails from '../../utils/validate-emails'
import _ from 'lodash'

import { fields } from './form-fields'

class SurveyForm extends Component {
  renderFields() {
    return _.map(fields, ({ label, name, id, autocomplete }) => {
      return (
        <Field
          key={id}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          id={id}
        />
      )
    })
  }
  render() {
    return (
      <div className="card p-4">
        <form
          className="m-0"
          onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
        >
          {this.renderFields()}
          <div className="d-flex justify-content-between">
            <Link to="/surveys">
              <button className="btn btn-danger">cANCEL</button>
            </Link>
            <button className="btn btn-primary flex" type="submit">
              Next
              <i className="material-icons small ml-2">done</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients)

  _.each(fields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm)
