import React from "react";
import { withTranslation } from "react-i18next";

import { Link, Redirect } from "react-router-dom";
import { addGameApiCalls, getGameDetailsApiCalls, updateGameApiCalls } from "../../api/gamesApiCalls";
import { isAuthenticated } from "../../helpers/authHelper";

import formMode, { getValidationErrorKeys } from "../../helpers/formHelper";
import * as validationCommon from "../../helpers/validationCommon";
import FormButton from "../form/FormButtons";
import FormInput from "../form/FormInput";

class GameForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsGameId = props.match.params.id;
        const currentFormMode = paramsGameId ? formMode.EDIT : formMode.NEW;
        console.log(currentFormMode);
        this.state = {
            id: paramsGameId,
            game: {
                name: '',
                description: '',
                length: '',
                release_date: '',
            },
            errors: {
                name: '',
                description: '',
                length: '',
                release_date: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
        }
    }

    fetchGameDetails = () => {
        getGameDetailsApiCalls(this.state.id)
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                this.setState({
                    message: data.message,
                });
            } else {
                this.setState({
                    game: data,
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
            this.fetchGameDetails();
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const game = {...this.state.game};
        game[name] = value;
        
        const errorMessage = this.validateField(name, value);
        // console.log(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            game,
            errors
        })
    }

    validateField = (fieldName, value) => {
        let errorMessage = '';
        const { t } = this.props;
        if(fieldName === 'name') {
            if(!validationCommon.checkRequired(value)) {
                errorMessage = t('validation.required');
            }else if(!validationCommon.checkTextLengthRange(value, 2, 60)) {
                errorMessage = t('validation.fieldLength', {min: 2, max: 60});
            }
        }

        if(fieldName === 'release_date') {
            if(!validationCommon.checkRequired(value)) {
                errorMessage = t('validation.required');
            }
        }

        if(fieldName === 'description') {
            if(!validationCommon.checkRequired(value)) {
                errorMessage = t('validation.required');
            }else if(!validationCommon.checkTextLengthRange(value, 3, 300)) {
                errorMessage = t('validation.fieldLength', {min: 3, max: 300});
            }
        }

        if(fieldName === 'length') {
            // console.log(value);
            // if(!validationCommon.checkRequired(value)) {
            //     errorMessage = t('validation.required');
            // }else
             if(!validationCommon.checkNumber(value)) {
                errorMessage = t('validation.number');
            }
        }

        return errorMessage;
    }

    validateForm = () => {
        const game = this.state.game;
        const errors = this.state.errors;

        for(const fieldName in game) {
            const fieldValue = game[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors
        });
        return !this.hasErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            const game = this.state.game;
            const currentFormMode = this.state.formMode;
            let promise;
            let response;
            if(currentFormMode === formMode.NEW) {
                promise = addGameApiCalls(game);
            } else if(currentFormMode === formMode.EDIT) {
                console.log(game);
                const gameId = this.state.id;
                promise = updateGameApiCalls(gameId, game);
            }
            if(promise) {
                promise
                .then(res => {
                    response = res;
                    if(response.status === 201 || response.status === 500) {
                        return res.json()
                    }
                })
                .then(data => {
                    if(!response.ok && response.status === 500) {
                        console.log(data);
                        const { t } = this.props;
                        for(const i in data) {
                            const errorItem = data[i];
                            console.log(errorItem);
                            const errorMessage = t(getValidationErrorKeys(errorItem.message));
                            const fieldName = errorItem.path;
                            const errors = {...this.state.errors};
                            errors[fieldName] = errorMessage;
                            this.setState({
                                errors,
                                error: null
                            });
                        }
                    }else {
                        this.setState({
                            redirect: true,
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        error: error.message,
                        loading: true,
                    });
                });
            }
        }
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for(const fieldName in errors) {
            if(errors[fieldName]) {
                return true;
            }
        }
        return false;
    }

    render() {
        const { redirect } = this.state;
        const { t } = this.props;
        // console.log(t);

        if (redirect) {
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? 'Gra została dodana' : 'Gra została zaktualizowana';
            return (
                <Redirect to={{
                    pathname: '/games',
                    state: {
                        notice,
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('form.hasErrors') : '';
        const fetchError = this.state.error ? `${t('error')}: ${this.state.error.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('game.add') : t('game.edit');

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        if(isAuthenticated()){
            return (
                <main>
                    <h2>{ pageTitle }</h2>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <FormInput type="text" label={ t('game.table.name') } required error={this.state.errors.name} name="name" placeholder={ t('game.placeholders.form.2-60') } onChange={this.handleChange} value={this.state.game.name} />
                        <FormInput type="text" label={ t('game.table.description') } required error={this.state.errors.description} name="description" placeholder={ t('game.placeholders.form.3-300') } onChange={this.handleChange} value={this.state.game.description} />
                        <FormInput type="date" label={ t('game.table.releaseDate') } required error={this.state.errors.release_date} name="release_date" onChange={this.handleChange} value={this.state.game.release_date} />
                        <FormInput type="number" label={ t('game.table.length') } required error={this.state.errors.length} name="length" placeholder={ t('game.placeholders.form.number') } onChange={this.handleChange} value={this.state.game.length} />
                        
                        <FormButton mode={this.state.formMode} error={globalErrorMessage} cancelPath="/games" />
                    </form>
                </main>
            )
        }else {
            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <p>{ t('auth.blocked') }</p>
                </main>
            )
        }
    }
}

export default withTranslation()(GameForm);