const userRepository = require('../repository/mysql/userRepository');

exports.showUsers = (req, res, next) => {
    let message = req.query.message;
    userRepository.getUsers()
        .then(users => {
            res.render('pages/uzytkownik/list', { navLocation: 'users', users: users, message: message, pageTitle: req.__('user.list.title') });
        })
}

exports.showUsersAddForm = (req, res, next) => {
    console.log('pageTitle', req.__('user.form.add.pageTitle'));
    res.render('pages/uzytkownik/form', { 
        navLocation: 'users', 
        user: {}, 
        pageTitle: req.__('user.form.add.pageTitle'), 
        formMode: 'createNew', 
        btnLabel: req.__('user.form.add.btnLabel'),
        formAction: '/users/add',
        validationErrors: []
    });
}

exports.showEditUserForm = (req, res, next) => {
    const userId = req.params.id;
    userRepository.getUserById(userId)
        .then(user => {
            console.log('user\n',user);
            res.render('pages/uzytkownik/form', { 
                navLocation: 'users', 
                user: user, 
                formMode: 'edit', 
                pageTitle: req.__('user.form.edit.pageTitle'), 
                btnLabel: req.__('user.form.edit.btnLabel'),
                formAction: '/users/edit',
                validationErrors: []
            });
        })
        .catch(err => {
            return { message: 'Uzytkownik nie znaleziony' };
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
                pageTitle: req.__('user.form.details.pageTitle'),
                formAction: '',
                formMode: 'showDetails'
            });
        })
}

exports.addUser = (req, res, next) => {
    const userData = {...req.body};
    console.log('user', userData);
    userRepository.createUser(userData)
        .then(user => {
            console.log('redirected');
            res.redirect('/users?message='+ req.__('user.notification.add.text'));
        })
        .catch(err => {
            res.render('pages/uzytkownik/form', {
                user: userData,
                pageTitle: req.__('user.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('user.form.add.btnLabel'),
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
            res.redirect('/users?message='+ req.__('user.notification.edit.text'));
        })
        .catch(err => {
            res.render('pages/uzytkownik/form', {
                user: userData,
                pageTitle: req.__('user.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('user.form.edit.btnLabel'),
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
            res.redirect('/users?message='+ req.__('user.notification.delete.text'));
        });
};
