const userRepository = require('../repository/mysql/userRepository');
const config = require('../config/auth/key');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    userRepository.findByEmail(email)
        .then((u) => {
            const user = u[0][0];
            console.log('user: ', user);
            if(!user){
                return res.status(401).send({ message: "Nieprawidłowy email lub hasło" });
            }

            if(password == user.password){
                const token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: '30m'
                });
                return res.status(200).send({token, userId: user.id, name: user.firstname + ' ' + user.lastname, role: user.role}) 
            }

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if(!isEqual){
                        return res.status(401).send({ message: "Nieprawidłowy email lub hasło" });
                    }
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user.id,
                        },
                        config.secret,
                        { expiresIn: '1h' }
                    )
                    res.status(200).send({token: token, userId: user.id, name: user.firstname + ' ' + user.lastname, role: user.role});
                })
                .catch(err => {
                    console.log(err);
                    res.status(501)
                })
        })
}