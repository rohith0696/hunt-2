/**
 * User Model
 * 
 */


const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
userId: { type:Number, required: true,unique: true, primaryKey: true, allowIncrement: true},
email: { type:String, required: true, unique: true},
password: { type:String, required: true, minlength: 6, maxlength: 10}
});

module.exports = mongoose.model('User', UserSchema);