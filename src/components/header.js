import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
  
class Header extends Component {

    renderLinks() {
        if (this.props.authenticated) {
            return <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
            </li>
        } else {
            return [
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            ];
        }
    }

    render() {
        return (
        <div>
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Admin App</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);