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
            console.log('server id', user);
            res.json(user);
        })
        .catch(err => {
            res.header('Content-Type', 'application/json');
            console.log('server err id', err);
            res.status(err.statusCode).send(err.details);
        });
}

exports.createUser = (req, res, next) => {
    userRepository.createUser(req.body)
        .then(user => {
            console.log(user);
            
            res.json(user);
        })
        .catch(err => {
            console.log('err api', err);
            // res.header('Content-Type', 'application/json');
            // console.log('server err details', res);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            res.status(err.statusCode).send(err.details);
            // next();
        });
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.id;
    userRepository.updateUser(userId, req.body)
        .then(result => {
            console.log(req.body);
            res.json({message: 'Użytkownik pomyslnie zaktualzowany', user: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            if(err.statusCode === 500) {
                res.status(err.statusCode).send(err.details);
            } else {
                next(err);
            }
        });
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    userRepository.deleteUser(userId)
    .then(result => {
            console.log('result', result);
            res.json({message: 'Uzytkownik pomyslnie usuniety'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            
            console.log('err api', err);
            console.log('err status', err.statusCode);
            // res.status(err.statusCode).send(err);
            next(err);
        }
    ); 
}