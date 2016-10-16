'use strict';

const mongoose = require('mongoose');
const Time = mongoose.model('Time');

module.exports = {
    read(req, res) {
        Time.find((err, time) => {
            if (!err) {
                res.send(time);
            } else {
                res.send(500, {message: 'Server error'})
            }
        })
    },
    create(req, res) {
        if (req.body.day.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {

        }
        let time = new Time({
            emplId: req.body.emplId,
            day: req.body.day,
            start: req.body.start,
            end: req.body.end
        });
        time.save((err) => {
            if (!err) {
                res.send({message: 'Time added'})
            } else {
                res.send(500, {message: 'Server error ' + err})
            }
        });
    },
    update(req, res) {
        Time.findById(req.params.id, (err, time) => {
            if (!time) {
                res.send(404, {message: 'Not found'})
            }
            time.emplId= req.body.emplId;
            time.day =  req.body.day;
            time.start = req.body.start;
            time.end = req.body.end;
            time.save((err) => {
                if (!err) {
                    res.send({message: 'Time updated'})
                } else {
                    res.send(500, {message: 'Server error'})
                }
            })
        });
    },
    delete(req, res) {
        Time.findById(req.params.id, (err, time) => {
            if (!time) {
                res.send(404, {message: 'Not found'})
            }
            time.remove((err) => {
                if (!err) {
                    res.send({message: 'Time deleted'})
                } else {
                    res.send(500, {message: 'Server error'})
                }
            })
        });
    }
};