import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import historyData from '../../helpers/historyData';

export default function HistoryList() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        fetch('http://localhost:3005/api/history')
            .then(res => res.json())
            .then(data => {
                setHistory(data);
                // console.log(data);
            })
    }, []);
    if(history.length !== 0) {
        return (
            <main>
                <h1>{ t('history.header') }</h1>
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>{ t('history.user') }</th>
                            <th>{ t('history.email') }</th>
                            <th>{ t('history.game') }</th>
                            <th>{ t('history.operation') }</th>
                            <th>{ t('history.table') }</th>
                        </tr>
                    </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <td>{item.user.length === 0 ? 'Brak uzytkownika' : item.user}</td>
                            <td>{item.email}</td>
                            <td>{item.game.length === 0 ? 'Brak gry' : item.game}</td>
                            <td>{item.name}</td>
                            <td>{item.space}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </main>
        )
    }else {
        return (
            <main>
                <h1>{ t('history.header') }</h1>
                <p>{ t('history.noRecords') }</p>
            </main>
        )

    }
}