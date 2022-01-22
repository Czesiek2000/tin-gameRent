const db = require('../../config/mysql/db');
const userSchema = require('../../model/joi/User');

exports.getUsers = () => {
    return db.promise().query('SELECT * FROM user')
        .then((results, fields) => {
            console.log(results[0][5]);
            return results[0];
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getUserById = (id) => {
    const query = `select u.id as id, u.firstname, u.lastname, u.email, u.phonenumber, g.id as gid, g.name, g.description, g.release_date, g.length, gu.id guid, gu.user_id, gu.game_id, gu.game_count,
    gu.to_when from user u
    left join games_user as gu on u.id = gu.user_id
    left join game as g on g.id = gu.game_id
    where u.id = ?`;
    return db.promise().query(query, [id])
        .then((results, fields) => {
            const firstRow = results[0][0];
            console.log('firstRow', firstRow);
            if (!firstRow) {
                return {};
            }
            const user = {
                id: firstRow.id,
                firstname: firstRow.firstname,
                lastname: firstRow.lastname,
                email: firstRow.email,
                phonenumber: firstRow.phonenumber,
                games: []
            }

            for(let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if(row.guid) {
                    const user_game = {
                        id: row.guid,
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
                    user.games.push(user_game);
                }
            }
            return user;
        })
};

exports.createUser = (user) => {
    console.log(user);
    const vRes = userSchema.validate(user, { abortEarly: false });
    if(vRes.error){ 
        console.log('here ', vRes.error);
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(user.email)
    .then(emailErr => {
        console.log('emailErr ', emailErr);
        if(emailErr){
            return Promise.reject(emailErr);
        }else {
            const firstname = user.firstname;
            const lastname = user.lastname;
            const email = user.email;
            const phonenumber = user.phonenumber;
            const query = `insert into user (firstname, lastname, email, phonenumber) values (?, ?, ?, ?)`;
            return db.promise().execute(query, [firstname, lastname, email, phonenumber])
        }
    })
    .catch(err => {
        console.log('catch', err);
        return Promise.reject(err)
    });
};

exports.updateUser = (id, user) => {
    const vRes = userSchema.validate(user, { abortEarly: false });
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(user.email, id)
        .then(emailErr => {
            if(emailErr){
                return Promise.reject(emailErr);
            }else {
                const firstname = user.firstname;
                const lastname = user.lastname;
                const email = user.email;
                const phonenumber = user.phonenumber;
                const query = `update user set firstname = ?, lastname = ?, email = ?, phonenumber = ? where id = ?`;
                return db.promise().execute(query, [firstname, lastname, email, phonenumber, id])
            }
        })
        .catch(err => {
            return Promise.reject(err)
        });
};

exports.deleteUser = (id) => {
    const sql1 = `DELETE FROM games_user WHERE user_id = ?`;
    const sql2 = `DELETE FROM user WHERE id = ?`;

    return db.promise().query(sql1, [id])
        .then(() => {
            return db.promise().query(sql2, [id])
        })
};

checkEmailUnique = (email, id) => {
    let promise;
    if(id){
        const sql = `select count(1) as c from user where id != ? and email = ?`;
        promise = db.promise().query(sql, [id, email]);
    }else {
        const sql = `select count(1) as c from user where email = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = null;
        console.log(count);
        if(count > 0){
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany email jest juz uzywany'
                }]
            }
        }
        return err;
    });
}