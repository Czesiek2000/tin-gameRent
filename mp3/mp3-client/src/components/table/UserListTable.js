import UserListTableRow from './UserListTableRow';
import { useTranslation } from 'react-i18next';
import { isAdmin } from '../../helpers/authHelper';

export default function UserListTable(props){
    const { users } = props;
    const { t } = useTranslation();
    return (
        <>
        { users.length > 0 &&
        
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{ t('user.table.name') }</th>
                        <th>{ t('user.table.surname') }</th>
                        <th>{ t('user.table.email') }</th>
                        <th>{ t('user.table.phone') }</th>
                        {isAdmin() && <th>{ t('user.table.role') }</th>}
                        <th>{ t('list.actions.title') }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <UserListTableRow key={user.id} user={user} />
                        ))
                    }
                </tbody>
            </table>
        }
        {
            users.length === 0 && <p style={{ textAlign: 'center' }}>{ t('user.noUsers') }</p>
        }
        </>
    )
}