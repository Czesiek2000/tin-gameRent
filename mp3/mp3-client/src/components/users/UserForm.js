import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import { addUserApiCalls, getUserDetailsApiCalls, updateUserApiCalls } from '../../api/userApiCalls';

import formMode, { getValidationErrorKeys } from '../../helpers/formHelper';
import * as validationCommon from '../../helpers/validationCommon';
import FormButton from '../form/FormButtons';
import FormInput from '../form/FormInput';
import { withTranslation } from 'react-i18next';
import { isAdmin, isAuthenticated } from '../../helpers/authHelper';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        const paramsUserId = props.match.params.id;
        const currentFormMode = paramsUserId ? formMode.EDIT : formMode.NEW;
        console.log(currentFormMode);
        this.state = {
            id: paramsUserId,
            user: {
                firstname: '',
                lastname: '',
                email: '',
                phonenumber: '',
                password: '',
                role: '',
            },
            errors: {
                firstname: '',
                lastname: '',
                email: '',
                phonenumber: '',
                password: '',
                role: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
        }
    }

    fetchUserDetails = () => {
        getUserDetailsApiCalls(this.state.id)
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                this.setState({
                    message: data.message,
                });
            } else {
                this.setState({
                    user: {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        phonenumber: data.phonenumber,
                        password: '',
                        role: data.role,
                    },
                    message: null,
                });
            }
            this.setState({
                loading: true,
            })
        })
        .catch(error => {
            this.setState({
                error: error.message,
                loading: true,
            });
        });
    }

    componentDidMount() {
        const currentFormMode = this.state.formMode;
        if(currentFormMode === formMode.EDIT) {
            this.fetchUserDetails();
        }   
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const user = { ...this.state.user };
        user[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            user,
            errors,
        })

    }

    validateField = (fieldName, value) => {
        const { t } = this.props;
        let errorMessage = '';
        if(fieldName === 'firstname') {
            if(!validationCommon.checkRequired(value)) {
                errorMessage = t('validation.required');
            } else if(!validationCommon.checkTextLengthRange(value, 2, 60)) {
                errorMessage = t('validation.fieldLength', {min: 2, max: 60});
            }
        }

        if(fieldName === 'lastname') {
            if(!validationCommon.checkRequired(value)) {
                errorMessage = t('validation.required');
            } else if(!validationCommon.checkTextLengthRange(value, 2, 60)) {
                errorMessage = t('validation.fieldLength', {min: 2, max: 60});
            }
        }

        if(fieldName === 'email') {
            if(!validationCommon.checkRequired(value)) {
                errorMessage = t('validation.required');
            } else if(!validationCommon.checkEmail(value)) {
                errorMessage = t('validation.email');
            }
        }

        // if(fieldName === 'phonenumber') {
        //     if(!validationCommon.checkNumber(value)){
        //         errorMessage = t('validation.number');
        //     }else if(!validationCommon.checkNumberRange(value, 9)){
        //         errorMessage = t('validation.9_number');
        //     }
        // }
        if(!this.state.id) {
            if(fieldName === 'password') {
                if(!validationCommon.checkRequired(value)) {
                    errorMessage = t('validation.required');
                }else if(!validationCommon.checkTextLengthRange(value, 5, 60)) {
                    errorMessage = t('validation.fieldLength', {min: 5, max: 60});
                }
            }
        }
        return errorMessage;
    }

    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;
        for(const fieldName in user) {
            const fieldValue = user[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors,
        });
        return !this.hasErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                user = this.state.user,
                currentFormMode = this.state.formMode
            let promise;
            let response;
            if (currentFormMode === formMode.NEW) {
                promise = addUserApiCalls(user)
    
            } else if (currentFormMode === formMode.EDIT) {
                console.log(user)
                const userId = this.state.id
                promise = updateUserApiCalls(userId, user)
            }
            if (promise) {
                promise
                    .then(
                        (res) => {
                            response = res
                            if (response.status === 201 || response.status === 500) {
                                return res.json()
                            }
                        })
                    .then(data => {
                        if(!response.ok && response.status === 500) {
                            console.log(data);
                            const { t } = this.props;
                            // this.setState({
                            //     errors: {
                            //         email: data.message,
                            //     },
                            //     error: data.message,
                            // });
                            for(const i in data){
                                const errorItem = data[i];
                                console.log(errorItem, i);
                                const errorMessage = t(getValidationErrorKeys(errorItem.message));
                                const errorField = errorItem.path;
                                const errors = { ...this.state.errors };
                                errors[errorField] = errorMessage;
                                this.setState({
                                    errors,
                                    error: null
                                });
                            }
                        }else {
                            this.setState({ redirect: true });
                        }
                    })
                    .catch(error => {
                        this.setState({ error });
                        console.log(error);
                    })
            }
        }
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for(const errorField in errors) {
            if(errors[errorField]?.length > 0) {
                return true
            }
        }
        return false;
    }

    render() {
        const { redirect } = this.state;
        const { t } = this.props;
        
        if(redirect){
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? t('user.added.success') : t('user.edited.success');
            return (
                <Redirect to={{
                    pathname: '/users',
                    state: {
                        notice,
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('form.hasErrors') : '';
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('user.new') : t('user.edit');

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        if(!this.state.id) {
            
            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <FormInput type="text" label={t('user.table.name')} required error={this.state.errors.firstname} name="firstname" placeholder={t('user.placeholders.form.2-60')} onChange={this.handleChange} value={this.state.user.firstname}/>
                        <FormInput type="text" label={t('user.table.surname')} required error={this.state.errors.lastname} name="lastname" placeholder={t('user.placeholders.form.2-60')} onChange={this.handleChange} value={this.state.user.lastname}/>
                        <FormInput type="email" label={t('user.table.email')} required error={this.state.errors.email} name="email" placeholder="example@example.com" onChange={this.handleChange} value={this.state.user.email}/>
                        <FormInput type="text" label={t('user.table.phone')} error={this.state.errors.phonenumber} name="phonenumber" placeholder={ t('user.placeholders.form.9digits') } onChange={this.handleChange} value={this.state.user.phonenumber}/>
                        <FormInput type="password" label={t('user.table.password')} required error={this.state.errors.password} name="password" placeholder={ t('user.placeholders.form.6-60') } onChange={this.handleChange} value={this.state.user.password}/>
                        {
                            (isAuthenticated() && isAdmin()) && <FormInput type="number" label={t('user.table.role')} error={this.state.errors.role} name="role" placeholder={ t('user.placeholders.form.0or1') } onChange={this.handleChange} value={this.state.user.role}/>
                        }
                        
                        <FormButton mode={this.state.formMode} error={globalErrorMessage} cancelPath="/users" />
                    </form>

                </main>
            )
            
        }
        
        if(this.state.id && isAuthenticated() && isAdmin()) {
            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <FormInput type="text" label={t('user.table.name')} required error={this.state.errors.firstname} name="firstname" placeholder={t('user.placeholders.form.2-60')} onChange={this.handleChange} value={this.state.user.firstname}/>
                        <FormInput type="text" label={t('user.table.surname')} required error={this.state.errors.lastname} name="lastname" placeholder={t('user.placeholders.form.2-60')} onChange={this.handleChange} value={this.state.user.lastname}/>
                        <FormInput type="email" label={t('user.table.email')} required error={this.state.errors.email} name="email" placeholder="example@example.com" onChange={this.handleChange} value={this.state.user.email}/>
                        <FormInput type="text" label={t('user.table.phone')} error={this.state.errors.phonenumber} name="phonenumber" placeholder={ t('user.placeholders.form.9digits') } onChange={this.handleChange} value={this.state.user.phonenumber}/>
                        <FormInput type="password" label={t('user.table.password')} required error={this.state.errors.password} name="password" placeholder={ t('user.placeholders.form.6-60') } onChange={this.handleChange} value={this.state.user.password}/>
                        {
                            (isAuthenticated() && isAdmin()) && <FormInput type="number" label={t('user.table.role')} error={this.state.errors.role} name="role" placeholder={ t('user.placeholders.form.0or1') } onChange={this.handleChange} value={this.state.user.role}/>
                        }
                        
                        <FormButton mode={this.state.formMode} error={globalErrorMessage} cancelPath="/users" />
                    </form>

                </main>
            )
        }
        
        if(this.state.id && !isAdmin()){
            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <p>{ t('auth.blocked') }</p>
                </main>
            )
        }
    }
}

export default withTranslation()(UserForm);