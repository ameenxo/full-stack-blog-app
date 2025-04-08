const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../utility/customError');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    require: false,
    default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});
userSchema.statics.isUserExist = async function (username, email) {
  if (!username || !email) {
    throw new CustomError("please provide some email and password to check exist user", 401, "")
  }
  const user = await this.findOne({
    $or: [{ email }, { username }]
  });
  return !!user;

};
userSchema.statics.createUser = async function (username, email, password) {
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await this.create({ username, email, password: hashedPassword });
    return newUser;
  } catch (error) {
    throw new CustomError(error.message, 404, "not getting exact error");
  }

};
userSchema.statics.authenticateUser = async function (nameOrEmail, password) {
  try {
    const user = await this.findOne({
      $or: [{ email: nameOrEmail }, { username: nameOrEmail }]
    });
    if (!user) {
      throw new CustomError("user not found with username ", 401, "user not found");
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new CustomError("password is not valid ", 401, "password is not valid");
    }
    else
      return user
  } catch (error) {
    throw new CustomError(error.message || "error in authentication process", error.statusCode || 401, error.errorCode)
  }
}
userSchema.statics.generateToken = async function (user) {
  try {
    if (!user) {
      throw new CustomError("cannot generate token without user", 403, "cannot generate token without user")
    }
    const token = await jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    if (!token)
      throw new CustomError("cannot generate token", 401, "cannot generate token");
    else
      return token
  } catch (error) {
    throw new CustomError(error.message || "error in token generation process", error.statusCode || 401, error.errorCode)
  }
}
const User = mongoose.model('user', userSchema);
module.exports = User;
