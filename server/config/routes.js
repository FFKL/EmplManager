const userController = require('../controllers/userController');
const emplController = require('../controllers/employeeController');
const bearerMiddleware = require('./middlewares/bearer');

module.exports = (app, passport) => {

    app.post('/login', passport.authenticate('local'), userController.login);
    app.post('/logout', userController.logout);
    app.post('/reg', userController.register);

    app.get('/', (req, res) => {
        res.sendfile('./public/index.html')
    });

    app.all('/api/*', bearerMiddleware);

    app.route('/api');
    app.get('/api/empl/', emplController.read);
    app.post('/api/empl/', emplController.create);
    app.post('/api/empl/:id/time/', emplController.addTime);
    app.put('/api/empl/:id', emplController.updateEmpl);
    app.put('/api/empl/:id/time/:timeId', emplController.updateTime);
    app.delete('/api/empl/:id', emplController.delete);
    app.delete('/api/empl/:id/time/:timeId', emplController.deleteTime);
};