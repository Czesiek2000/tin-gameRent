import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getFormattedDate } from "../../helpers/dateHelper";

export default function GameListTableRow({ game }) {
    const { t } = useTranslation();
    const history = useHistory();
    const deleteGame = (id) => {
        fetch(`http://localhost:3005/api/games/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            history.push({
                pathname: "/games",
                state: { notice: t('game.delete.success') }
            });
            window.location.reload();
        })
        .catch(() => {
            history.push({
                pathname: "/games",
                state: { notice: t('game.delete.erorr') }
            })
            window.location.reload();
        })
    }

    return (
        <tr key={game.id}>
            <td>{game.name}</td>
            <td>{game.description}</td>
            <td>{game.length}</td>
            <td>{getFormattedDate(game.release_date)}</td>
            <td>
                <ul className="list-action">
                    <li>
                        <Link to={`/games/details/${game.id}`} className="list-action-button-details">{ t('list.actions.details') }</Link>
                    </li>
                    <li>
                        <Link to={`/games/edit/${game.id}`} className="list-action-button-edit">{ t('list.actions.edit') }</Link>
                    </li>
                    <li>
                        <button className="list-action-button-delete" onClick={() => deleteGame(game.id)}>{ t('list.actions.delete') }</button>
                    </li>
                </ul>
            </td>
        </tr>
    )
}