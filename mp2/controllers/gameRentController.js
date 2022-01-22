const userRepository = require('../repository/mysql/userRepository');
const gameRepository = require('../repository/mysql/gameRepository');
const gameRentRepository = require('../repository/mysql/gameRentRepository');
exports.showGameRent = (req, res, next) => {
    let message = req.query.message;
    gameRentRepository.getGameRents()
        .then(gameRents => {
            res.render('pages/wypozyczonegry/list', { 
                navLocation: 'gameRent',
                gameRents: gameRents,
                message: message
            });
        })
}

exports.showGameRentAddForm = (req, res, next) => {
    let allGames, allUsers;
    userRepository.getUsers()
        .then(users => {
            allUsers = users;
            return gameRepository.getGames();
        })
        .then(games => {
            allGames = games;
            res.render('pages/wypozyczonegry/form', {
                gameRent: {},
                navLocation: 'gameRent',
                allGames: allGames,
                allUsers: allUsers,
                pageTitle: 'Nowe wypozyczenie',
                btnLabel: 'Dodaj wypozyczenie',
                formAction: '/gameRent/add',
                formMode: 'createNew'
            });
        })
}

exports.showGameRentEditForm = (req, res, next) => {
    const gameRentId = req.params.id;
    let allGames, allUsers, gameRents;
    gameRentRepository.getGameRentById(gameRentId)
        .then(gameRent => {
            gameRents = gameRent;
            return userRepository.getUsers();
        })
        .then(users => {
            allUsers = users;
            return gameRepository.getGames();
        })
        .then(games => {
            allGames = games;
            res.render('pages/wypozyczonegry/form', {
                gameRent: gameRents,
                allGames: allGames,
                allUsers: allUsers,
                navLocation: 'gameRent',
                pageTitle: 'Edycja wypozyczenia',
                btnLabel: 'Edytuj wypozyczenie',
                formAction: '/gameRent/edit',
                formMode: 'edit'
            });
        })
}

exports.showGameRentDetails = (req, res, next) => {
    const gameRentId = req.params.id;
    gameRentRepository.getGameRentById(gameRentId)
        .then(gameRent => {
            res.render('pages/wypozyczonegry/details', { 
                navLocation: 'gameRent',
                gameRent: gameRent,
            });
        })
}

exports.addGameRent = (req, res, next) => {
    const gameRentData = {...req.body};
    console.log('gameRentData', gameRentData);
    gameRentRepository.createGameRent(gameRentData)
        .then(gameRent => {
            res.redirect('/gameRent?message=Dodano wypozyczenie');
        })
}

exports.updateGameRent = (req, res, next) => {
    const gameRentData = {...req.body};
    console.log(gameRentData);
    gameRentRepository.updateGameRent(gameRentData)
        .then(gameRent => {
            res.redirect('/gameRent?message=Zaktualizowano wypozyczenie');
        })
};

exports.deleteGameRent = (req, res, next) => {
    const gameRentId = req.params.id;
    gameRentRepository.deleteGameRent(gameRentId)
        .then(gameRent => {
            res.redirect('/gameRent?message=Usunieto wypozyczenie');
        })
}