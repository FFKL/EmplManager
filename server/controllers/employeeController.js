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
        let employee = new Employee({
            name: req.body.name,
            sex: req.body.sex,
            contacts: req.body.contacts
        });
        employee.save((err) => {
            if (!err) {
                res.send({message: 'Employee added'})
            } else {
                res.send(500, {message: 'Server error'})
            }
        });
    },
    update(req, res) {
        Employee.findById(req.params.id, (err, employee) => {
            if (!employee) {
                res.send(404, {message: 'Not found'})
            }
            employee.name = req.body.name;
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
    }
};