const gameRepository = require('../repository/mysql/gameRepository');

exports.getGames = (req, res, next) => {
    gameRepository.getGames()
        .then(games => {
            res.json(games);
        })
        .catch(err => {
            next(err);
        });
}


exports.getGameById = (req, res, next) => {
    gameRepository.getGameById(req.params.id)
        .then(game => {
            res.json(game);
        })
        .catch(err => {
            // next(err);
            res.status(err.statusCode).send(err.details);
        });
}

exports.createGame = (req, res, next) => {
    gameRepository.createGame(req.body)
        .then(game => {
            res.json(game);
        })
        .catch(err => {
            console.log('game err', err);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            res.status(err.statusCode).send(err.details);
            // next(err);
        });
}

exports.updateGame = (req, res, next) => {
    const gameId = req.params.id;
    gameRepository.updateGame(gameId, req.body)
        .then(result => {
            res.status(200).json({message: 'Game updated successfully', game: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            res.status(err.statusCode).send(err.details);
            // next(err);
        });
}

exports.deleteGame = (req, res, next) => {
    const gameId = req.params.id;
    gameRepository.deleteGame(gameId)
        .then(result => {
            res.status(200).json({message: 'Game deleted successfully', game: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            next(err);
        }
    );
}