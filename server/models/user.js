'use strict';

module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        login: String,
        hash: String,
        token: String
    }, {
        versionKey: false
    });

    mongoose.model('User', UserSchema);
};