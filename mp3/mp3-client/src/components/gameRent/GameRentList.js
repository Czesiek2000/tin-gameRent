import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { getGameRentApiCalls } from "../../api/gameRentApiCalls";
import { getFormattedDate } from "../../helpers/dateHelper";

export default function GameRentList() {
    const [gameRents, setGameRents] = useState({});
    const { t } = useTranslation();
    const history = useHistory();
    const [error, setError] = useState("");

    const deleteRent = (id) => {
        fetch(`http://localhost:3005/api/gameRent/${id}`, {
            method: "DELETE",
        })
            .then(response => {
                console.log(response);
                history.push({
                    pathname: "/gameRent",
                    state: { notice: t('rentals.delete.success') }
                });
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                history.push({
                    pathname: "/gameRent",
                    state: { notice: t('gameRent.delete.erorr') }
                })
                window.location.reload();
            });
    }

    useEffect(() => {
        getGameRentApiCalls()
            .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setGameRents(data);
                })
                .catch(error => {
                    setError(error);
                    console.log(error);
                });
    }, [])

    return (
        <main>
            <h1>{ t('rentals.header') }</h1>
            {error && <p>{error}</p>}
            { gameRents.length > 0 &&
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{ t('rentals.table.username') }</th>
                        <th>{ t('rentals.table.phone') }</th>
                        <th>{ t('rentals.table.gameTitle') }</th>
                        <th>{ t('rentals.table.gameCount') }</th>
                        <th>{ t('rentals.table.toWhen') }</th>
                        <th>{ t('list.actions.title') }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gameRents.map(gameRent => (
                            <tr key={gameRent.id}>
                                <td>{gameRent.user.firstname} {gameRent.user.lastname}</td>
                                <td>{gameRent.user.phonenumber}</td>
                                <td>{gameRent.game.name}</td>
                                <td>{gameRent.game_count}</td>
                                <td>{getFormattedDate(gameRent.to_when)}</td>
                                <td>
                                    <ul className="list-action">
                                        <li>
                                            <Link to={`/gameRent/details/${gameRent.id}`} className="list-action-button-details">{ t('list.actions.details') }</Link>
                                        </li>
                                        <li>
                                            <Link to={`/gameRent/edit/${gameRent.id}`} className="list-action-button-edit">{ t('list.actions.edit') }</Link>
                                        </li>
                                        <li>
                                            <button className="list-action-button-delete" onClick={() => deleteRent(gameRent.id)}>
                                                { t('list.actions.delete') }
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            }
            {
                gameRents.length === 0 && <p>{t('rentals.noRental')}</p>
            }
            <p className="section-buttons">
                <a href="/gameRent/add" className="button-add">{ t('rentals.add') }</a>
            </p>
        </main>


    )
}