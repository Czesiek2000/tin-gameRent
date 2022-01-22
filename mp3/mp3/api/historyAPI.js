const historyRepository = require('../repository/mysql/historyRepository');

exports.getHistory = (req, res, next) => {
    historyRepository.getHistory()
        .then(history => {
            res.json(history);
        })
        .catch(err => {
            next(err);
        });
};