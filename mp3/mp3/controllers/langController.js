const i18n = require('i18n');

exports.changeLang = (req, res, next) => {
    const newLang = req.params.lang;
    if(['pl', 'en'].includes(newLang)){
        res.cookie('game-rent-lang', newLang);
    }
    
    // res.redirect('/');
    res.redirect('back');

}