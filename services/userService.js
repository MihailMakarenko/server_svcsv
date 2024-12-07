// services/userService.js
const User = require("../models/user"); // Импорт модели User
const bcrypt = require("bcryptjs");

class UserService {
  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(UserId) {
    return await User.findByPk(UserId);
  }

  async createUser(userData) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(userData.Password, saltRounds);
    userData.Password = hashedPassword;
    return await User.create(userData);
  }

  async updateUser(UserId, userData) {
    const user = await this.getUserById(UserId);
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, userData);
    await user.save();
    return user;
  }

  async deleteUser(UserId) {
    const user = await this.getUserById(UserId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
  }

  async findUserByEmail(email) {
    return await User.findOne({ where: { Email: email } });
  }

  async comparePasswords(candidatePassword, hashedPassword) {
    return bcrypt.compareSync(candidatePassword, hashedPassword);
  }
}

module.exports = new UserService();
