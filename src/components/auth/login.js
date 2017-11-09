import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {loginUser} from '../../actions/auth';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    renderField(field) {

        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div>
                <label className={className}>{field.label}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                {touched ? error : ''}
            </div>
        );
    }

    onSubmit({email, password}) {
        this.props.loginUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
        if (this.props.authenticated) {
            return <Redirect to='/dashboard'/>;
        }
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-signin">
                <Field
                    label="Email"
                    name="email"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                />
                <br/>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary" > Login </button>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.title = "Enter an Email";
    }

    if (!values.password) {
        errors.password = "Enter a password";
    }

    return errors;
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated};
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(mapStateToProps, {loginUser})(Login)
);