const userRepository = require('../repository/mysql/userRepository');

exports.getUsers = (req, res, next) => {
    userRepository.getUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            next(err);
        });
}

exports.getUserById = (req, res, next) => {
    userRepository.getUserById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            next(err);
        });
}

exports.createUser = (req, res, next) => {
    userRepository.createUser(req.body)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            next(err);
        });
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.id;
    userRepository.updateUser(userId, req.body)
        .then(result => {
            res.json({message: 'Użytkownik pomyslnie zaktualzowany', user: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            next(err);
        });
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    userRepository.deleteUser(userId)
        .then(result => {
            res.json({message: 'Uzytkownik pomyslnie zaktualizowany', user: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            next(err);
        }
    ); 
}