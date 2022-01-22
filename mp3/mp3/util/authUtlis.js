const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlan) => {
    const passHashed = bcrypt.hashSync(passPlan, salt);
    return passHashed;
}

exports.comparePasswords = (passPlan, passHash) => {
    const res = bcrypt.compareSync(passPlan, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    console.log('user logged', loggedUser);
    if(loggedUser){
        next();
    }else {
        res.redirect('/?message=Nie masz uprawnień do tej strony');
        // throw new Error('Unauthorized access');
    }
}