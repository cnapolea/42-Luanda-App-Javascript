const {Schema, model} = require('mongoose');

const SuperUserShema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    code: {
        type: String,
        default: '',
    },
    token: {
        type: String,
        default: '',
    },
    refresh_token: {
        type: String,
        default: '',
    },
});

const superUser = model('superUser', SuperUserShema);

module.exports = superUser;