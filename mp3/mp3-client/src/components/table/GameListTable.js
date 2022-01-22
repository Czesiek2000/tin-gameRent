import { useTranslation } from "react-i18next";
import GameListTableRow from "./GameListTableRow";

export default function GameListTable(props) {
    const { games } = props;
    const { t } = useTranslation();

    return (
        <>
            { games.length !== 0 &&
                <table className="table-list">
                <thead>
                    <tr>
                        <th>{ t('game.table.name') }</th>
                        <th>{ t('game.table.description') }</th>
                        <th>{ t('game.table.length') }</th>
                        <th>{ t('game.table.releaseDate') }</th>
                        <th>{ t('list.actions.title') }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        games.map(game => (
                            <GameListTableRow key={game.id} game={game} />
                        ))
                    }
                </tbody>
            </table>
            }
            {
                games.length === 0 && <p>{ t('game.noGame') }</p>
            }
        </>
    )
}