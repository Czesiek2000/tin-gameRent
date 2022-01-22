import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getUserDetailsApiCalls } from "../../api/userApiCalls";
import { isAuthenticated } from "../../helpers/authHelper";
import { getFormattedDate } from '../../helpers/dateHelper';

export default function UserDetails() {
    const { t } = useTranslation();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState({});
    let { id } = useParams();
    id = parseInt(id);

    useEffect(() => {
        getUserDetailsApiCalls(id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // if(Object.keys(data).length == 0) {
                //     setUser(null);
                //     setMessage('Nie znaleziono użytkownika');
                // } else {
                //     setUser(data);
                //     setMessage(null);
                // }
                setUser(data);
                setIsLoading(true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setIsLoading(true);
            });
    }, [id]);

    if(isAuthenticated()){
        return (
            <main>
                <h2>{ t('user.details') }</h2>
                {!isLoading ? <p>{ t('user.loading') }</p> : '' }
                { error ? <p>{ t('user.error') }</p> : '' }
                { Object.keys(user).length !== 0 ? 
                    <div>
                        <p>{ t('user.table.name') } { user.firstname }</p>
                        <p>{ t('user.table.surname') } { user.lastname }</p>
                        <p>{ t('user.table.email') } { user.email }</p>
                        <p>{ t('user.table.phone') } { user.phonenumber ? user.phonenumber : t('user.nophone') }</p>
                    </div>
                : <p style={{ textAlign: 'center' }}>{ t('user.noUser') }</p> }
                <h2>{ t('rentals.details') }</h2>
                { user.games?.length > 0 && 
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>{ t('game.table.name') }</th>
                            <th>{ t('game.table.description') }</th>
                            <th>{ t('game.table.length') }</th>
                            <th>{ t('game.table.releaseDate') }</th>
                            <th>{ t('rentals.table.toWhen') }</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.games.map(game => (
                                <tr key={game.id}>
                                    <td><Link to={`/games/details/${game.id}`}>{game.games.name}</Link></td>
                                    <td>{game.games.description}</td>
                                    <td>{game.games.length}</td>
                                    <td>{getFormattedDate(game.games.release_date)}</td>
                                    <td>{getFormattedDate(game.to_when)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                }
                {
                    user.games?.length === 0 && <p style={{ textAlign: 'center' }}>{ t('user.noGamesUser') }</p>
                }
                <div className="form-buttons" style={{ width: '10%' }}>
                    <Link to="/users" className="button-back">{ t('form.actions.return') }</Link>
                </div>
            </main>
        )
    } else {
        return (
            <main>
                <h2>{ t('user.details') }</h2>
                <p>{ t('auth.blocked') } </p>
            </main>
        )
    }
}