const userController = require('../controllers/userController');
const emplController = require('../controllers/employeeController');
const timeController = require('../controllers/timeController');
const bearerMiddleware = require('./middlewares/bearer');

module.exports = (app, passport) => {

    app.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            res.json(req.user)
        });

    app.get('/login', userController.login);
    app.get('/logout', userController.logout);
    app.post('/reg', userController.register);

    app.get('/', (req, res) => {
        res.sendfile('./public/index.html')
    });

    app.all('/api/*', bearerMiddleware);

    app.get('/login', userController.login);
    app.get('/logout', userController.logout);
    app.post('/reg', userController.register);

    app.route('/api');
    app.get('/api/empl/', emplController.read);
    app.post('/api/empl/', emplController.create);
    app.put('/api/empl/:id', emplController.update);
    app.delete('/api/empl/:id', emplController.delete);

    app.get('/api/time/', timeController.read);
    app.post('/api/time/', timeController.create);
    app.put('/api/time/:id', timeController.update);
    app.delete('/api/time/:id', timeController.delete);
};