import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './survey-field'
import validateEmails from '../../utils/validate-emails'
import _ from 'lodash'

const fields = [
  { label: 'Survey Title', name: 'title', id: 'input-survey-title' },
  { label: 'Subject Line', name: 'subject', id: 'input-subject-line' },
  { label: 'Email Body', name: 'body', id: 'input-email-body' },
  { label: 'Recipient List', name: 'emails', id: 'input-recipient-list' },
]

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
          onSubmit={this.props.handleSubmit(values => console.log(values))}
        >
          {this.renderFields()}
          <div className="d-flex justify-content-between">
            <Link to="/surveys">
              <button className="btn btn-secondary">Cancell</button>
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

  errors.emails = validateEmails(values.emails)

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
})(SurveyForm)
