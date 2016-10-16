'use strict';

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const EmployeeSchema = new Schema({
        name: String,
        surname: String,
        patronymic: String,
        sex: Boolean,
        contacts: String,
        added: {type: Number, default: Date.now()},
        times: [
            {
                day: Number,
                start: Number,
                end: Number
            }
        ],
        people: [{emplId: String}]

    }, {
        versionKey: false
    });

    mongoose.model('Employee', EmployeeSchema);
};