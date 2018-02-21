import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to="/surveys/new">
        <button className="fixed-button wobble btn-primary">
          
            <i className="material-icons">add</i>
          
        </button>
      </Link>
    </div>
  )
}

export default Dashboard
