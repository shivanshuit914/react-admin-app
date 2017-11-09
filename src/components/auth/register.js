import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {registerUser} from '../../actions/auth';
import { Redirect } from 'react-router-dom';


class Register extends Component {
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

    onSubmit({email, password}) {
        this.props.registerUser({ email, password });
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
                <Field
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    component={this.renderField}
                />
                <br/>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary" > Register </button>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Enter an Email";
    }

    if (!values.password) {
        errors.password = "Enter a password";
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Enter a password";
    }

    if (values.password !== values.confirm_password) {
        errors.confirm_password = "Enter confirm password same as password";
    }

    return errors;
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated};
}

export default reduxForm({
    validate,
    form: 'RegisterForm'
})(
    connect(mapStateToProps, {registerUser})(Register)
);