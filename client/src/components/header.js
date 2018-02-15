import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './payments'

class Header extends Component {
  toggleNavCollapse = () => {
    const nav = this.refs.navigation
    nav.classList.toggle('show')
  }

  renderContent = () => {
    console.log(this.props)
    switch (this.props.auth) {
      case null:
        return ''
      case false:
        return (
          <a className="btn nav-item nav-link" href="/auth/google">
            Log With Google
          </a>
        )
      default:
        return [
          <span key="1" className="nav-item nav-link p-0" href="">
            <Payments />
          </span>,
          <span key="2" className="nav-item nav-link card mx-2">
            Credits: {this.props.auth.credits}
          </span>,
          <a key="3" className="btn nav-item nav-link" href="/api/logout">
           Log out
          </a>,
        ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="navbar-brand"
            href="#"
          >
            Emaily
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.toggleNavCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            ref="navigation"
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">{this.renderContent()}</div>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
