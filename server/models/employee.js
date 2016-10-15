'use strict';

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const EmployeeSchema = new Schema({
        name: String,
        sex: Boolean,
        contacts: String,
        added: {type: String, default: new Date()}
    }, {
        versionKey: false
    });

    mongoose.model('Employee', EmployeeSchema);
};