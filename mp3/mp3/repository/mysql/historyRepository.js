const db = require('../../config/mysql/db');

exports.getHistory = (req, res, next) => {
    return db.promise().query('SELECT history.id, history.user, history.game, historydata.name, history.email, history.space FROM HISTORYDATA join history on history.operation = historydata.id')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch((err) => {
            console.log(err);
        });
};