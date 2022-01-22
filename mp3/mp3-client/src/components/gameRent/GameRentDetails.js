import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getGameRentDetailsApiCalls } from "../../api/gameRentApiCalls";
import { getFormattedDate } from "../../helpers/dateHelper";

export default function GameRentDetails({ match }) {
    const gameRent = parseInt(match.params.id);
    const [gameRentDetails, setGameRentDetails] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        getGameRentDetailsApiCalls(gameRent)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(Object.keys(data).length === 0) {
                    setGameRentDetails(null);
                } else {
                    setGameRentDetails(data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <main>
            <h1>{ t('rentals.details') }</h1>
            { gameRentDetails !== null ?
                <div>
                    <p>{ t('rentals.table.username') }: {gameRentDetails.user.firstname} {gameRentDetails.user.lastname}</p>
                    <p>{ t('rentals.table.phone') }: {gameRentDetails.user.phonenumber}</p>
                    <p>{ t('rentals.table.gameTitle') }: {gameRentDetails.games.name}</p>
                    <p>{ t('rentals.table.gameCount') }: {gameRentDetails.game_count}</p>
                    <p>{ t('rentals.table.toWhen') }: {getFormattedDate(gameRentDetails.to_when)}</p>
                </div>
                
                : <p>Brak wypożyczeń</p>
            }
            <div className="section-buttons">
                <Link to="/gameRent" className="button-back">{ t('form.actions.return') }</Link>
            </div>
        </main>
    )
}