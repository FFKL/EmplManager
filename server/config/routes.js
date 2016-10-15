const userController = require('../controllers/userController');
const emplController = require('../controllers/employeeController');
const timeController = require('../controllers/timeController');

module.exports = (app, passport) => {

    app.get('/', (req, res) => { res.redirect('/user')});
    app.post('/login',
        passport.authenticate('local'),
        function(req, res) {
            res.json(req.user)
        });

    app.get('/login', userController.login);
    app.get('/logout', userController.logout);
    app.post('/reg', userController.register);

    app.get('/user', (req, res) => { res.render('index', {user: req.user}) });

    app.get('/', (req, res) => {
        res.sendfile('./public/indextest.html')
    });

    app.all('/api/*', function(req, res, next) {
        passport.authenticate('bearer', {session: false},
            function(err, user, info) {
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
    });

    app.get('/login', userController.login);
    app.get('/logout', userController.logout);
    app.post('/reg', userController.register);

    app.get('/api/empl/', emplController.read);
    app.post('/api/empl/', emplController.create);
    app.put('/api/empl/:id', emplController.update);
    app.delete('/api/empl/:id', emplController.delete);

    app.get('/api/time/', timeController.read);
    app.post('/api/time/', timeController.create);
    app.put('/api/time/:id', timeController.update);
    app.delete('/api/time/:id', timeController.delete);
};