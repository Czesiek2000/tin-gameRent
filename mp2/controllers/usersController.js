const userRepository = require('../repository/mysql/userRepository');

exports.showUsers = (req, res, next) => {
    let message = req.query.message;
    userRepository.getUsers()
        .then(users => {
            res.render('pages/uzytkownik/list', { navLocation: 'users', users: users, message: message });
        })
}

exports.showUsersAddForm = (req, res, next) => {
    res.render('pages/uzytkownik/form', { 
        navLocation: 'users', 
        user: {}, 
        pageTitle: 'Nowy użytkownik', 
        formMode: 'createNew', 
        btnLabel: 'Dodaj użytkownika',
        formAction: '/users/add',
        validationErrors: []
    });
}

exports.showEditUserForm = (req, res, next) => {
    const userId = req.params.id;
    userRepository.getUserById(userId)
        .then(user => {
            console.log('user', user);
            res.render('pages/uzytkownik/form', { 
                navLocation: 'users', 
                user: user, 
                formMode: 'edit', 
                pageTitle: 'Edycja użytkownika', 
                btnLabel: 'Edytuj użytkownika',
                formAction: '/users/edit',
                validationErrors: []
            });
        })
}

exports.showUserDetails = (req, res, next) => {
    const userId = req.params.id;
    userRepository.getUserById(userId)
        .then(user => {
            console.log('user\n',user.games);
            res.render('pages/uzytkownik/details', { 
                navLocation: 'users', 
                user: user, 
                pageTitle: 'Szczegóły użytkownika',
                formAction: '',
                formMode: 'showDetails'
            });
        })
}

exports.addUser = (req, res, next) => {
    const userData = {...req.body};
    console.log(userData);
    userRepository.createUser(userData)
        .then(user => {
            console.log('redirected');
            res.redirect('/users?message=Użytkownik został dodany');
        })
        .catch(err => {
            console.log('add user ', err);
            
            // userData.user_games = user.games.user_games;
            res.render('pages/uzytkownik/form', {
                user: userData,
                pageTitle: 'Dodanie uzytkownika',
                formMode: 'createNew',
                btnLabel: 'Dodaj użytkownika',
                formAction: '/users/add',
                navLocation: 'users',
                validationErrors: err.details
            })
        })
};

exports.updateUser = (req, res, next) => {
    const userData = {...req.body};
    const userId = req.body.id;
    console.log(userData, userId);
    userRepository.updateUser(userId, userData)
        .then(user => {
            res.redirect('/users?message=Użytkownik został zaktualizowany');
        })
        .catch(err => {
            res.render('pages/uzytkownik/form', {
                user: userData,
                pageTitle: 'Edycja uzytkownika',
                formMode: 'edit',
                btnLabel: 'Edytuj użytkownika',
                formAction: '/users/edit',
                navLocation: 'users',
                validationErrors: err.details
            })
        })
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    userRepository.deleteUser(userId)
        .then(user => {
            res.redirect('/users?message=Użytkownik został usunięty');
        });
};
