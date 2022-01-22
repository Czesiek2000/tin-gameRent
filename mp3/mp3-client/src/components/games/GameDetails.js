import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom"
import { getGameDetailsApiCalls } from "../../api/gamesApiCalls"
import { isAuthenticated } from "../../helpers/authHelper";
import { getFormattedDate } from "../../helpers/dateHelper"

export default function GameDetails() {
    const { t } = useTranslation();
    let { id } = useParams();
    id = parseInt(id);
    const [game, setGame] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getGameDetailsApiCalls(id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setGame(data);
                setIsLoading(true);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(true);
                setError(error);
            });
    }, []);
    if(isAuthenticated()){
        return (
            <div>
                <main>
                    <h2>{ t('game.details') }</h2>
                    <p>{ t('game.table.name') }: { game.name }</p>
                    <p>{ t('game.table.description') }: { game.description }</p>
                    <p>{ t('game.table.length') }: { game.length }</p>
                    <p>{ t('game.table.releaseDate') }: { getFormattedDate(game.release_date) }</p>
                    <h2>{ t('user.details') }</h2>
                    { game.users?.length !== 0 &&
                    <table className="table-list">
                        <thead>
                            <tr>
                                <th>{ t('rentals.table.username') }</th>
                                <th>{ t('user.table.email') }</th>
                                <th>{ t('user.table.phone') }</th>
                                <th>{ t('rentals.table.toWhen') }</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                game.users?.map(user => (
                                    <tr key={user.id}>
                                        <td><Link to={`/users/details/${user.id}`}>{`${user.user.firstname} ${user.user.lastname}`}</Link></td><td>{user.user.email}</td>
                                        <td>{user.user.phonenumber}</td>
                                        <td>{getFormattedDate(user.to_when)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    }
                    {
                        game.users?.length === 0 &&
                        <p>{ t('game.noUserGame') }</p>
                    }
                    <div className="form-buttons" style={{ width: '10%' }}>
                        <Link to="/games" className="button-back">{ t('form.actions.return') }</Link>
                    </div>
                </main>
            </div>        
        )
    }else {
        return (
            <main>
                <h2>{ t('game.details') }</h2>
                <p>{ t('auth.blocked') }</p>
            </main>
        )
    }
}