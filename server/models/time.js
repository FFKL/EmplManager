'use strict';

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const TimeSchema = new Schema({
        name: String,
        day: String,
        start: String,
        end: String
    }, {
        versionKey: false
    });

    mongoose.model('Time', TimeSchema);
};