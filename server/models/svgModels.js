const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const accountSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

accountSchema.pre('save', function(next){
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    return next();
  })
})

const cookieSchema = new Schema({
  cookieId: {type: String, required: true, unique: true},
});

const svSchema = new Schema({
    svField: {type: String, required: true, unique: true},
    labelName: String,
    user: String
  });

module.exports = {
  Account: mongoose.model('Account', accountSchema),
  Cookie: mongoose.model('Cookie', cookieSchema),
  SvItem: mongoose.model('SvItem', svSchema)
}
