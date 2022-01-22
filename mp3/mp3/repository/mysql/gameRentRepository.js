const db = require('../../config/mysql/db');
const historyData = require('../../config/mysql/historyData');

exports.getGameRents = () => {
    return db.promise().query(`select gr.id as grid, gr.game_count, gr.to_when, user.id as uid, user.email, user.firstname, user.lastname, user.phonenumber, game.id as gid, game.name, game.description, game.release_date, game.length
    from games_user gr
    left join user on gr.user_id = user.id
    left join game on gr.game_id = game.id`)
        .then((results, fields) => {
            // console.log(results[0]);
            // return results[0];
            const gameRents = [];
            for(let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const gameRent = {
                    id: row.grid,
                    to_when: row.to_when,
                    game_count: row.game_count,
                    user: {
                        id: row.uid,
                        email: row.email,
                        firstname: row.firstname,
                        lastname: row.lastname,
                        phonenumber: row.phonenumber,
                    },
                    game: {
                        id: row.gid,
                        name: row.name,
                        description: row.description,
                        release_date: row.release_date,
                        length: row.length
                    }
                }
                gameRents.push(gameRent);
            }
            return gameRents;
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
                },
                games: {
                    id: firstRow.gid,
                    name: firstRow.name,
                    description: firstRow.description,
                    release_date: firstRow.release_date,
                    length: firstRow.length
                }
            }
            return gameRent;
        })
};

exports.createGameRent = (gameRent) => {
    console.log('gameRent', gameRent);
    const sql = `INSERT INTO games_user (user_id, game_id, game_count, to_when) VALUES (?, ?, ?, ?)`;
    return db.promise().query(sql, [gameRent.user_id, gameRent.game_id, gameRent.game_count, gameRent.to_when])
    .then(res => {
        let user;
        let game;
        db.promise().query('SELECT * FROM USER WHERE id = ?', [gameRent.user_id])
        .then(results => {
            user = results[0][0];
            db.promise().query('SELECT * FROM GAME WHERE id = ?', [gameRent.game_id])
            .then(r => {
                game = r[0][0];
                db.promise().query('INSERT INTO HISTORY (user, game, operation, space, email) VALUES (?, ?, ?, ?, ?)', [`${user.firstname} ${user.lastname}`, `${game.name}` , historyData.CREATE, 'gameRent', rent.email]);
            })
        })
        return res;
    })
};

exports.updateGameRent = (gameRent) => {
    console.log(gameRent);
    const sql = `UPDATE games_user SET user_id = ?, game_id = ?, game_count = ?, to_when = ? WHERE id = ?`;
    return db.promise().query(sql, [gameRent.user_id, gameRent.game_id, gameRent.game_count, gameRent.to_when, gameRent.id])
    .then(res => {
        let user;
        let game;
        db.promise().query('SELECT * FROM USER WHERE id = ?', [gameRent.user_id])
        .then(results => {
            user = results[0][0];
            db.promise().query('SELECT * FROM GAME WHERE id = ?', [gameRent.game_id])
            .then(r => {
                game = r[0][0];
                db.promise().query('INSERT INTO HISTORY (user, game, operation, space, email) VALUES (?, ?, ?, ?, ?)', [`${user.firstname} ${user.lastname}`, `${game.name}` , historyData.UPDATE, 'gameRent', user.email]);
            })
        })
        return res;
    })
};

exports.deleteGameRent = (id) => {
    const sql = `DELETE FROM games_user WHERE id = ?`;
    
    let rent
    return db.promise().query('select firstname, lastname, name, email from games_user gr left join user u on gr.user_id = u.id left join game g on gr.game_id = g.id where gr.id = ?', [id])
        .then(r => {
            rent = r[0][0];
            console.log('rent', rent);
            db.promise().query('INSERT INTO HISTORY (user, game, operation, space, email) VALUES (?, ?, ?, ?, ?)', [`${rent.firstname} ${rent.lastname}`, `${rent.name}` , historyData.DELETE, 'gameRent', rent.email]);
          
            return db.promise().query(sql, [id])
            .then(res => {
                return res;
            })
        })
};

exports.deleteManyGameRents = (ids) => {
    const sql = `DELETE FROM games_user WHERE id IN (?)`;
    return db.promise().query(sql, [ids])
}