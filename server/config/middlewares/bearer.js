const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('bearer', {session: false},
        (err, user) => {
            if (!user) {
                res.send(401);
            } else {
                next();
            }
        }
    )(req, res, next);
};