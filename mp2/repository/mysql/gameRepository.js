const db = require('../../config/mysql/db');
const gameSchema = require('../../model/joi/Game');

exports.getGames = () => {
    return db.promise().query('SELECT * FROM game')
        .then((results, fields) => {
            return results[0];
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getGameById = (id) => {
    const query = `select g.id as gid, g.name, g.description, g.release_date, g.length, gr.id as guid, gr.user_id, gr.game_id, gr.game_count, gr.to_when, u.id as uid, u.email, u.firstname, u.lastname, u.phonenumber
    from game g
    left join games_user gr on gr.game_id = g.id
    left join user u on gr.user_id = u.id
    where g.id = ?`;
    return db.promise().query(query, [id])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            
            const game = {
                id: firstRow.gid,
                name: firstRow.name,
                description: firstRow.description,
                // release_date: firstRow.release_date,
                release_date: `${new Date(firstRow.release_date).getFullYear()}-${addZero(new Date(firstRow.release_date).getMonth() + 1)}-${addZero(new Date(firstRow.release_date).getDate())}`,
                length: firstRow.length,
                users: []
            };

            for(let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if(row.guid) {
                    const user_game = {
                        id: row.guid,
                        user_id: row.user_id,
                        game_id: row.game_id,
                        game_count: row.game_count,
                        to_when: row.to_when,
                        user: {
                            id: row.uid,
                            firstname: row.firstname,
                            lastname: row.lastname,
                            email: row.email,
                            phonenumber: row.phonenumber
                        }
                    }
                    game.users.push(user_game);
                }
            }
            return game;
        })
};

exports.createGame = (game) => {
    const vRes = gameSchema.validate(game, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkNameUnique(game.name)
        .then((err) => {
            if (err) {
                return Promise.reject(err);
            }else {
                const name = game.name;
                const description = game.description;
                const release_date = game.release_date;
                const length = game.length;
                const query = `INSERT INTO game (name, description, release_date, length) VALUES (?, ?, ?, ?)`;
                return db.promise().execute(query, [name, description, release_date, length])
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

exports.updateGame = (id, game) => {
    console.log('updateGame', id);
    const vRes = gameSchema.validate(game, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkNameUnique(game.name, id)
        .then((err) => {
            if (err) {
                return Promise.reject(err);
            }else {
                const name = game.name;
                const description = game.description;
                const release_date = game.release_date;
                const length = game.length;
                const query = `UPDATE game SET name = ?, description = ?, release_date = ?, length = ? WHERE id = ?`;
                return db.promise().query(query, [name, description, release_date, length, game.id])
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

exports.deleteGame = (id) => {
    const sql1 = `DELETE FROM games_user WHERE game_id = ?`;
    const sql2 = `DELETE FROM game WHERE id = ?`;
    return db.promise().query(sql1, [id])
        .then(() => {
            return db.promise().query(sql2, [id])
        })
};

function addZero(date) {
    return date < 10 ? '0' + date : date;
}

checkNameUnique = (name, id) => {
    console.log('unique id ', id);
    let promise;
    if(id){
        const sql = `SELECT COUNT(1) as c FROM game WHERE id != ? AND name = ?`;
        promise = db.promise().query(sql, [id, name]);
    }else {
        const sql = `SELECT COUNT(1) as c FROM game WHERE name = ?`;
        promise = db.promise().query(sql, [name]);
    }

    return promise.then((results, fields) => {
        const count = results[0][0].c
        let err = null;
        if(count > 0){
            err = {
                details: [{
                    path: ['name'],
                    message: 'Name already exists'
                }]
            }
        }
        return err;
    })

}