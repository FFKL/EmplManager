'use strict';

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

module.exports = {
    read(req, res) {
        Employee.find((err, employees) => {
            if (!err) {
                res.send(employees);
            } else {
                res.send(500, {message: 'Server error'})
            }
        })
    },
    create(req, res) {
        console.log(req.body);
        let employee = new Employee({
            name: req.body.name,
            surname: req.body.surname,
            patronymic: req.body.patronymic,
            sex: req.body.sex,
            contacts: req.body.contacts,
            times: [
                {
                    day: req.body.day,
                    start: req.body.start,
                    end: req.body.end
                }
            ],
            people: [{emplId: req.body.emplId}]
        });
        employee.save((err) => {
            if (!err) {
                res.send({message: 'Employee added'})
            } else {
                res.send(500, {message: 'Server error'})
            }
        });
    },
    addTime(req, res) {
        Employee.findById(req.params.id, (err, employee) => {
            if (!employee) {
                res.send(404, {message: 'Not found'})
            }
            let time = {
                day: req.body.day,
                start: req.body.start,
                end: req.body.end
            };
            employee.times.push(time);
            employee.save((err) => {
                if (!err) {
                    res.send({message: 'Time added'})
                } else {
                    res.send(500, {message: 'Server error'})
                }
            })
        });
    },
    updateEmpl(req, res) {
        Employee.findById(req.params.id, (err, employee) => {
            if (!employee) {
                res.send(404, {message: 'Not found'})
            }

            employee.name = req.body.name;
            employee.surname = req.body.surname;
            employee.patronymic = req.body.patronymic;
            employee.sex =  req.body.sex;
            employee.contacts = req.body.contacts;
            employee.save((err) => {
                if (!err) {
                    res.send({message: 'Employee updated'})
                } else {
                    res.send(500, {message: 'Server error'})
                }
            })
        });
    },
    updateTime(req, res) {
        Employee.findById(req.params.id, (err, employee) => {
            if (!employee) {
                res.send(404, {message: 'Not found'})
            }
            let index;
            for (let i = 0; i < employee.times.length; i++) {
                if (employee.times[i]._id == req.params.timeId) {
                    index = i;
                    break;
                }
            }
            if (index !== undefined) {
                employee.times[index].day = req.body.day;
                employee.times[index].start = req.body.start;
                employee.times[index].end = req.body.end;
                employee.save((err) => {
                    if (!err) {
                        res.send({message: 'Time updated'})
                    } else {
                        res.send(500, {message: 'Server error'})
                    }
                })
            } else {
                res.send({message: 'This time is absent'})
            }
        });
    },
    delete(req, res) {
        Employee.findById(req.params.id, (err, employee) => {
            if (!employee) {
                res.send(404, {message: 'Not found'})
            }
            employee.remove((err) => {
                if (!err) {
                    res.send({message: 'Employee deleted'})
                } else {
                    res.send(500, {message: 'Server error'})
                }
            })
        });
    },
    deleteTime(req, res) {
        Employee.findById(req.params.id, (err, employee) => {
            if (!employee) {
                res.send(404, {message: 'Empl not found'})
            }
            if (!employee.times.id((req.params.timeId))) {
                res.send(404, {message: 'Time not found'})
            } else {
                employee.times.id(req.params.timeId).remove();
                employee.save((err) => {
                    if (!err) {
                        res.send({message: 'Employee deleted'})
                    } else {
                        res.send(500, {message: 'Server error'})
                    }
                })
            }
        });
    }
};