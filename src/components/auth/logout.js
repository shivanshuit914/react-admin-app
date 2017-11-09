import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logoutUser} from '../../actions/auth';

class Logout extends Component {
    componentWillMount() {
        this.props.logoutUser();
    }

    render() {
        return <div>Sorry to see you go...</div>;
    }
}

export default connect(null, logoutUser)(Logout);