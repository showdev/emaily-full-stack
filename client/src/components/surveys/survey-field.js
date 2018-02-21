import React from 'react'

export default ({ input, label, id, meta: { error, touched } }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="form-control" {...input} />
      <small className="form-text text-danger">{touched && error}</small>
    </div>
  )
}
