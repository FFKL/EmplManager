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
        subjects: [
            {
                subjId: String,
                surname: String
            }
        ]

    }, {
        versionKey: false
    });

    mongoose.model('Employee', EmployeeSchema);
};