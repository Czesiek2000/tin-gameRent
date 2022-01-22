const gameRepository = require('../repository/mysql/gameRepository');

exports.showGames = (req, res, next) => {
    let message = req.query.message;
    gameRepository.getGames()
        .then(games => {
            res.render('pages/gra/list', { navLocation: 'game', games: games, message: message, pageTitle: req.__('game.list.title') });
        })
}

exports.showGameAddForm = (req, res, next) => {
    res.render('pages/gra/form', { 
        navLocation: 'game',
        game: {},
        pageTitle: req.__('game.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('game.form.add.btnLabel'),
        formAction: '/games/add',
        validationErrors: []
    });
}

exports.showEditGameForm = (req, res, next) => {
    const gameId = req.params.id;
    gameRepository.getGameById(gameId)
        .then(game => {
            console.log(game);
            res.render('pages/gra/form', { 
                navLocation: 'game',
                game: game,
                pageTitle: req.__('game.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('game.form.edit.btnLabel'),
                formAction: `/games/edit`,
                validationErrors: []
            });
        })
}

exports.showGameDetails = (req, res, next) => {
    const gameId = req.params.id;
    gameRepository.getGameById(gameId)
        .then(game => {
            console.log(game);
            res.render('pages/gra/details', { 
                navLocation: 'game',
                game: game,
                pageTitle: req.__('game.form.details.pageTitle'),
                formAction: '',
                formMode: 'showDetails',
            });
        })
}

exports.addGame = (req, res, next) => {
    const gameData = {...req.body};
    console.log('added', gameData);
    gameRepository.createGame(gameData)
        .then(game => {
            res.redirect('/games?message='+ req.__('game.form.confirm.text'));
        })
        .catch(err => {
            res.render('pages/gra/form', {
                navLocation: 'game',
                game: gameData,
                pageTitle: 'Dodaj gre',
                formMode: 'createNew',
                btnLabel: 'Dodaj gre',
                formAction: '/games/add',
                validationErrors: err.details
            });
        })
}

exports.updateGame = (req, res, next) => {
    const gameData = {...req.body};
    const gameId = req.body.id;
    console.log({ gameData: gameData, gameId: gameId });
    gameRepository.updateGame(gameId, gameData)
        .then(() => {
            res.redirect('/games?message='+ req.__('game.form.update.confirm.text'));
        })
        .catch(err => {
            res.render('pages/gra/form', {
                game: gameData,
                pageTitle: 'Edycja gry',
                formMode: 'edit',
                btnLabel: 'Edytuj gre',
                formAction: '/games/edit',
                navLocation: 'game',
                validationErrors: err.details
            });
        })
}

exports.deleteGame = (req, res, next) => {
    const gameId = req.params.id;
    gameRepository.deleteGame(gameId)
        .then(() => {
            res.redirect('/games?message='+ req.__('game.form.delete.confirm.text'));
        })
}