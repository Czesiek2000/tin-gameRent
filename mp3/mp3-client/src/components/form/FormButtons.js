import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import formMode from '../../helpers/formHelper';

export default function FormButton({ mode, error, cancelPath }) {
    const { t } = useTranslation();
    const submitButtonLabel = mode == formMode.NEW ? t('form.actions.add') : t('form.actions.edit');
    // console.log(mode, submitButtonLabel);


    return (
        <div className='form-buttons'>
            <p id='errorsSummary' className='errors-text'>{error}</p>
            <input className='form-button-submit' type="submit" value={submitButtonLabel} />
            <Link to={cancelPath} className='form-button-cancel'>{ t('form.actions.cancel') }</Link>
        </div>
    )
}