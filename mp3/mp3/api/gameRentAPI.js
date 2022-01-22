const gameRentRepository = require('../repository/mysql/gameRentRepository');

exports.getGameRents = (req, res, next) => {
    gameRentRepository.getGameRents()
        .then(gameRents => {
            // console.log('gameRent', gameRents);
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

exports.createGameRent = (req, res, next) => {
    gameRentRepository.createGameRent(req.body)
        .then(gameRent => {
            res.json(gameRent);
        })
        .catch(err => {
            next(err);
        });
}

exports.updateGameRent = (req, res, next) => {
    console.log(req.params.id, req.body);
    gameRentRepository.updateGameRent(req.body)
        .then(gameRent => {
            res.json(gameRent);
        })
        .catch(err => {
            next(err);
        });
}

exports.deleteGameRent = (req, res, next) => {
    gameRentRepository.deleteGameRent(req.params.id)
        .then(gameRent => {
            res.json(gameRent);
        })
        .catch(err => {
            next(err);
        });
}