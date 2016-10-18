'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server/app'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Employee = mongoose.model('Employee');
chai.should();
chai.use(chaiHttp);

const REGISTER_DATA_ERROR = 'Login/password contains spaces or was empty';
let date = new Date;

describe('Registration tests', () => {
    before(function(done) {
        User.remove().exec();
        Employee.remove().exec();
        done();
    });

    it('Register with correct data', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'test', password: 'test'})
            .end((err, res) => {
                let regCheck = res.text.includes('test was registered');
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });
            });
    });
    it('Register with existing login', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'test', password: 'tes'})
            .end((err, res) => {
                let regCheck = res.text.includes('is existing. Enter another Login');
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });
            })
    });
    it('Register with spaces in login', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'test ', password: 'tes'})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });
            })
    });
    it('Register with spaces in password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'test', password: 'tes  '})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });
            })
    });
    it('Register with spaces in login and password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: ' ', password: ' '})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });
            })
    });
    it('Register with empty login', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: '', password: 'pass'})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });
            })
    });
    it('Register with empty password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: 'log', password: ''})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });

            })
    });
    it('Register with empty login and password', (done) => {
        chai.request(server)
            .post('/reg')
            .send({login: '', password: ''})
            .end((err, res) => {
                let regCheck = res.text.includes(REGISTER_DATA_ERROR);
                regCheck.should.be.true;
                User.count(function(err, count) {
                    count.should.equal(1);
                    done();
                });
            })
    });
});

describe('Authorization tests', () => {

    it('Auth with correct login/password', (done) => {
        chai.request.agent(server)
            .post('/login')
            .send({ login: 'test', password: 'test' })
            .end((err, res) => {
                let regCheck = res.text.includes('test');
                regCheck.should.be.true;
                done();
            });
    });

    it('Auth with correct login / wrong password', (done) => {
        chai.request.agent(server)
            .post('/login')
            .send({login: 'test', password: 'testt'})
            .end((err, res) => {
                res.text.includes('Unauthorized').should.be.true;
                done();
            });
    });
    it('Auth with wrong login / correct password', (done) => {
        chai.request.agent(server)
            .post('/login')
            .send({login: 'testt', password: 'test'})
            .end((err, res) => {
                res.text.includes('Unauthorized').should.be.true;
                done();
            });
    });
});

describe('Employee tests', () => {
    var token, id, timeId;
    before(function(done) {
       User.findOne({login: 'test'}, function (err, empl) {
           token = empl.token;
           done();
       })
    });
    after(function(done) {
        User.remove().exec();
        Employee.remove().exec();
        done();
    });

    it('Add new employee', (done) => {
        chai.request.agent(server)
            .post('/api/empl/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: 'test',
                surname: 'test',
                patronymic: 'test',
                sex: true,
                contacts: 'test',
                day: date.getTime(),
                start: date.getTime(),
                end: date.getTime()
            })
            .end((err, res) => {
                let regCheck = res.text.includes('Employee added');
                regCheck.should.be.true;
                Employee.count(function(err, count) {
                    count.should.equal(1);
                    Employee.findOne({name: 'test'}, function(err, employee) {
                        employee.name.should.equal('test');
                        employee.times.length.should.equal(1);
                        id = employee._id;
                        done();
                    });
                });
            });
    });
    it('Change employee', (done) => {
        chai.request.agent(server)
            .put('/api/empl/' + id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: 'testt',
                surname: 'testt',
                patronymic: 'test',
                sex: false,
                contacts: 'test'
            })
            .end((err, res) => {
                let regCheck = res.text.includes('Employee updated');
                regCheck.should.be.true;
                Employee.count(function(err, count) {
                    count.should.equal(1);
                    Employee.findOne({name: 'testt'}, function(err, employee) {
                        employee.surname.should.equal('testt');
                        employee.sex.should.be.false;
                        done();
                    });
                });
            });
    });
    it('Add time', (done) => {
        chai.request.agent(server)
            .post('/api/empl/' + id + '/time/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                day: date.getTime(),
                start: date.getTime(),
                end: date.getTime()
            })
            .end((err, res) => {
                let regCheck = res.text.includes('Time added');
                regCheck.should.be.true;
                Employee.findOne({name: 'testt'}, function(err, employee) {
                    employee.times.length.should.equal(2);
                    timeId = employee.times[1]._id;
                    done();
                });
            });
    });
    it('Change time', (done) => {
        chai.request.agent(server)
            .put('/api/empl/' + id + '/time/' + timeId)
            .set('Authorization', 'Bearer ' + token)
            .send({
                day: 11,
                start: 11,
                end: 11
            })
            .end((err, res) => {
                let regCheck = res.text.includes('Time updated');
                regCheck.should.be.true;
                Employee.findOne({name: 'testt'}, function(err, employee) {
                    employee.times.length.should.equal(2);
                    employee.times[1].day.should.equal(11);
                    employee.times[1].start.should.equal(11);
                    employee.times[1].end.should.equal(11);
                    done();
                });
            });
    });
    it('Delete time', (done) => {
        chai.request.agent(server)
            .delete('/api/empl/' + id + '/time/' + timeId)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                let regCheck = res.text.includes('Time deleted');
                regCheck.should.be.true;
                Employee.findOne({name: 'testt'}, function(err, employee) {
                    employee.times.length.should.equal(1);
                    done();
                });
            });
    });
    it('Delete employee', (done) => {
        chai.request.agent(server)
            .delete('/api/empl/' + id)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                let regCheck = res.text.includes('Employee deleted');
                regCheck.should.be.true;
                Employee.count(function(err, count) {
                    count.should.equal(0);
                    done();
                });
            });
    });
});