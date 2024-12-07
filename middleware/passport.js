const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findByPk(payload.userId, {
          attributes: ["Email", "UserId", "Role"], // Указываем поля, которые нужно вернуть
        });

        if (user) {
          done(null, user);
        } else {
          done(null, false); // Пользователь не найден
        }
      } catch (e) {
        console.log(e);
        done(e, false); // Проблема с запросом
      }
    })
  );
};
