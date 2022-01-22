const gameRentRepository = require('../repository/mysql/gameRentRepository');

exports.getGameRents = (req, res, next) => {
    gameRentRepository.getGameRents()
        .then(gameRents => {
            res.json(gameRents);
        })
        .catch(err => {
            next(err);
        });
}

exports.getGameRentById = (req, res, next) => {
    gameRentRepository.getGameRentById(req.params.id)
        .then(gameRent => {
            res.json(gameRent);
        })
        .catch(err => {
            next(err);
        });
}