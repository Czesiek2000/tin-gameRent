import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCurrentUser, isAdmin, isAuthenticated } from "../../helpers/authHelper";

export default function UserListTableRow({ user }) {
    const { t } = useTranslation();
    const history = useHistory();
    const deleteUser = (id) => {
        fetch(`http://localhost:3005/api/users/${id}`, {
            method: "DELETE",
        })
            .then(response => {
                console.log(response);
                history.push({
                    pathname: "/users",
                    state: { notice: t('user.delete.success') }
                });
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                history.push({
                    pathname: "/users",
                    state: { notice: t('user.delete.erorr') }
                })
                window.location.reload();
            });
    }
    return (
        <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phonenumber ? user.phonenumber : t('user.nophone') }</td>
            {
                isAdmin() && <td>{user.role == 1 ? 'Admin' : t('user.normal') }</td>
            }
            
            <td>
                <ul className="list-action">
                    <li>
                        <Link to={`/users/details/${user.id}`} className="list-action-button-details">{t('list.actions.details')}</Link>
                    </li>
                    {
                        isAdmin() &&
                        <>
                            <li>
                                <Link to={`/users/edit/${user.id}`} className="list-action-button-edit">{t('list.actions.edit')}</Link>
                            </li>
                            { 
                                getCurrentUser().userId !== user.id && 
                                <li>
                                    <button className="list-action-button-delete" onClick={() => deleteUser(user.id)}>{t('list.actions.delete')}</button>
                                </li>
                            }
                        </>
                    }
                </ul>
            </td>

        </tr>
    )
}