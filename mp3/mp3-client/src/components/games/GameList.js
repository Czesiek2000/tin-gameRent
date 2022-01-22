import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { getGamesApiCalls } from "../../api/gamesApiCalls"
import GameListTable from "../table/GameListTable";

export default function GameList() {
    const location = useLocation();
    const history = useHistory();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        getGamesApiCalls()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setGames(data);
                setLoading(true);
            })
            .catch(error => {
                setError(error.message);
                console.log(error);
                setLoading(true);
            });

            const { state } = location;
            const notice = state && state.notice ? state.notice : '';
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
                message !== '' ? <p className="alert">{ message }</p> : ''
            }
            <h1>{ t('game.header') }</h1>
            { error ? <p>{ t('error') }: {error}</p> : '' }
            { !loading ? <p>{ t('game.loading') }</p> : <GameListTable games={games} />}
            <p className="section-buttons">
                <a href="/games/add" className="button-add">{ t('game.add') }</a>
            </p>
        </main>
    )
}