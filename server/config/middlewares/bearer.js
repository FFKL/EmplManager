const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('bearer', {session: false},
        (err, user, info) => {
            console.log(err, user, info);
            if (!user) {
                res.status(401);
                res.setHeader('Location', '/api/login');
                res.end()
            } else {
                next();
            }
        }
    )(req, res, next);
};