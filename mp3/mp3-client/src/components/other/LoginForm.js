import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import FormInput from '../form/FormInput';
import FormButton from '../form/FormButtons';
import { loginApiCalls } from "../../api/authApiCalls";
import { checkRequired } from "../../helpers/validationCommon";

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            },
            error: '',
            message: '',
            prevPath: '',
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const user = { ...this.state.user };
        user[name] = value;

        const errorMessage = this.validateField(user, name);
        const errors = { ...this.state.errors };

        this.setState({
            user,
            errors,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validateForm();
        if(isValid){
            const user = this.state.user;
            let response;
            loginApiCalls(user)
            .then(res => {
                response = res;
                return response.json();
            }).then(data => {
                if(response.status == 200){
                    if(data.token){
                        const userString = JSON.stringify(data);
                        this.props.handleLogin(userString);
                        // this.props.history.goBack();
                    }
                }else if(response.status == 401){
                    console.log(401);
                    this.setState({
                        message: data.message,
                    });
                }
            }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            });
        }
    }


    validateField = (fieldName, value) => {
        let errorMessage = '';
        if(fieldName === 'email'){
            if(!checkRequired(value)){
                errorMessage = 'Email is required';
            }
        }

        if(fieldName == 'password'){
            if (!checkRequired(value)) {
                errorMessage = 'Password is required';                
            }
        }

        return errorMessage;
    }


    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;
        for(const fieldName in user){
            const fieldValue = user[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors,
        });

        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for(const errorField in errors){
            if(errors[errorField].lenght > 0){
                return true;
            }
        }
        return false;
    }


    render() {
        const { t } = this.props;
        const errorsSummary = this.hasErrors() ? t('errors.summary') : '';
        const fetchError = this.state.error ? `${t('error')}: ${this.state.error.message}` : '';
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        return (
            <main>
                <div id="login">
                    <h2>{t('auth.pageTitle')}</h2>
                    <form className="form" method="post" onSubmit={this.handleSubmit}>
                        <FormInput name="email" value={this.state.user.email} error={this.state.errors.email} label={t('user.table.email')} onChange={this.handleChange} type="text"/>
                        <FormInput name="password" value={this.state.user.password} error={this.state.errors.password} label={t('user.table.password')} onChange={this.handleChange} type="password"/>
                        <div className='form-buttons'>
                            <p id='errorsSummary' className='errors-text'>{globalErrorMessage}</p>
                            <input className='form-button-submit' type="submit" value={t('form.actions.login')} />
                            <Link to="/" className='form-button-cancel'>{t('form.actions.cancel')}</Link>
                        </div>
                    </form>
                <Link to="/users/add" className="button-back" style={{ marginTop: "2rem", display: "block", width: '300px' }}>{t('auth.createAccount')}</Link>
                </div>
            </main>
        );
    }

}

export default withRouter(withTranslation()(LoginForm));