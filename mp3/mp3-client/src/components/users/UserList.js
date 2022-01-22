import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUsersApiCalls } from "../../api/userApiCalls";
import { isAdmin, isAuthenticated } from "../../helpers/authHelper";
import UserListTable from "../table/UserListTable";

export default function UserList() {
    const location = useLocation();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        getUsersApiCalls()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                setLoading(true);
            })
            .catch(error => {
                setError(error.message);
                setLoading(true);
            });

        const { state } = location;
        const notice = state && state.notice ? state.notice : '';
        // let query = new URLSearchParams(window.location.search)
        // const message = query.get('message') ? query.get('message') : notice;
        // console.log({ query, message });
        setMessage(notice);

        setTimeout(() => {
            setMessage('');
            if(document.querySelector('.alert') !== null) {
                document.querySelector('.alert').style.display = 'none';
            }
            history.replace({ ...history.location, state: undefined });
        }, 1000);
    }, []);
    return (
        <main>
            {
                message !== '' ? <p className="alert">{message}</p> : ''
            }
            <h1>{ t('user.header') }</h1>
            { error ? <p>{ t('error') }: {error}</p> : '' }
            { !loading ? <p>{ t('user.loading') }</p> : <UserListTable users={users} />}
            { isAdmin() && 
                <p className="section-buttons">
                    <a href="/users/add" className="button-add">{ t('user.add') }</a>
                </p>
            }
        </main>
    )
}