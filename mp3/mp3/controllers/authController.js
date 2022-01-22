const userRepository = require('../repository/mysql/userRepository');
const authUtils = require('../util/authUtlis');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    userRepository.findByEmail(email)
        .then(userRow => {
            const user = userRow[0][0];
            console.log(user);
            if(!user) {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Niepoprawny adres email lub hasło',
                    message: 'Niepoprawny adres email lub hasło'
                });
            } else if(password == user.password) {
                console.log('here');
                req.session.loggedUser = user;
                res.redirect('/');
            } else if(authUtils.comparePasswords(password, user.password)) {
                req.session.loggedUser = user;
                console.log('user logged', user);
                res.redirect('/');
            }else {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Niepoprawny adres email lub hasło',
                    message: 'Niepoprawny adres email lub hasło'
                })
            }

            })
            .catch(err => {
                console.log(err)
            })
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/?message=Wylogowano pomyślnie');
}
