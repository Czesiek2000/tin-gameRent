const db = require('../../config/mysql/db');

exports.getGameRents = () => {
    return db.promise().query(`select gr.id as grid, gr.game_count, gr.to_when, user.id as uid, user.email, user.firstname, user.lastname, user.phonenumber, game.id as gid, game.name, game.description, game.release_date, game.length
    from games_user gr
    left join user on gr.user_id = user.id
    left join game on gr.game_id = game.id`)
        .then((results, fields) => {
            // results[0].forEach(row => console.log(row.to_when));
            return results[0];
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getGameRentById = (id) => {
    const query = `select gr.id as grid, gr.game_count, gr.to_when, user.id as uid, user.email, user.firstname, user.lastname, user.phonenumber, game.id as gid, game.name, game.description, game.release_date, game.length
    from games_user gr
    left join user on gr.user_id = user.id
    left join game on gr.game_id = game.id
    where gr.id = ?`;
    return db.promise().query(query, [id])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }

            const gameRent = {
                id: firstRow.grid,
                user_id: firstRow.uid,
                game_id: firstRow.gid,
                game_count: firstRow.game_count,
                to_when: firstRow.to_when,
                user: {
                    id: firstRow.uid,
                    firstname: firstRow.firstname,
                    lastname: firstRow.lastname,
                    email: firstRow.email,
                    phonenumber: firstRow.phonenumber,
                    games: []
                }
            }

            for(let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if(row.gid) {
                    const user_game = {
                        id: row.gid,
                        user_id: row.user_id,
                        game_id: row.game_id,
                        game_count: row.game_count,
                        to_when: row.to_when,
                        games: {
                            id: row.gid,
                            name: row.name,
                            description: row.description,
                            release_date: row.release_date,
                            length: row.length
                        }
                    }
                    gameRent.user.games.push(user_game);
                }
            }
            return gameRent;
        })
};

exports.createGameRent = (gameRent) => {
    console.log('gameRent', gameRent);
    const sql = `INSERT INTO games_user (user_id, game_id, game_count, to_when) VALUES (?, ?, ?, ?)`;
    return db.promise().query(sql, [gameRent.user_id, gameRent.game_id, gameRent.game_count, gameRent.to_when])
};

exports.updateGameRent = (gameRent) => {
    console.log(gameRent);
    const sql = `UPDATE games_user SET user_id = ?, game_id = ?, game_count = ?, to_when = ? WHERE id = ?`;
    return db.promise().query(sql, [gameRent.user_id, gameRent.game_id, gameRent.game_count, gameRent.to_when, gameRent.id])
};

exports.deleteGameRent = (id) => {
    const sql = `DELETE FROM games_user WHERE id = ?`;
    return db.promise().query(sql, [id])
};

exports.deleteManyGameRents = (ids) => {
    const sql = `DELETE FROM games_user WHERE id IN (?)`;
    return db.promise().query(sql, [ids])
}